// ============================================
// fragoulishome.gr — Home Page
// Fetches featured rooms from Supabase.
// ============================================

import Link from "next/link";
import { getRooms } from "@/lib/supabaseClient";
import RoomCard from "@/components/RoomCard";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const rooms = await getRooms();
  const featured = rooms.slice(0, 3); // Show up to 3 featured rooms

  return (
    <section>
      <h1>Fragoulishome — Rooms to Let</h1>

      {featured.length > 0 ? (
        <>
          <h2>Featured Rooms</h2>
          <ul
            className="room-grid"
            style={{
              listStyle: "none",
              padding: 0,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {featured.map((room) => (
              <li key={room.id}>
                <RoomCard room={room} />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>No rooms available yet. Check back soon!</p>
      )}

      <p style={{ marginTop: "2rem" }}>
        <Link href="/rooms">View all rooms</Link>
      </p>
    </section>
  );
}