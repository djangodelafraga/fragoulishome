// ============================================
// fragoulishome.gr — Booking Page
// Displays enquiry details and directs guests to
// contact us directly for reservations.
// Online booking/payment is not yet active; all
// backend API routes are preserved for future use.
// ============================================

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Book Your Stay",
  description:
    "Book your stay at Fragoulishome in Petras, Sitia, Crete. Select a room, check availability, and contact us directly to confirm your reservation.",
  robots: {
    index: false, // Booking flow is not useful for search indexing.
  },
  openGraph: {
    title: "Book Your Stay · Fragoulishome",
    description:
      "Book your stay at Fragoulishome in Petras, Sitia, Crete. Direct booking, no platform fees.",
    url: "https://fragoulishome.gr/booking",
    siteName: "Fragoulishome",
    locale: "el_GR",
    type: "website",
  },
};
import { getRoomById, getRooms } from "@/lib/supabaseClient";
import BookingForm from "@/components/BookingForm";

interface BookingPageProps {
  searchParams: Promise<{
    roomId?: string;
    checkIn?: string;
    checkOut?: string;
    guests?: string;
  }>;
}

export default async function BookingPage({ searchParams }: BookingPageProps) {
  const { roomId, checkIn, checkOut, guests } = await searchParams;

  // Fetch room if roomId provided
  const room = roomId ? await getRoomById(roomId) : null;

  // Fetch all rooms for the room picker (when no roomId)
  const allRooms = !roomId ? await getRooms() : [];

  return (
    <main className="container" style={{ paddingBottom: "var(--space-4xl)" }}>
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" style={{ marginBottom: "var(--space-lg)" }}>
        <ol style={{ listStyle: "none", display: "flex", gap: "var(--space-xs)", fontSize: "0.8125rem", color: "var(--color-text-muted)" }}>
          <li><Link href="/" style={{ textDecoration: "underline", color: "var(--color-text-muted)" }}>Home</Link></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" style={{ color: "var(--color-text)" }}>Book Your Stay</li>
        </ol>
      </nav>

      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", marginBottom: "var(--space-xl)" }}>
        Book Your Stay
      </h1>

      {/* Enquiry summary — dates & guests from AvailabilityBar */}
      {(checkIn || checkOut || guests) && (
        <div style={{
          marginBottom: "var(--space-xl)",
          padding: "var(--space-lg)",
          background: "var(--color-bg-alt)",
          border: "1px solid var(--color-border)",
          borderRadius: "2px",
          display: "flex",
          flexWrap: "wrap",
          gap: "var(--space-lg)",
          fontSize: "0.9375rem",
        }}>
          {checkIn && (
            <div>
              <span style={{ display: "block", fontSize: "0.75rem", fontWeight: 500, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.02em", marginBottom: "0.25rem" }}>Check-in</span>
              <strong>{new Date(checkIn).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "long", year: "numeric" })}</strong>
            </div>
          )}
          {checkOut && (
            <div>
              <span style={{ display: "block", fontSize: "0.75rem", fontWeight: 500, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.02em", marginBottom: "0.25rem" }}>Check-out</span>
              <strong>{new Date(checkOut).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "long", year: "numeric" })}</strong>
            </div>
          )}
          {guests && (
            <div>
              <span style={{ display: "block", fontSize: "0.75rem", fontWeight: 500, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.02em", marginBottom: "0.25rem" }}>Guests</span>
              <strong>{guests} {parseInt(guests) === 1 ? "guest" : "guests"}</strong>
            </div>
          )}
        </div>
      )}

      {/* Room picker (when no roomId) */}
      {!roomId && allRooms.length > 0 && (
        <div style={{ marginBottom: "var(--space-xl)" }}>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", marginBottom: "var(--space-md)" }}>
            Select a room
          </h2>
          <div style={{ display: "grid", gap: "var(--space-md)", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
            {allRooms.map((r) => (
              <Link
                key={r.id}
                href={`/booking?roomId=${r.id}${checkIn ? `&checkIn=${checkIn}` : ""}${checkOut ? `&checkOut=${checkOut}` : ""}${guests ? `&guests=${guests}` : ""}`}
                style={{
                  display: "block",
                  padding: "var(--space-md)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "2px",
                  textDecoration: "none",
                  color: "inherit",
                  transition: "border-color 0.2s",
                }}
              >
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.0625rem", marginBottom: "var(--space-xs)" }}>{r.title}</h3>
                <p style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)" }}>
                  Up to {r.capacity} guests{r.sizeSqm ? ` · ${r.sizeSqm} m²` : ""}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Room summary (when roomId provided and room found) */}
      {room && (
        <div style={{
          marginBottom: "var(--space-xl)",
          padding: "var(--space-lg)",
          border: "1px solid var(--color-border)",
          borderRadius: "2px",
        }}>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", marginBottom: "var(--space-sm)" }}>
            {room.title}
          </h2>
          <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", lineHeight: 1.6 }}>
            Up to {room.capacity} guests
            {room.sizeSqm ? ` · ${room.sizeSqm} m²` : ""}
            {room.bedType ? ` · ${room.bedType}` : ""}
          </p>
          {room.shortDescription && (
            <p style={{ fontSize: "0.875rem", color: "var(--color-text)", lineHeight: 1.6, marginTop: "var(--space-sm)" }}>
              {room.shortDescription}
            </p>
          )}
          <p style={{ marginTop: "var(--space-md)" }}>
            <Link
              href={`/rooms/${room.slug}`}
              style={{ fontSize: "0.8125rem", color: "var(--color-accent)", textDecoration: "underline" }}
            >
              View full room details &rarr;
            </Link>
          </p>
        </div>
      )}

      {/* Room not found */}
      {roomId && !room && (
        <div style={{
          marginBottom: "var(--space-xl)",
          padding: "var(--space-lg)",
          background: "var(--color-bg-alt)",
          border: "1px solid var(--color-border)",
          borderRadius: "2px",
        }}>
          <p style={{ color: "var(--color-text-muted)" }}>
            The selected room could not be found. Please browse our rooms or contact us directly.
          </p>
          <p style={{ marginTop: "var(--space-sm)" }}>
            <Link href="/rooms" style={{ fontSize: "0.8125rem", color: "var(--color-accent)", textDecoration: "underline" }}>
              View all rooms &rarr;
            </Link>
          </p>
        </div>
      )}

      {/* Direct contact CTA — the main message */}
      <BookingForm room={room ?? undefined} />
    </main>
  );
}
