// ============================================
// fragoulishome.gr — AvailabilityCalendar Placeholder Component
// TODO: Implement interactive calendar showing available/booked dates.
// ============================================

"use client";

import type { Room } from "@/types/database";

interface AvailabilityCalendarProps {
  room: Room;
}

export default function AvailabilityCalendar({ room }: AvailabilityCalendarProps) {
  // TODO: Fetch availability data from /api/availability/check.
  // TODO: Render month grid with available/booked/blocked states.
  // TODO: Allow date range selection for booking flow.
  void room;

  return (
    <div className="availability-calendar">
      {/* TODO: Calendar grid UI */}
      <p>AvailabilityCalendar placeholder — {room.title}</p>
    </div>
  );
}