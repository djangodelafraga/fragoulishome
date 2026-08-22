// ============================================
// fragoulishome.gr — RoomActions
// Client component for room edit/delete/toggle actions.
// ============================================

"use client";

import { useRouter } from "next/navigation";
import { updateRoom, deleteRoom } from "@/lib/supabaseClient";

interface RoomActionsProps {
  roomId: string;
  slug: string;
}

export default function RoomActions({ roomId, slug }: RoomActionsProps) {
  const router = useRouter();

  async function handleToggleActive() {
    if (!confirm("Toggle this room's active status?")) return;
    const room = await updateRoom(roomId, { isActive: false });
    if (room) {
      router.refresh();
    }
  }

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this room? This cannot be undone.")) return;
    const success = await deleteRoom(roomId);
    if (success) {
      router.refresh();
    }
  }

  return (
    <div style={{ display: "flex", gap: "0.5rem" }}>
      <a
        href={`/admin/rooms/${slug}/edit`}
        style={{
          fontSize: "0.75rem",
          color: "var(--color-accent)",
          textDecoration: "underline",
          cursor: "pointer",
        }}
      >
        Edit
      </a>
      <button
        onClick={handleToggleActive}
        style={{
          fontSize: "0.75rem",
          color: "var(--color-text-muted)",
          background: "none",
          border: "none",
          textDecoration: "underline",
          cursor: "pointer",
          padding: 0,
          fontFamily: "inherit",
        }}
      >
        Deactivate
      </button>
      <button
        onClick={handleDelete}
        style={{
          fontSize: "0.75rem",
          color: "#991b1b",
          background: "none",
          border: "none",
          textDecoration: "underline",
          cursor: "pointer",
          padding: 0,
          fontFamily: "inherit",
        }}
      >
        Delete
      </button>
    </div>
  );
}