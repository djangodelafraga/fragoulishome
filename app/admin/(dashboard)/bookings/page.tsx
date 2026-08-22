// ============================================
// fragoulishome.gr — Admin Bookings Management Page
// Full bookings list with status management.
// ============================================

import type { Metadata } from "next";
import { getAllBookings } from "@/lib/supabaseClient";
import BookingActions from "./BookingActions";

export const metadata: Metadata = {
  title: "Manage Bookings",
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

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, { bg: string; text: string }> = {
    pending: { bg: "#fef3c7", text: "#92400e" },
    confirmed: { bg: "#d1fae5", text: "#065f46" },
    completed: { bg: "#dbeafe", text: "#1e40af" },
    cancelled: { bg: "#fee2e2", text: "#991b1b" },
    rejected: { bg: "#fee2e2", text: "#991b1b" },
  };
  const c = colors[status] ?? { bg: "#f3f4f6", text: "#374151" };

  return (
    <span style={{
      display: "inline-block",
      padding: "0.125rem 0.5rem",
      fontSize: "0.6875rem",
      fontWeight: 500,
      textTransform: "uppercase",
      letterSpacing: "0.04em",
      background: c.bg,
      color: c.text,
      borderRadius: "2px",
    }}>
      {status}
    </span>
  );
}

export default async function AdminBookingsPage() {
  const bookings = await getAllBookings();

  return (
    <section>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-xl)" }}>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem" }}>Manage Bookings</h1>
        <span style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)" }}>
          {bookings.length} total
        </span>
      </div>

      {bookings.length > 0 ? (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.8125rem" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                <th style={{ textAlign: "left", padding: "0.5rem 0.75rem", fontWeight: 500, color: "var(--color-text-muted)" }}>Guest</th>
                <th style={{ textAlign: "left", padding: "0.5rem 0.75rem", fontWeight: 500, color: "var(--color-text-muted)" }}>Room</th>
                <th style={{ textAlign: "left", padding: "0.5rem 0.75rem", fontWeight: 500, color: "var(--color-text-muted)" }}>Check In</th>
                <th style={{ textAlign: "left", padding: "0.5rem 0.75rem", fontWeight: 500, color: "var(--color-text-muted)" }}>Check Out</th>
                <th style={{ textAlign: "left", padding: "0.5rem 0.75rem", fontWeight: 500, color: "var(--color-text-muted)" }}>Guests</th>
                <th style={{ textAlign: "left", padding: "0.5rem 0.75rem", fontWeight: 500, color: "var(--color-text-muted)" }}>Total</th>
                <th style={{ textAlign: "left", padding: "0.5rem 0.75rem", fontWeight: 500, color: "var(--color-text-muted)" }}>Status</th>
                <th style={{ textAlign: "left", padding: "0.5rem 0.75rem", fontWeight: 500, color: "var(--color-text-muted)" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} style={{ borderBottom: "1px solid var(--color-border)" }}>
                  <td style={{ padding: "0.5rem 0.75rem" }}>
                    <div>{booking.guestName}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>{booking.guestEmail}</div>
                    {booking.guestPhone && (
                      <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>{booking.guestPhone}</div>
                    )}
                  </td>
                  <td style={{ padding: "0.5rem 0.75rem", color: "var(--color-text-muted)" }}>
                    {booking.roomId.slice(0, 8)}...
                  </td>
                  <td style={{ padding: "0.5rem 0.75rem", whiteSpace: "nowrap" }}>
                    {formatDate(booking.checkIn)}
                  </td>
                  <td style={{ padding: "0.5rem 0.75rem", whiteSpace: "nowrap" }}>
                    {formatDate(booking.checkOut)}
                  </td>
                  <td style={{ padding: "0.5rem 0.75rem", textAlign: "center" }}>
                    {booking.numberOfGuests}
                  </td>
                  <td style={{ padding: "0.5rem 0.75rem", whiteSpace: "nowrap" }}>
                    {formatCurrency(booking.totalPrice)}
                  </td>
                  <td style={{ padding: "0.5rem 0.75rem" }}>
                    <StatusBadge status={booking.status} />
                    {booking.paymentStatus && (
                      <div style={{ fontSize: "0.6875rem", color: "var(--color-text-muted)", marginTop: "0.125rem" }}>
                        Payment: {booking.paymentStatus}
                      </div>
                    )}
                  </td>
                  <td style={{ padding: "0.5rem 0.75rem" }}>
                    <BookingActions
                      bookingId={booking.id}
                      currentStatus={booking.status}
                      currentPaymentStatus={booking.paymentStatus}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)" }}>
          No bookings yet. Bookings will appear here when guests make reservations.
        </p>
      )}
    </section>
  );
}