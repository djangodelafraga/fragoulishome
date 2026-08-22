// ============================================
// fragoulishome.gr — Supabase Admin Client
// Server-side Supabase client using cookies for session persistence.
// Uses @supabase/ssr to read the auth cookie from the request.
// ============================================

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function getAdminSession() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return { user: null, error: "Missing env vars" };
  }

  const cookieStore = await cookies();

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll() {
        // Server-side read-only — we don't need to set cookies here
      },
    },
  });

  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return { user: null, error };
  }

  return { user, error: null };
}

export async function checkAdminAuth(): Promise<boolean> {
  const ADMIN_EMAILS = process.env.ADMIN_EMAILS?.split(",") ?? [];

  const { user, error } = await getAdminSession();

  if (error || !user) {
    return false;
  }

  // Check if user has admin role in profiles table
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) return false;

  const cookieStore = await cookies();
  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll() {
        // Read-only
      },
    },
  });

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile && (profile.role === "admin" || profile.role === "superadmin")) {
    return true;
  }

  // Fallback: check ADMIN_EMAILS env var
  if (user.email && ADMIN_EMAILS.includes(user.email)) {
    return true;
  }

  return false;
}