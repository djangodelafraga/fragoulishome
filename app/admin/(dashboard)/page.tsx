// ============================================
// fragoulishome.gr — Admin Dashboard Page
// TODO: Implement admin dashboard with stats, recent bookings, quick actions.
// ============================================

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminDashboardPage() {
  // TODO: Fetch summary stats (total rooms, bookings, revenue).
  // TODO: Show recent bookings list.
  // TODO: Quick action buttons (add room, view calendar).

  return (
    <section>
      <h1>Admin Dashboard</h1>

      {/* TODO: Stats cards (rooms, bookings, revenue) */}
      {/* TODO: Recent bookings table */}
      {/* TODO: Quick actions */}
      <p>Admin dashboard placeholder. TODO: implement stats + recent bookings.</p>
    </section>
  );
}