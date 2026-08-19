// ============================================
// fragoulishome.gr — AdminSidebar Placeholder Component
// TODO: Implement admin dashboard navigation sidebar.
// ============================================

"use client";

import Link from "next/link";

export default function AdminSidebar() {
  // TODO: Render nav links to /admin, /admin/rooms, /admin/bookings, /admin/calendar.
  // TODO: Highlight active route.
  // TODO: Add logout button (used by admin auth).

  return (
    <nav className="admin-sidebar">
      {/* TODO: Sidebar navigation UI */}
      <ul>
        <li>
          <Link href="/admin">Dashboard</Link>
        </li>
        <li>
          <Link href="/admin/rooms">Rooms</Link>
        </li>
        <li>
          <Link href="/admin/bookings">Bookings</Link>
        </li>
        <li>
          <Link href="/admin/calendar">Calendar</Link>
        </li>
      </ul>
    </nav>
  );
}