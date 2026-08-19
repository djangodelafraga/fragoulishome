// ============================================
// fragoulishome.gr — POST /api/payments/intent
// Creates a Stripe PaymentIntent for a booking.
// ============================================

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createPaymentIntent } from "@/lib/stripe";
import { getBookingById, createPaymentRecord } from "@/lib/supabaseClient";

// ============================================
// POST handler
// ============================================

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // 1. Parse request body
    const body: Record<string, unknown> = await request.json();

    // 2. Validate input
    if (!body.bookingId || typeof body.bookingId !== "string") {
      return NextResponse.json(
        { error: "bookingId is required and must be a string" },
        { status: 400 },
      );
    }

    const bookingId: string = body.bookingId;

    // 3. Fetch the booking
    const booking = await getBookingById(bookingId);
    if (!booking) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 },
      );
    }

    // 4. Check if payment already exists for this booking
    if (booking.paymentStatus === "succeeded") {
      return NextResponse.json(
        { error: "This booking has already been paid" },
        { status: 409 },
      );
    }

    if (booking.paymentStatus === "requires_payment_method") {
      // Payment was started but not completed — return existing intent data
      // (client would need the client_secret to retry)
      return NextResponse.json({
        data: {
          bookingId: booking.id,
          amount: Math.round(booking.totalPrice * 100),
          currency: booking.currency.toLowerCase(),
          status: "requires_payment_method",
          message: "Payment was already initiated. Complete the pending payment.",
        },
      });
    }

    // 5. Calculate amount in cents
    const amount = Math.round(booking.totalPrice * 100);
    const currency = booking.currency.toLowerCase();

    // 6. Create Stripe PaymentIntent
    const paymentIntent = await createPaymentIntent(amount, currency, booking.id);

    if (!paymentIntent) {
      return NextResponse.json(
        { error: "Failed to create payment intent. Check Stripe configuration." },
        { status: 500 },
      );
    }

    // 7. Create a payment record in the database
    const paymentRecord = await createPaymentRecord({
      bookingId: booking.id,
      stripePaymentIntentId: paymentIntent.id,
      amount: booking.totalPrice,
      currency: booking.currency,
      status: "requires_payment_method",
    });

    if (!paymentRecord) {
      console.warn(
        "[POST /api/payments/intent] Payment record creation failed for intent:",
        paymentIntent.id,
      );
    }

    // 8. Return client secret to the frontend
    return NextResponse.json({
      data: {
        bookingId: booking.id,
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
        amount,
        currency,
        status: paymentIntent.status,
      },
    });
  } catch (error) {
    console.error("[POST /api/payments/intent] Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}