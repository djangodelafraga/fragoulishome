// ============================================
// fragoulishome.gr — Admin Dashboard Layout
// Auth guard: redirects unauthenticated users to /admin/login.
// Includes the sidebar navigation.
// ============================================

import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import AdminSidebar from "@/components/AdminSidebar";

const ADMIN_EMAILS = process.env.ADMIN_EMAILS?.split(",") ?? [];

async function checkAdminAuth(): Promise<boolean> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return false;
  }

  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return false;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile && (profile.role === "admin" || profile.role === "superadmin")) {
    return true;
  }

  if (user.email && ADMIN_EMAILS.includes(user.email)) {
    return true;
  }

  return false;
}

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