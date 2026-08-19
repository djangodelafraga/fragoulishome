// ============================================
// fragoulishome.gr — BookingForm Placeholder Component
// TODO: Implement booking form with date picker, guest count, contact info, payment trigger.
// ============================================

"use client";

import type { FormEvent } from "react";
import type { Room } from "@/types/database";

interface BookingFormProps {
  room: Room;
}

export default function BookingForm({ room }: BookingFormProps) {
  // TODO: State for check-in/check-out dates, number of guests, guest details.
  // TODO: Validate dates against availability.
  // TODO: Calculate total price.
  // TODO: On submit: call /api/bookings/create, then redirect to Stripe checkout.
  void room;

  const handleSubmit = (_e: FormEvent) => {
    // TODO: Implement booking submission.
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      {/* TODO: Date range picker */}
      {/* TODO: Guest count selector */}
      {/* TODO: Guest name, email, phone fields */}
      {/* TODO: Special requests textarea */}
      {/* TODO: Price summary */}
      {/* TODO: Submit button */}
      <p>BookingForm placeholder — {room.title}</p>
    </form>
  );
}