// ============================================
// fragoulishome.gr — POST /api/availability/update
// Admin endpoint to block or unblock specific dates
// for a room. Used by the admin calendar page.
// ============================================

import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/supabaseAdmin";
import { setAvailabilityBlock, clearAvailabilityBlock } from "@/lib/supabaseClient";

// ============================================
// POST handler — block/unblock dates
// ============================================

export async function POST(request: Request): Promise<NextResponse> {
  try {
    // 1. Authenticate admin
    const { user, error: authError } = await getAdminSession();
    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 },
      );
    }

    // 2. Parse body
    const body = await request.json();
    const { roomId, date, isAvailable, reason }: {
      roomId?: string;
      date?: string;
      isAvailable?: boolean;
      reason?: string;
    } = body;

    // 3. Validate
    if (!roomId || typeof roomId !== "string") {
      return NextResponse.json(
        { error: "roomId is required" },
        { status: 400 },
      );
    }
    if (!date || typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return NextResponse.json(
        { error: "date is required in YYYY-MM-DD format" },
        { status: 400 },
      );
    }
    if (typeof isAvailable !== "boolean") {
      return NextResponse.json(
        { error: "isAvailable (boolean) is required" },
        { status: 400 },
      );
    }

    // 4. Update availability — clear if available, block if not
    if (isAvailable) {
      await clearAvailabilityBlock(roomId, date);
    } else {
      await setAvailabilityBlock(roomId, date, (reason as "booked" | "blocked" | "maintenance") ?? "blocked");
    }

    // 5. Return success
    return NextResponse.json({
      data: { roomId, date, isAvailable },
    });
  } catch (error) {
    console.error("[POST /api/availability/update] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}