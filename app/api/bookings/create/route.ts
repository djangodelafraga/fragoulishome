// ============================================
// fragoulishome.gr — POST /api/bookings/create
// Empty handler placeholder.
// ============================================

import { NextResponse } from "next/server";

export async function POST(_request: Request) {
  // TODO: Validate input (sanitizeInput/validateInput).
  // TODO: Check availability for requested dates.
  // TODO: Create booking record via supabaseClient.createBooking().
  // TODO: Return booking ID + client secret for payment.
  return NextResponse.json(
    { error: "Not implemented" },
    { status: 501 },
  );
}