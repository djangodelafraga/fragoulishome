// ============================================
// fragoulishome.gr — GET /api/bookings/list
// Empty handler placeholder.
// ============================================

import { NextResponse } from "next/server";

export async function GET(_request: Request) {
  // TODO: Authenticate admin/guest.
  // TODO: Fetch bookings from Supabase (filtered by user or status).
  return NextResponse.json(
    { error: "Not implemented" },
    { status: 501 },
  );
}