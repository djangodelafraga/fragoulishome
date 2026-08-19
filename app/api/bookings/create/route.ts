// ============================================
// fragoulishome.gr — POST /api/bookings/create
// Creates a new booking after validating availability and input.
// ============================================

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  createBooking,
  checkAvailability,
  getRoomById,
} from "@/lib/supabaseClient";
import { createPaymentIntent } from "@/lib/stripe";
import type { BookingStatus } from "@/types/database";

// --- Input validation ---

interface CreateBookingInput {
  roomId: string;
  guestName: string;
  guestEmail: string;
  guestPhone?: string;
  checkIn: string;
  checkOut: string;
  numberOfGuests: number;
  specialRequests?: string;
}

interface ValidationResult {
  valid: boolean;
  error?: string;
  parsed?: CreateBookingInput;
}

function validateCreateBookingInput(body: Record<string, unknown>): ValidationResult {
  if (!body.roomId || typeof body.roomId !== "string") {
    return { valid: false, error: "roomId is required and must be a string" };
  }
  if (!body.guestName || typeof body.guestName !== "string") {
    return { valid: false, error: "guestName is required and must be a string" };
  }
  if (!body.guestEmail || typeof body.guestEmail !== "string") {
    return { valid: false, error: "guestEmail is required and must be a string" };
  }
  if (!body.checkIn || typeof body.checkIn !== "string") {
    return { valid: false, error: "checkIn is required and must be a string (YYYY-MM-DD)" };
  }
  if (!body.checkOut || typeof body.checkOut !== "string") {
    return { valid: false, error: "checkOut is required and must be a string (YYYY-MM-DD)" };
  }
  if (!body.numberOfGuests || typeof body.numberOfGuests !== "number") {
    return { valid: false, error: "numberOfGuests is required and must be a number" };
  }

  // Validate date format (YYYY-MM-DD)
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(body.checkIn) || !dateRegex.test(body.checkOut)) {
    return { valid: false, error: "Dates must be in YYYY-MM-DD format" };
  }

  // checkIn must be before checkOut
  const checkInDate = new Date(body.checkIn);
  const checkOutDate = new Date(body.checkOut);
  if (checkInDate >= checkOutDate) {
    return { valid: false, error: "checkIn must be before checkOut" };
  }

  // checkIn must be in the future
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (checkInDate < today) {
    return { valid: false, error: "checkIn cannot be in the past" };
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(body.guestEmail)) {
    return { valid: false, error: "Invalid email format" };
  }

  // Validate guest phone if provided
  if (body.guestPhone !== undefined && typeof body.guestPhone !== "string") {
    return { valid: false, error: "guestPhone must be a string" };
  }

 ﻿// Validate specialRequests if provided
  if (body.specialRequests !== undefined && typeof body.specialRequests !== "string") {
    return { valid: false, error: "specialRequests must be a string" };
  }

  return {
   valid: true,
    parsed: {
      roomId: body.roomId,
      guestName: body.guestName,
      guestEmail: body.guestEmail,
      guestPhone: body.guestPhone as string | undefined,
      checkIn: body.checkIn,
      checkOut: body.checkOut,
      numberOfGuests: body.numberOfGuests,
      specialRequests: body.specialRequests as string | undefined,
    },
  };
}

// Helper: calculate number of nights between two dates
function calculateNights(checkIn: string, checkOut: string): number {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  return Math.max(1, Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
}

// ============================================
// POST handler
// ============================================

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // 1. Parse request body
    const body: Record<string, unknown> = await request.json();

    // 2. Validate input
    const validation = validateCreateBookingInput(body);
    if (!validation.valid || !validation.parsed) {
      return NextResponse.json(
        { error: validation.error ?? "Invalid input" },
        { status: 400 },
      );
    }

    const input = validation.parsed;

    // 3. Fetch the room to verify it exists and get pricing
    const room = await getRoomById(input.roomId);
    if (!room) {
      return NextResponse.json(
        { error: "Room not found" },
        { status: 404 },
      );
    }

    // 4. Check room capacity
    if (input.numberOfGuests > room.capacity) {
      return NextResponse.json(
        {
          error: `Room capacity is ${room.capacity} guests. You requested ${input.numberOfGuests}.`,
        },
        { status: 400 },
      );
    }

    // 5. Check availability for requested dates
    const availability = await checkAvailability(
      input.roomId,
      input.checkIn,
      input.checkOut,
    );

    const unavailableDates = availability.filter(
      (a) => !a.isAvailable,
    );
    if (unavailableDates.length > 0) {
      const dates = unavailableDates.map((a) => a.date).join(", ");
      return NextResponse.json(
        { error: `Room is not available on: ${dates}` },
        { status: 409 },
      );
    }

    // 6. Calculate total price
    const nights = calculateNights(input.checkIn, input.checkOut);
    const totalPrice = nights * room.pricePerNight;

    // 7. Create the booking record
    const booking = await createBooking({
      roomId: input.roomId,
      guestName: input.guestName,
      guestEmail: input.guestEmail,
      guestPhone: input.guestPhone,
      checkIn: input.checkIn,
      checkOut: input.checkOut,
      numberOfGuests: input.numberOfGuests,
      totalPrice,
      currency: room.currency,
      status: "pending" as BookingStatus,
      specialRequests: input.specialRequests,
    });

    if (!booking) {
      return NextResponse.json(
        { error: "Failed to create booking" },
        { status: 500 },
      );
    }

    // 8. Create Stripe PaymentIntent for payment
    const paymentIntent = await createPaymentIntent(
      Math.round(totalPrice * 100), // Stripe uses cents
      room.currency.toLowerCase(),
      booking.id,
    );

    if (!paymentIntent) {
      // Booking created but payment setup failed; still return booking
      console.warn("[POST /api/bookings/create] PaymentIntent creation failed");
    }

    // 9. Return booking details with client secret for payment
    return NextResponse.json({
      data: {
        booking,
        clientSecret: paymentIntent?.client_secret ?? null,
      },
    });
  } catch (error) {
    console.error("[POST /api/bookings/create] Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}