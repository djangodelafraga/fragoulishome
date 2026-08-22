// ============================================
// fragoulishome.gr — Admin Rooms Management Page
// CRUD UI for rooms with inline edit and delete.
// ============================================

import type { Metadata } from "next";
import Link from "next/link";
import { getAllRooms } from "@/lib/supabaseClient";
import RoomActions from "./RoomActions";

export const metadata: Metadata = {
  title: "Manage Rooms",
  robots: {
    index: false,
    follow: false,
  },
};

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default async function AdminRoomsPage() {
  const rooms = await getAllRooms();

  return (
    <section>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-xl)" }}>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem" }}>Manage Rooms</h1>
        <Link
          href="/admin/rooms/new"
          style={{
            padding: "0.5rem 1rem",
            fontSize: "0.8125rem",
            color: "var(--color-white)",
            background: "var(--color-accent)",
            border: "none",
            borderRadius: "2px",
            textDecoration: "none",
            lineHeight: 1.4,
          }}
        >
          + Add Room
        </Link>
      </div>

      {rooms.length > 0 ? (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.8125rem" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                <th style={{ textAlign: "left", padding: "0.5rem 0.75rem", fontWeight: 500, color: "var(--color-text-muted)" }}>Title</th>
                <th style={{ textAlign: "left", padding: "0.5rem 0.75rem", fontWeight: 500, color: "var(--color-text-muted)" }}>Slug</th>
                <th style={{ textAlign: "left", padding: "0.5rem 0.75rem", fontWeight: 500, color: "var(--color-text-muted)" }}>Price / Night</th>
                <th style={{ textAlign: "left", padding: "0.5rem 0.75rem", fontWeight: 500, color: "var(--color-text-muted)" }}>Capacity</th>
                <th style={{ textAlign: "left", padding: "0.5rem 0.75rem", fontWeight: 500, color: "var(--color-text-muted)" }}>Status</th>
                <th style={{ textAlign: "left", padding: "0.5rem 0.75rem", fontWeight: 500, color: "var(--color-text-muted)" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <tr key={room.id} style={{ borderBottom: "1px solid var(--color-border)" }}>
                  <td style={{ padding: "0.5rem 0.75rem" }}>
                    <Link href={`/rooms/${room.slug}`} style={{ color: "var(--color-accent)", textDecoration: "underline" }}>
                      {room.title}
                    </Link>
                  </td>
                  <td style={{ padding: "0.5rem 0.75rem", color: "var(--color-text-muted)" }}>{room.slug}</td>
                  <td style={{ padding: "0.5rem 0.75rem" }}>{formatCurrency(room.pricePerNight)}</td>
                  <td style={{ padding: "0.5rem 0.75rem" }}>Up to {room.capacity}</td>
                  <td style={{ padding: "0.5rem 0.75rem" }}>
                    <span style={{
                      display: "inline-block",
                      padding: "0.125rem 0.5rem",
                      fontSize: "0.6875rem",
                      fontWeight: 500,
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                      background: room.isActive ? "#d1fae5" : "#fee2e2",
                      color: room.isActive ? "#065f46" : "#991b1b",
                      borderRadius: "2px",
                    }}>
                      {room.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td style={{ padding: "0.5rem 0.75rem" }}>
                    <RoomActions roomId={room.id} slug={room.slug} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)" }}>
          No rooms yet.{" "}
          <Link href="/admin/rooms/new" style={{ color: "var(--color-accent)", textDecoration: "underline" }}>
            Add your first room
          </Link>
        </p>
      )}
    </section>
  );
}