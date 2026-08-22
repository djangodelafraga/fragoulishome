// ============================================
// fragoulishome.gr — Admin New Room Page
// Form to create a new room.
// ============================================

import type { Metadata } from "next";
import Link from "next/link";
import RoomForm from "../RoomForm";

export const metadata: Metadata = {
  title: "Add Room",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NewRoomPage() {
  return (
    <section>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-xl)" }}>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem" }}>Add Room</h1>
        <Link
          href="/admin/rooms"
          style={{
            fontSize: "0.8125rem",
            color: "var(--color-text-muted)",
            textDecoration: "underline",
          }}
        >
          &larr; Back to Rooms
        </Link>
      </div>

      <RoomForm />
    </section>
  );
}