// ============================================
// fragoulishome.gr — GET /api/availability/check
// Checks room availability for a given date range.
// ============================================

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkAvailability, getRoomBySlug } from "@/lib/supabaseClient";

// ============================================
// GET handler
// ============================================

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    // 1. Parse query params
    const { searchParams } = new URL(request.url);
    const roomId = searchParams.get("roomId");
    const slug = searchParams.get("slug");
    const checkIn = searchParams.get("checkIn");
    const checkOut = searchParams.get("checkOut");

    // 2. Validate room identifier — need either roomId or slug
    const resolvedRoomId = roomId ?? null;
    let finalRoomId = resolvedRoomId;

    if (!resolvedRoomId && slug) {
      // Resolve slug to room ID
      const room = await getRoomBySlug(slug);
      if (!room) {
        return NextResponse.json(
          { error: "Room not found for the given slug" },
          { status: 404 },
        );
      }
      finalRoomId = room.id;
    }

    if (!finalRoomId) {
      return NextResponse.json(
        { error: "Either roomId or slug query parameter is required" },
        { status: 400 },
      );
    }

    // 3. Validate date parameters
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!checkIn) {
      return NextResponse.json(
        { error: "checkIn query parameter is required (YYYY-MM-DD)" },
        { status: 400 },
      );
    }
    if (!dateRegex.test(checkIn)) {
      return NextResponse.json(
        { error: "checkIn must be in YYYY-MM-DD format" },
        { status: 400 },
      );
    }

    if (!checkOut) {
      // Default: check a single night if checkOut is omitted
      const defaultCheckOut = new Date(checkIn);
      defaultCheckOut.setDate(defaultCheckOut.getDate() + 1);
      const checkOutDefault = defaultCheckOut.toISOString().split("T")[0]!;

      const availability = await checkAvailability(finalRoomId, checkIn, checkOutDefault);

      return NextResponse.json({
        data: {
          roomId: finalRoomId,
          checkIn,
          checkOut: checkOutDefault,
          dates: availability,
          isAvailable: availability.every((a) => a.isAvailable),
        },
      });
    }

    if (!dateRegex.test(checkOut)) {
      return NextResponse.json(
        { error: "checkOut must be in YYYY-MM-DD format" },
        { status: 400 },
      );
    }

    // checkIn must be before checkOut
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    if (checkInDate >= checkOutDate) {
      return NextResponse.json(
        { error: "checkIn must be before checkOut" },
        { status: 400 },
      );
    }

    // 4. Query availability
    const availability = await checkAvailability(finalRoomId, checkIn, checkOut);

    // 5. Return result
    const isAvailable = availability.every((a) => a.isAvailable);
    const unavailableDates = availability.filter((a) => !a.isAvailable);

    return NextResponse.json({
      data: {
        roomId: finalRoomId,
        checkIn,
        checkOut,
        dates: availability,
        isAvailable,
        unavailableDates: unavailableDates.map((a) => ({
          date: a.date,
          reason: a.reason,
        })),
        totalNights: Math.round(
          (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24),
        ),
      },
    });
  } catch (error) {
    console.error("[GET /api/availability/check] Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}