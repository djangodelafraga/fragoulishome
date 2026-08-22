// ============================================
// fragoulishome.gr — POST /api/enquiries/send
// Receives booking enquiry data, sends email to fragoulishome@gmail.com,
// and stores the enquiry in Supabase.
// ============================================

import { NextResponse } from "next/server";
import { sendBookingEnquiry } from "@/lib/email";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { roomId, roomTitle, checkIn, checkOut, guests, guestName, guestEmail, guestPhone, specialRequests } = body;

    // Validate required fields
    if (!roomTitle || !checkIn || !checkOut || !guests || !guestName || !guestEmail) {
      return NextResponse.json(
        { error: "Missing required fields: roomTitle, checkIn, checkOut, guests, guestName, guestEmail" },
        { status: 400 },
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(guestEmail)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 },
      );
    }

    // Validate dates
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime())) {
      return NextResponse.json(
        { error: "Invalid dates" },
        { status: 400 },
      );
    }
    if (checkOutDate <= checkInDate) {
      return NextResponse.json(
        { error: "Check-out must be after check-in" },
        { status: 400 },
      );
    }

    // 1. Send email via Nodemailer
    try {
      await sendBookingEnquiry({
        roomTitle,
        checkIn,
        checkOut,
        guests: Number(guests),
        guestName,
        guestEmail,
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
          guest_name: guestName,
          guest_email: guestEmail,
          guest_phone: guestPhone || null,
          check_in: checkIn,
          check_out: checkOut,
          number_of_guests: Number(guests),
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