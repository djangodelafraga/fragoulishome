// ============================================
// fragoulishome.gr — GET /api/availability/check
// Empty handler placeholder.
// ============================================

import { NextResponse } from "next/server";

export async function GET(_request: Request) {
  // TODO: Parse roomId, checkIn, checkOut from query params.
  // TODO: Query availability via supabaseClient.checkAvailability().
  return NextResponse.json(
    { error: "Not implemented" },
    { status: 501 },
  );
}