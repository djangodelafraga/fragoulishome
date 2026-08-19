// ============================================
// fragoulishome.gr — AvailabilityBar
// Compact date/guests enquiry form for the hero section.
// Client component for interactive date picking.
// ============================================

"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function AvailabilityBar() {
  const router = useRouter();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (checkIn) params.set("checkIn", checkIn);
    if (checkOut) params.set("checkOut", checkOut);
    if (guests) params.set("guests", guests);
    router.push(`/booking?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      aria-label="Check availability"
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "var(--space-sm)",
        alignItems: "flex-end",
        background: "var(--color-white)",
        padding: "var(--space-md)",
        borderRadius: "2px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
      }}
    >
      <label style={{ flex: "1 1 140px", minWidth: 0 }}>
        <span style={{ display: "block", fontSize: "0.75rem", fontWeight: 500, color: "var(--color-text-muted)", marginBottom: "0.25rem", letterSpacing: "0.02em", textTransform: "uppercase" }}>
          Check in
        </span>
        <input
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          aria-label="Check-in date"
          style={{
            width: "100%",
            padding: "0.5rem 0.625rem",
            fontSize: "0.875rem",
            fontFamily: "var(--font-sans)",
            color: "var(--color-text)",
            background: "var(--color-bg)",
            border: "1px solid var(--color-border)",
            borderRadius: "2px",
            lineHeight: 1.4,
          }}
        />
      </label>

      <label style={{ flex: "1 1 140px", minWidth: 0 }}>
        <span style={{ display: "block", fontSize: "0.75rem", fontWeight: 500, color: "var(--color-text-muted)", marginBottom: "0.25rem", letterSpacing: "0.02em", textTransform: "uppercase" }}>
          Check out
        </span>
        <input
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          aria-label="Check-out date"
          style={{
            width: "100%",
            padding: "0.5rem 0.625rem",
            fontSize: "0.875rem",
            fontFamily: "var(--font-sans)",
            color: "var(--color-text)",
            background: "var(--color-bg)",
            border: "1px solid var(--color-border)",
            borderRadius: "2px",
            lineHeight: 1.4,
          }}
        />
      </label>

      <label style={{ flex: "0 1 80px", minWidth: 0 }}>
        <span style={{ display: "block", fontSize: "0.75rem", fontWeight: 500, color: "var(--color-text-muted)", marginBottom: "0.25rem", letterSpacing: "0.02em", textTransform: "uppercase" }}>
          Guests
        </span>
        <select
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          aria-label="Number of guests"
          style={{
            width: "100%",
            padding: "0.5rem 0.625rem",
            fontSize: "0.875rem",
            fontFamily: "var(--font-sans)",
            color: "var(--color-text)",
            background: "var(--color-bg)",
            border: "1px solid var(--color-border)",
            borderRadius: "2px",
            lineHeight: 1.4,
          }}
        >
          {[1, 2, 3, 4].map((n) => (
            <option key={n} value={n}>{n} {n === 1 ? "guest" : "guests"}</option>
          ))}
        </select>
      </label>

      <button
        type="submit"
        style={{
          flex: "0 0 auto",
          padding: "0.5rem 1.25rem",
          fontSize: "0.8125rem",
          fontWeight: 500,
          letterSpacing: "0.02em",
          textTransform: "uppercase",
          color: "var(--color-white)",
          background: "var(--color-accent)",
          border: "none",
          borderRadius: "2px",
          cursor: "pointer",
          lineHeight: 1.4,
          transition: "background 0.2s",
          whiteSpace: "nowrap",
        }}
      >
        Check
      </button>
    </form>
  );
}