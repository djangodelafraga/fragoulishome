// ============================================
// fragoulishome.gr — BookingForm
// Direct-contact CTA for manual reservations.
// Online booking/payment is not yet active;
// guests are directed to email or call us.
// ============================================

import type { Room } from "@/types/database";

interface BookingFormProps {
  /** Room may be undefined if no roomId was provided in the URL */
  room?: Room;
}

export default function BookingForm({ room }: BookingFormProps) {
  return (
    <section
      aria-labelledby="booking-contact-heading"
      style={{
        padding: "var(--space-xl)",
        background: "var(--color-bg-alt)",
        border: "1px solid var(--color-border)",
        borderRadius: "2px",
        maxWidth: "640px",
      }}
    >
      <h2
        id="booking-contact-heading"
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "1.25rem",
          marginBottom: "var(--space-md)",
        }}
      >
        How to complete your reservation
      </h2>

      <p style={{ fontSize: "0.9375rem", lineHeight: 1.7, color: "var(--color-text)", marginBottom: "var(--space-lg)" }}>
        To confirm your stay, please contact us directly using one of the methods below.
        We will confirm availability, answer any questions, and finalise your booking manually.
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
          {/* Envelope icon */}
          <span aria-hidden="true" style={{ fontSize: "1.25rem", flexShrink: 0, width: "1.5rem", textAlign: "center" }}>
            &#9993;
          </span>
          <div>
            <strong style={{ display: "block", fontSize: "0.9375rem", marginBottom: "0.25rem" }}>Email us</strong>
            <a
              href={`mailto:fragoulishome@gmail.com?subject=Booking enquiry${room ? ` — ${room.title}` : ""}`}
              style={{ fontSize: "0.875rem", color: "var(--color-accent)", textDecoration: "underline", wordBreak: "break-all" }}
            >
              fragoulishome@gmail.com
            </a>
            <p style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)", marginTop: "0.25rem" }}>
              Please include your preferred dates, number of guests{room ? `, and the room you are interested in (${room.title})` : ", and the room you are interested in"}.
            </p>
          </div>
        </div>

        {/* Phone — placeholder until number is available */}
        <div style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "var(--space-md)",
          padding: "var(--space-md)",
          background: "var(--color-white)",
          border: "1px solid var(--color-border)",
          borderRadius: "2px",
        }}>
          <span aria-hidden="true" style={{ fontSize: "1.25rem", flexShrink: 0, width: "1.5rem", textAlign: "center" }}>
            &#9742;
          </span>
          <div>
            <strong style={{ display: "block", fontSize: "0.9375rem", marginBottom: "0.25rem" }}>Call us</strong>
            <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)" }}>
              Phone number coming soon. In the meantime, please reach us by email.
            </p>
          </div>
        </div>

        {/* Address */}
        <div style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "var(--space-md)",
          padding: "var(--space-md)",
          background: "var(--color-white)",
          border: "1px solid var(--color-border)",
          borderRadius: "2px",
        }}>
          <span aria-hidden="true" style={{ fontSize: "1.25rem", flexShrink: 0, width: "1.5rem", textAlign: "center" }}>
            &#9906;
          </span>
          <div>
            <strong style={{ display: "block", fontSize: "0.9375rem", marginBottom: "0.25rem" }}>Visit us</strong>
            <address style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", fontStyle: "normal", lineHeight: 1.6 }}>
              Fragoulishome<br />
              Epar.Od. Sitias – Palekastrou – Vai<br />
              Petras, Sitia 723 00<br />
              Crete, Greece
            </address>
          </div>
        </div>
      </div>

      <p style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)", marginTop: "var(--space-lg)", lineHeight: 1.6 }}>
        We aim to respond to all enquiries within 24 hours. If you do not hear back, please check your spam folder or try contacting us again.
      </p>
    </section>
  );
}