// ============================================
// fragoulishome.gr — POST /api/enquiries/send
// Receives booking enquiry data, sends email to fragoulishome@gmail.com,
// and stores the enquiry in Supabase.
// Rate-limited: 5 submissions per IP per minute.
// ============================================

import { NextResponse } from "next/server";
import { sendBookingEnquiry } from "@/lib/email";
import { createClient } from "@supabase/supabase-js";
import { validateEmail, validateName, validateDate, validatePositiveInt, applyRateLimiting, getClientIp } from "@/lib/security";

export async function POST(request: Request) {
  try {
    // Rate limit: 5 submissions per IP per minute
    const clientIp = getClientIp(request);
    const allowed = await applyRateLimiting(`enquiry:${clientIp}`, 5, 60_000);
    if (!allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a minute before trying again." },
        { status: 429 },
      );
    }

    const body = await request.json();
    const { roomId, roomTitle, checkIn, checkOut, guests, guestName, guestEmail, guestPhone, specialRequests } = body;

    // Validate required fields
    const validEmail = validateEmail(guestEmail);
    if (!validEmail) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 },
      );
    }

    const validName = validateName(guestName);
    if (!validName) {
      return NextResponse.json(
        { error: "Invalid guest name" },
        { status: 400 },
      );
    }

    const validCheckIn = validateDate(checkIn);
    const validCheckOut = validateDate(checkOut);
    if (!validCheckIn || !validCheckOut) {
      return NextResponse.json(
        { error: "Invalid date format (use YYYY-MM-DD)" },
        { status: 400 },
      );
    }

    if (new Date(validCheckOut) <= new Date(validCheckIn)) {
      return NextResponse.json(
        { error: "Check-out must be after check-in" },
        { status: 400 },
      );
    }

    const validGuests = validatePositiveInt(guests, 1, 20);
    if (!validGuests) {
      return NextResponse.json(
        { error: "Invalid number of guests" },
        { status: 400 },
      );
    }

    if (!roomTitle || typeof roomTitle !== "string") {
      return NextResponse.json(
        { error: "Missing required field: roomTitle" },
        { status: 400 },
      );
    }

    // 1. Send email via Nodemailer
    try {
      await sendBookingEnquiry({
        roomTitle,
        checkIn: validCheckIn,
        checkOut: validCheckOut,
        guests: validGuests,
        guestName: validName,
        guestEmail: validEmail,
        guestPhone: guestPhone || undefined,
        specialRequests: specialRequests || undefined,
      });
    } catch (emailError) {
      console.error("[enquiries/send] Email error:", emailError);
      // Don't fail the request — still store in Supabase
    }

    // 2. Store enquiry in Supabase
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (supabaseUrl && supabaseKey) {
        const supabase = createClient(supabaseUrl, supabaseKey);

        await supabase.from("bookings").insert({
          room_id: roomId || null,
          guest_name: validName,
          guest_email: validEmail,
          guest_phone: guestPhone || null,
          check_in: validCheckIn,
          check_out: validCheckOut,
          number_of_guests: validGuests,
          total_price: 0,
          currency: "EUR",
          status: "enquiry",
          payment_status: "unpaid",
          special_requests: specialRequests || null,
        } as Record<string, unknown>);
      }
    } catch (dbError) {
      console.error("[enquiries/send] Database error:", dbError);
      // Don't fail the request
    }

    return NextResponse.json({
      success: true,
      message: "Your enquiry has been sent successfully. We will get back to you as soon as possible.",
    });
  } catch (error) {
    console.error("[enquiries/send] Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again or contact us directly." },
      { status: 500 },
    );
  }
}