// ============================================
// fragoulishome.gr — BookingForm
// Interactive booking enquiry form.
// Collects guest details and sends an enquiry email
// to fragoulishome@gmail.com via the backend API.
// ============================================

"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { Room } from "@/types/database";

interface BookingFormProps {
  room?: Room;
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialGuests?: string;
}

export default function BookingForm({
  room,
  initialCheckIn,
  initialCheckOut,
  initialGuests,
}: BookingFormProps) {
  const router = useRouter();

  const [checkIn, setCheckIn] = useState(initialCheckIn ?? "");
  const [checkOut, setCheckOut] = useState(initialCheckOut ?? "");
  const [guests, setGuests] = useState(initialGuests ?? "2");
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Calculate nights and total
  const nights =
    checkIn && checkOut
      ? Math.max(1, Math.round(
          (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24),
        ))
      : 0;

  const totalPrice = room && nights > 0 ? room.pricePerNight * nights : 0;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const payload = {
        roomId: room?.id ?? null,
        roomTitle: room?.title ?? "Not specified",
        checkIn,
        checkOut,
        guests: Number(guests),
        guestName,
        guestEmail,
        guestPhone: guestPhone || null,
        specialRequests: specialRequests || null,
      };

      const res = await fetch("/api/enquiries/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      // Redirect to confirmation page with enquiry data
      const params = new URLSearchParams({
        roomTitle: room?.title ?? "Not specified",
        checkIn,
        checkOut,
        guests: String(guests),
        guestName,
        guestEmail,
      });

      router.push(`/booking/confirmation?${params.toString()}`);
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
      setLoading(false);
    }
  }

  // Calculate min dates (today for check-in, check-in + 1 for check-out)
  const today = new Date().toISOString().split("T")[0];
  const minCheckOut = checkIn
    ? new Date(new Date(checkIn).getTime() + 86400000).toISOString().split("T")[0]
    : today;

  return (
    <section
      aria-labelledby="booking-form-heading"
      style={{
        maxWidth: "640px",
      }}
    >
      <h2
        id="booking-form-heading"
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "1.25rem",
          marginBottom: "var(--space-md)",
        }}
      >
        Send a Booking Request
      </h2>

      <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", marginBottom: "var(--space-lg)", lineHeight: 1.6 }}>
        Fill in your details below and we will receive your request instantly.
        We will confirm availability and get back to you as soon as possible.
      </p>

      {error && (
        <div
          role="alert"
          style={{
            padding: "var(--space-sm) var(--space-md)",
            marginBottom: "var(--space-md)",
            fontSize: "0.8125rem",
            color: "#991b1b",
            background: "#fee2e2",
            border: "1px solid #fecaca",
            borderRadius: "2px",
          }}
        >
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-md)",
          padding: "var(--space-lg)",
          background: "var(--color-bg-alt)",
          border: "1px solid var(--color-border)",
          borderRadius: "2px",
        }}
      >
        {/* Room (read-only if selected) */}
        {room && (
          <div style={{ fontSize: "0.875rem", color: "var(--color-text)", padding: "0.5rem 0.625rem", background: "var(--color-white)", border: "1px solid var(--color-border)", borderRadius: "2px" }}>
            <span style={{ fontSize: "0.75rem", fontWeight: 500, color: "var(--color-text-muted)", display: "block", marginBottom: "0.125rem" }}>Selected Room</span>
            {room.title} — €{room.pricePerNight}/night
          </div>
        )}

        {/* Dates */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-sm)" }}>
          <FormField label="Check-in" required>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              min={today}
              required
            />
          </FormField>

          <FormField label="Check-out" required>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              min={minCheckOut}
              required
            />
          </FormField>
        </div>

        {/* Price summary */}
        {room && nights > 0 && (
          <div style={{
            padding: "0.5rem 0.625rem",
            fontSize: "0.875rem",
            background: "var(--color-white)",
            border: "1px solid var(--color-border)",
            borderRadius: "2px",
          }}>
            <span style={{ color: "var(--color-text-muted)" }}>
              {nights} {nights === 1 ? "night" : "nights"} × €{room.pricePerNight}
            </span>
            <span style={{ float: "right", fontWeight: 600 }}>
              €{totalPrice}
            </span>
          </div>
        )}

        {/* Guest info */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-sm)" }}>
          <FormField label="Guests" required>
            <input
              type="number"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              min={1}
              max={room?.capacity ?? 10}
              required
            />
          </FormField>

          <FormField label="Phone (optional)">
            <input
              type="tel"
              value={guestPhone}
              onChange={(e) => setGuestPhone(e.target.value)}
              placeholder="+30 6XX XXX XXXX"
            />
          </FormField>
        </div>

        <FormField label="Your Name" required>
          <input
            type="text"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            placeholder="John Doe"
            required
          />
        </FormField>

        <FormField label="Your Email" required>
          <input
            type="email"
            value={guestEmail}
            onChange={(e) => setGuestEmail(e.target.value)}
            placeholder="john@example.com"
            required
          />
        </FormField>

        <FormField label="Special Requests (optional)">
          <textarea
            value={specialRequests}
            onChange={(e) => setSpecialRequests(e.target.value)}
            rows={3}
            placeholder="Any special requirements, preferences, or questions..."
            style={{ resize: "vertical" }}
          />
        </FormField>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "0.75rem",
            fontSize: "0.875rem",
            fontWeight: 500,
            letterSpacing: "0.02em",
            color: "var(--color-white)",
            background: loading ? "var(--color-text-muted)" : "var(--color-accent)",
            border: "none",
            borderRadius: "2px",
            cursor: loading ? "not-allowed" : "pointer",
            lineHeight: 1.4,
            transition: "opacity 0.2s",
            marginTop: "var(--space-sm)",
          }}
        >
          {loading ? "Sending your request..." : "Send Booking Request"}
        </button>
      </form>
    </section>
  );
}

// --- Sub-component ---

function FormField({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
      <span style={{ fontSize: "0.8125rem", fontWeight: 500, color: "var(--color-text-muted)" }}>
        {label}
        {required && <span style={{ color: "#991b1b", marginLeft: "0.125rem" }}>*</span>}
      </span>
      {children}
      <style>{`
        input[type="text"], input[type="email"], input[type="tel"], input[type="number"], input[type="date"], textarea {
          width: 100%;
          padding: 0.5rem 0.625rem;
          font-size: 0.875rem;
          font-family: var(--font-sans);
          color: var(--color-text);
          background: var(--color-white);
          border: 1px solid var(--color-border);
          border-radius: 2px;
          line-height: 1.4;
          box-sizing: border-box;
        }
        textarea { resize: vertical; }
      `}</style>
    </label>
  );
}