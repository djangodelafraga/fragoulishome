// ============================================
// fragoulishome.gr — POST /api/availability/update
// Empty handler placeholder.
// ============================================

import { NextResponse } from "next/server";

export async function POST(_request: Request) {
  // TODO: Authenticate admin.
  // TODO: Parse roomId, date, availability status.
  // TODO: Upsert availability record (block/unblock/maintenance).
  return NextResponse.json(
    { error: "Not implemented" },
    { status: 501 },
  );
}