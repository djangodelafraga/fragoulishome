// ============================================
// fragoulishome.gr — Booking Page
// TODO: Implement full booking flow (dates -> details -> payment).
// ============================================

import { getRoomById } from "@/lib/supabaseClient";
import BookingForm from "@/components/BookingForm";

interface BookingPageProps {
  searchParams: Promise<{ roomId?: string }>;
}

export default async function BookingPage({ searchParams }: BookingPageProps) {
  const { roomId } = await searchParams;

  // TODO: Handle missing roomId gracefully (show room picker).
  if (!roomId) {
    return <p>Select a room to book. TODO: render room picker.</p>;
  }

  // TODO: Fetch room by ID to render booking form.
  const room = await getRoomById(roomId);

  if (!room) {
    return <p>Room not found. TODO: proper 404.</p>;
  }

  return (
    <section>
      <h1>Book Your Stay</h1>
      {/* TODO: Show room summary + price before form */}
      <BookingForm room={room} />
    </section>
  );
}