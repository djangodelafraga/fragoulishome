// ============================================
// fragoulishome.gr — Rooms Listing Page
// Fetches all active rooms from Supabase and displays a grid.
// ============================================

import type { Metadata } from "next";
import { getRooms } from "@/lib/supabaseClient";
import RoomCard from "@/components/RoomCard";

export const metadata: Metadata = {
  title: "Rooms · Fragoulishome",
  description:
    "Browse our two self-contained maisonettes in Petras, Sitia, Crete. Each room has its own character — both surrounded by olive and pine trees, steps from the sea.",
  openGraph: {
    title: "Rooms · Fragoulishome",
    description:
      "Browse our two self-contained maisonettes in Petras, Sitia, Crete. Direct booking, no platform fees.",
    url: "https://fragoulishome.gr/rooms",
    siteName: "Fragoulishome",
    locale: "el_GR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rooms · Fragoulishome",
    description:
      "Browse our two self-contained maisonettes in Petras, Sitia, Crete. Direct booking, no platform fees.",
  },
  alternates: { canonical: "/rooms" },
  robots: { index: true, follow: true },
};

export const revalidate = 60; // ISR: revalidate every 60 seconds

export default async function RoomsPage() {
  const rooms = await getRooms();

  return (
    <main className="container" style={{ paddingTop: "var(--space-3xl)", paddingBottom: "var(--space-4xl)" }}>
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" style={{ marginBottom: "var(--space-lg)" }}>
        <ol style={{ listStyle: "none", display: "flex", gap: "var(--space-xs)", fontSize: "0.8125rem", color: "var(--color-text-muted)" }}>
          <li><a href="/" style={{ textDecoration: "underline", color: "var(--color-text-muted)" }}>Home</a></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" style={{ color: "var(--color-text)" }}>Rooms</li>
        </ol>
      </nav>

      {/* Page heading */}
      <header style={{ marginBottom: "var(--space-2xl)" }}>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", marginBottom: "var(--space-md)" }}>
          Our rooms
        </h1>
        <p style={{ fontSize: "1rem", color: "var(--color-text-muted)", maxWidth: "36em", lineHeight: 1.6 }}>
          Two self-contained maisonettes set within a private grove of olive, pine and palm trees in Petras, Sitia. Each room has its own character and private entrance — both are less than 100 metres from the sea.
        </p>
      </header>

      {/* Room grid */}
      {rooms.length > 0 ? (
        <div
          className="room-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "var(--space-xl)",
          }}
        >
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      ) : (
        <p style={{ color: "var(--color-text-muted)", fontSize: "0.9375rem" }}>
          No rooms available at the moment. <a href="/contact" style={{ color: "var(--color-accent)", textDecoration: "underline" }}>Contact us</a> for more information.
        </p>
      )}
    </main>
  );
}