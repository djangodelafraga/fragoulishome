// ============================================
// fragoulishome.gr — Admin Layout
// TODO: Add auth guard (redirect to login if not admin).
// ============================================

import type { ReactNode } from "react";
import AdminSidebar from "@/components/AdminSidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  // TODO: Check user role (admin) before rendering admin content.
  // TODO: Redirect unauthenticated users to login.

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">{children}</div>
    </div>
  );
}