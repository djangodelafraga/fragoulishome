// ============================================
// fragoulishome.gr — Admin Calendar Page
// Visual availability management for all rooms.
// Admin can view bookings, block/unblock dates, and trigger iCal sync.
// ============================================

import type { Metadata } from "next";
import { getRooms } from "@/lib/supabaseClient";
import { checkAdminAuth } from "@/lib/supabaseAdmin";
import AdminCalendarClient from "./AdminCalendarClient";

export const metadata: Metadata = {
  title: "Calendar · Admin",
  robots: { index: false, follow: false },
};

export default async function AdminCalendarPage() {
  const isAdmin = await checkAdminAuth();
  if (!isAdmin) {
    return (
      <section>
        <h1>Access Denied</h1>
        <p>You must be logged in as an admin to view this page.</p>
      </section>
    );
  }

  const rooms = await getRooms();

  return (
    <section>
      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", marginBottom: "var(--space-lg)" }}>
        Availability Calendar
      </h1>
      <AdminCalendarClient rooms={rooms} />
    </section>
  );
}