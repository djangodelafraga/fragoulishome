// ============================================
// fragoulishome.gr — Admin Dashboard Layout
// Auth guard: redirects unauthenticated users to /admin/login.
// Uses @supabase/ssr for cookie-based session persistence.
// ============================================

import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { checkAdminAuth } from "@/lib/supabaseAdmin";
import AdminSidebar from "@/components/AdminSidebar";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const isAdmin = await checkAdminAuth();

  if (!isAdmin) {
    redirect("/admin/login");
  }

  return (
    <div className="admin-layout" style={{ display: "flex", minHeight: "100vh" }}>
      <AdminSidebar />
      <div className="admin-content" style={{ flex: 1, padding: "var(--space-xl) var(--space-2xl)", maxWidth: "1200px" }}>
        {children}
      </div>
    </div>
  );
}