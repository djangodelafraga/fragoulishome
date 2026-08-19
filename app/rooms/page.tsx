// ============================================
// fragoulishome.gr — Rooms Listing Page
// Fetches all active rooms from Supabase and displays a grid.
// ============================================

import { getRooms } from "@/lib/supabaseClient";
import RoomCard from "@/components/RoomCard";

export const dynamic = "force-dynamic";

export default async function RoomsPage() {
  const rooms = await getRooms();

  return (
    <section>
      <h1>Available Rooms</h1>

      {rooms.length > 0 ? (
        <ul className="room-grid" style={{ listStyle: "none", padding: 0, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
          {rooms.map((room) => (
            <li key={room.id}>
              <RoomCard room={room} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No rooms available at the moment. Check back soon!</p>
      )}
    </section>
  );
}