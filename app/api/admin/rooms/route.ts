// ============================================
// fragoulishome.gr — /api/admin/rooms
// Empty handler placeholder.
// ============================================

import { NextResponse } from "next/server";

export async function GET(_request: Request) {
  // TODO: Authenticate admin.
  // TODO: Fetch all rooms (including inactive) from Supabase.
  return NextResponse.json(
    { error: "Not implemented" },
    { status: 501 },
  );
}

export async function POST(_request: Request) {
  // TODO: Authenticate admin.
  // TODO: Validate + sanitize room input.
  // TODO: Create room record in Supabase.
  return NextResponse.json(
    { error: "Not implemented" },
    { status: 501 },
  );
}

export async function PUT(_request: Request) {
  // TODO: Authenticate admin.
  // TODO: Validate + sanitize room input.
  // TODO: Update existing room record in Supabase.
  return NextResponse.json(
    { error: "Not implemented" },
    { status: 501 },
  );
}

export async function DELETE(_request: Request) {
  // TODO: Authenticate admin.
  // TODO: Parse roomId.
  // TODO: Soft-delete or deactivate room in Supabase.
  return NextResponse.json(
    { error: "Not implemented" },
    { status: 501 },
  );
}