// ============================================
// fragoulishome.gr — /api/admin/bookings
// Empty handler placeholder.
// ============================================

import { NextResponse } from "next/server";

export async function GET(_request: Request) {
  // TODO: Authenticate admin.
  // TODO: Fetch bookings (filter/sort/status).
  return NextResponse.json(
    { error: "Not implemented" },
    { status: 501 },
  );
}

export async function PUT(_request: Request) {
  // TODO: Authenticate admin.
  // TODO: Parse bookingId + new status.
  // TODO: Update booking status (confirm/cancel).
  return NextResponse.json(
    { error: "Not implemented" },
    { status: 501 },
  );
}