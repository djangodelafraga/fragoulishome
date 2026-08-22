// ============================================
// fragoulishome.gr — Admin Rooms Management Page
// TODO: Implement CRUD UI for rooms.
// ============================================

import { getRooms } from "@/lib/supabaseClient";

export default async function AdminRoomsPage() {
  // TODO: Fetch rooms (including inactive) for admin management.
  const rooms = await getRooms();

  return (
    <section>
      <h1>Manage Rooms</h1>

      {/* TODO: "Add Room" button -> create form */}
      {/* TODO: Rooms table/list with edit + delete actions */}
      {/* TODO: Image upload integration via ImageUploader */}

      {rooms.length > 0 ? (
        <ul>
          {rooms.map((room) => (
            <li key={room.id}>{room.title} — TODO: edit/delete actions</li>
          ))}
        </ul>
      ) : (
        <p>No rooms yet. TODO: add create room flow.</p>
      )}
    </section>
  );
}