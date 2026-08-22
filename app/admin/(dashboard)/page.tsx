// ============================================
// fragoulishome.gr — Admin Dashboard Page
// Stats cards, recent bookings, quick actions.
// ============================================

import type { Metadata } from "next";
import Link from "next/link";
import { getDashboardStats } from "@/lib/supabaseClient";

export const metadata: Metadata = {
  title: "Admin Dashboard",
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

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  return (
    <section>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-xl)" }}>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem" }}>Dashboard</h1>
        <span style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)" }}>
          {new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
        </span>
      </div>

      {/* Stats Cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
        gap: "var(--space-md)",
        marginBottom: "var(--space-2xl)",
      }}>
        <StatCard label="Total Rooms" value={stats.totalRooms.toString()} sub={`${stats.activeRooms} active`} />
        <StatCard label="Total Bookings" value={stats.totalBookings.toString()} sub={`${stats.pendingBookings} pending`} />
        <StatCard label="Confirmed" value={stats.confirmedBookings.toString()} sub={`${stats.completedBookings} completed`} />
        <StatCard label="Revenue" value={formatCurrency(stats.totalRevenue)} sub="Confirmed + completed" />
        <StatCard label="Cancelled" value={stats.cancelledBookings.toString()} sub="Total cancelled" />
      </div>

      {/* Quick Actions */}
      <div style={{ marginBottom: "var(--space-2xl)" }}>
        <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.125rem", marginBottom: "var(--space-md)" }}>Quick Actions</h2>
        <div style={{ display: "flex", gap: "var(--space-sm)", flexWrap: "wrap" }}>
          <Link
            href="/admin/rooms"
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
            Manage Rooms
          </Link>
          <Link
            href="/admin/bookings"
            style={{
              padding: "0.5rem 1rem",
              fontSize: "0.8125rem",
              color: "var(--color-accent)",
              background: "transparent",
              border: "1px solid var(--color-accent)",
              borderRadius: "2px",
              textDecoration: "none",
              lineHeight: 1.4,
            }}
          >
            View Bookings
          </Link>
          <Link
            href="/admin/calendar"
            style={{
              padding: "0.5rem 1rem",
              fontSize: "0.8125rem",
              color: "var(--color-accent)",
              background: "transparent",
              border: "1px solid var(--color-accent)",
              borderRadius: "2px",
              textDecoration: "none",
              lineHeight: 1.4,
            }}
          >
            Calendar
          </Link>
        </div>
      </div>

      {/* Recent Bookings */}
      <div>
        <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.125rem", marginBottom: "var(--space-md)" }}>Recent Bookings</h2>
        {stats.recentBookings.length > 0 ? (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.8125rem" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                  <th style={{ textAlign: "left", padding: "0.5rem 0.75rem", fontWeight: 500, color: "var(--color-text-muted)" }}>Guest</th>
                  <th style={{ textAlign: "left", padding: "0.5rem 0.75rem", fontWeight: 500, color: "var(--color-text-muted)" }}>Room</th>
                  <th style={{ textAlign: "left", padding: "0.5rem 0.75rem", fontWeight: 500, color: "var(--color-text-muted)" }}>Dates</th>
                  <th style={{ textAlign: "left", padding: "0.5rem 0.75rem", fontWeight: 500, color: "var(--color-text-muted)" }}>Total</th>
                  <th style={{ textAlign: "left", padding: "0.5rem 0.75rem", fontWeight: 500, color: "var(--color-text-muted)" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentBookings.map((booking) => (
                  <tr key={booking.id} style={{ borderBottom: "1px solid var(--color-border)" }}>
                    <td style={{ padding: "0.5rem 0.75rem" }}>
                      <div>{booking.guestName}</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>{booking.guestEmail}</div>
                    </td>
                    <td style={{ padding: "0.5rem 0.75rem" }}>{booking.roomId.slice(0, 8)}...</td>
                    <td style={{ padding: "0.5rem 0.75rem", whiteSpace: "nowrap" }}>
                      {formatDate(booking.checkIn)} – {formatDate(booking.checkOut)}
                    </td>
                    <td style={{ padding: "0.5rem 0.75rem" }}>{formatCurrency(booking.totalPrice)}</td>
                    <td style={{ padding: "0.5rem 0.75rem" }}>
                      <StatusBadge status={booking.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)" }}>No bookings yet.</p>
        )}
      </div>
    </section>
  );
}

// --- Sub-components ---

function StatCard({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div style={{
      padding: "var(--space-md)",
      background: "var(--color-bg-alt)",
      border: "1px solid var(--color-border)",
      borderRadius: "2px",
    }}>
      <div style={{ fontSize: "0.6875rem", fontWeight: 500, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>
        {label}
      </div>
      <div style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", color: "var(--color-text)", lineHeight: 1.2 }}>
        {value}
      </div>
      <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", marginTop: "0.25rem" }}>
        {sub}
      </div>
    </div>
  );
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