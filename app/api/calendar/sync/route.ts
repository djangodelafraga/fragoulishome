// ============================================
// fragoulishome.gr — POST /api/calendar/sync
// Empty handler placeholder.
// ============================================

import { NextResponse } from "next/server";

export async function POST(_request: Request) {
  // TODO: Authenticate admin.
  // TODO: Parse roomId from body.
  // TODO: Fetch iCal feed URL for room.
  // TODO: Parse iCal events, upsert availability records.
  // TODO: Return sync summary (added/removed/unchanged).
  return NextResponse.json(
    { error: "Not implemented" },
    { status: 501 },
  );
}