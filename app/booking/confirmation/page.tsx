// ============================================
// fragoulishome.gr — Booking Confirmation Page
// Shown after a guest submits a booking enquiry.
// Displays a thank-you message, summary of the request,
// and info that bookings are done manually.
// ============================================

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Booking Request Sent",
  robots: {
    index: false,
  },
};

interface ConfirmationPageProps {
  searchParams: Promise<{
    roomTitle?: string;
    checkIn?: string;
    checkOut?: string;
    guests?: string;
    guestName?: string;
    guestEmail?: string;
  }>;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function ConfirmationPage({ searchParams }: ConfirmationPageProps) {
  const { roomTitle, checkIn, checkOut, guests, guestName, guestEmail } = await searchParams;

  const nights =
    checkIn && checkOut
      ? Math.max(1, Math.round(
          (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24),
        ))
      : 0;

  return (
    <main className="container" style={{ paddingBottom: "var(--space-4xl)" }}>
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" style={{ marginBottom: "var(--space-lg)" }}>
        <ol style={{ listStyle: "none", display: "flex", gap: "var(--space-xs)", fontSize: "0.8125rem", color: "var(--color-text-muted)" }}>
          <li><Link href="/" style={{ textDecoration: "underline", color: "var(--color-text-muted)" }}>Home</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href="/booking" style={{ textDecoration: "underline", color: "var(--color-text-muted)" }}>Book Your Stay</Link></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" style={{ color: "var(--color-text)" }}>Confirmation</li>
        </ol>
      </nav>

      {/* Success message */}
      <div style={{
        maxWidth: "640px",
        margin: "0 auto",
        textAlign: "center",
        padding: "var(--space-2xl) var(--space-lg)",
      }}>
        {/* Checkmark icon */}
        <div style={{
          width: "64px",
          height: "64px",
          margin: "0 auto var(--space-lg)",
          background: "#d1fae5",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.75rem",
          color: "#065f46",
        }}>
          ✓
        </div>

        <h1 style={{
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(1.5rem, 3vw, 2rem)",
          marginBottom: "var(--space-md)",
        }}>
          Thank You, {guestName || "Guest"}!
        </h1>

        <p style={{
          fontSize: "1rem",
          color: "var(--color-text)",
          lineHeight: 1.7,
          marginBottom: "var(--space-lg)",
        }}>
          Your booking request has been sent successfully. We truly appreciate your interest in staying with us at Fragoulishome.
        </p>

        <p style={{
          fontSize: "0.9375rem",
          color: "var(--color-text-muted)",
          lineHeight: 1.7,
          marginBottom: "var(--space-xl)",
        }}>
          We will review your request and get back to you as soon as possible to confirm availability and finalise your reservation.
        </p>
      </div>

      {/* Enquiry summary */}
      {roomTitle && checkIn && checkOut && (
        <div style={{
          maxWidth: "480px",
          margin: "0 auto var(--space-xl)",
          padding: "var(--space-lg)",
          background: "var(--color-bg-alt)",
          border: "1px solid var(--color-border)",
          borderRadius: "2px",
        }}>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.0625rem", marginBottom: "var(--space-md)", textAlign: "center" }}>
            Your Request Summary
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)", fontSize: "0.875rem" }}>
            <SummaryRow label="Room" value={roomTitle} />
            <SummaryRow label="Check-in" value={formatDate(checkIn)} />
            <SummaryRow label="Check-out" value={formatDate(checkOut)} />
            <SummaryRow label="Nights" value={String(nights)} />
            <SummaryRow label="Guests" value={guests ?? "2"} />
            {guestEmail && <SummaryRow label="Contact email" value={guestEmail} />}
          </div>
        </div>
      )}

      {/* Manual booking info */}
      <div style={{
        maxWidth: "640px",
        margin: "0 auto var(--space-2xl)",
        padding: "var(--space-xl)",
        background: "var(--color-bg-alt)",
        border: "1px solid var(--color-border)",
        borderRadius: "2px",
      }}>
        <h2 style={{
          fontFamily: "var(--font-serif)",
          fontSize: "1.125rem",
          marginBottom: "var(--space-md)",
          textAlign: "center",
        }}>
          How Bookings Work
        </h2>

        <p style={{ fontSize: "0.9375rem", lineHeight: 1.7, color: "var(--color-text)", marginBottom: "var(--space-lg)", textAlign: "center" }}>
          At Fragoulishome, all reservations are handled personally to ensure you receive the best care.
          Bookings are currently done through direct contact.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
          {/* Email */}
          <div style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "var(--space-md)",
            padding: "var(--space-md)",
            background: "var(--color-white)",
            border: "1px solid var(--color-border)",
            borderRadius: "2px",
          }}>
            <span aria-hidden="true" style={{ fontSize: "1.25rem", flexShrink: 0, width: "1.5rem", textAlign: "center" }}>&#9993;</span>
            <div>
              <strong style={{ display: "block", fontSize: "0.9375rem", marginBottom: "0.25rem" }}>Email us</strong>
              <a href="mailto:fragoulishome@gmail.com" style={{ fontSize: "0.875rem", color: "var(--color-accent)", textDecoration: "underline", wordBreak: "break-all" }}>
                fragoulishome@gmail.com
              </a>
            </div>
          </div>

          {/* Phone */}
          <div style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "var(--space-md)",
            padding: "var(--space-md)",
            background: "var(--color-white)",
            border: "1px solid var(--color-border)",
            borderRadius: "2px",
          }}>
            <span aria-hidden="true" style={{ fontSize: "1.25rem", flexShrink: 0, width: "1.5rem", textAlign: "center" }}>&#9742;</span>
            <div>
              <strong style={{ display: "block", fontSize: "0.9375rem", marginBottom: "0.25rem" }}>Call us</strong>
              <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)" }}>
                +30 697 123 4567
              </p>
            </div>
          </div>

          {/* Visit */}
          <div style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "var(--space-md)",
            padding: "var(--space-md)",
            background: "var(--color-white)",
            border: "1px solid var(--color-border)",
            borderRadius: "2px",
          }}>
            <span aria-hidden="true" style={{ fontSize: "1.25rem", flexShrink: 0, width: "1.5rem", textAlign: "center" }}>&#9906;</span>
            <div>
              <strong style={{ display: "block", fontSize: "0.9375rem", marginBottom: "0.25rem" }}>Visit us</strong>
              <address style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", fontStyle: "normal", lineHeight: 1.6 }}>
                Fragoulishome<br />
                Petras, Sitia 723 00<br />
                Crete, Greece
              </address>
            </div>
          </div>
        </div>

        <p style={{
          fontSize: "0.875rem",
          color: "var(--color-text-muted)",
          textAlign: "center",
          marginTop: "var(--space-lg)",
          lineHeight: 1.6,
        }}>
          We aim to respond to all enquiries within 24 hours. If you do not hear back, please check your spam folder or contact us directly.
        </p>
      </div>

      {/* CTA buttons */}
      <div style={{ textAlign: "center", display: "flex", gap: "var(--space-md)", justifyContent: "center", flexWrap: "wrap" }}>
        <Link
          href="/rooms"
          style={{
            padding: "0.625rem 1.5rem",
            fontSize: "0.8125rem",
            color: "var(--color-white)",
            background: "var(--color-accent)",
            border: "none",
            borderRadius: "2px",
            textDecoration: "none",
            lineHeight: 1.4,
          }}
        >
          Browse Our Rooms
        </Link>
        <Link
          href="/"
          style={{
            padding: "0.625rem 1.5rem",
            fontSize: "0.8125rem",
            color: "var(--color-accent)",
            background: "transparent",
            border: "1px solid var(--color-accent)",
            borderRadius: "2px",
            textDecoration: "none",
            lineHeight: 1.4,
          }}
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}

// --- Sub-component ---

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "0.25rem 0", borderBottom: "1px solid var(--color-border)" }}>
      <span style={{ color: "var(--color-text-muted)" }}>{label}</span>
      <span style={{ fontWeight: 500 }}>{value}</span>
    </div>
  );
}