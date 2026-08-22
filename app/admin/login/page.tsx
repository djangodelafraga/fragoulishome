// ============================================
// fragoulishome.gr — Admin Login Page
// Email/password login via Supabase Auth.
// Uses @supabase/ssr for cookie-based session persistence.
// ============================================

"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseKey) {
        setError("Server configuration error. Please contact the administrator.");
        setLoading(false);
        return;
      }

      // Create browser client — this automatically persists the session to cookies
      const supabase = createBrowserClient(supabaseUrl, supabaseKey);

      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError || !data.user) {
        setError("Invalid email or password. Please try again.");
        setLoading(false);
        return;
      }

      // Check if user has admin role
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .single();

      const role = profile?.role as string | undefined;
      if (role !== "admin" && role !== "superadmin") {
        // Sign out since they're not admin
        await supabase.auth.signOut();
        setError("This account does not have admin access.");
        setLoading(false);
        return;
      }

      // Redirect to admin dashboard
      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "var(--space-lg)",
        background: "var(--color-bg)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "var(--space-2xl)",
          background: "var(--color-white)",
          border: "1px solid var(--color-border)",
          borderRadius: "2px",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "1.5rem",
            marginBottom: "var(--space-xs)",
            textAlign: "center",
          }}
        >
          Admin Login
        </h1>
        <p
          style={{
            fontSize: "0.8125rem",
            color: "var(--color-text-muted)",
            textAlign: "center",
            marginBottom: "var(--space-xl)",
          }}
        >
          Sign in to manage Fragoulishome
        </p>

        {error && (
          <div
            role="alert"
            style={{
              padding: "var(--space-sm) var(--space-md)",
              marginBottom: "var(--space-md)",
              fontSize: "0.8125rem",
              color: "#b91c1c",
              background: "#fef2f2",
              border: "1px solid #fecaca",
              borderRadius: "2px",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
          <label style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            <span style={{ fontSize: "0.8125rem", fontWeight: 500, color: "var(--color-text-muted)" }}>Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@fragoulishome.gr"
              autoComplete="email"
              autoFocus
              style={{
                width: "100%",
                padding: "0.625rem 0.75rem",
                fontSize: "0.9375rem",
                fontFamily: "var(--font-sans)",
                color: "var(--color-text)",
                background: "var(--color-bg)",
                border: "1px solid var(--color-border)",
                borderRadius: "2px",
                lineHeight: 1.4,
              }}
            />
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            <span style={{ fontSize: "0.8125rem", fontWeight: 500, color: "var(--color-text-muted)" }}>Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              autoComplete="current-password"
              style={{
                width: "100%",
                padding: "0.625rem 0.75rem",
                fontSize: "0.9375rem",
                fontFamily: "var(--font-sans)",
                color: "var(--color-text)",
                background: "var(--color-bg)",
                border: "1px solid var(--color-border)",
                borderRadius: "2px",
                lineHeight: 1.4,
              }}
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "0.75rem",
              fontSize: "0.8125rem",
              fontWeight: 500,
              letterSpacing: "0.02em",
              textTransform: "uppercase",
              color: "var(--color-white)",
              background: loading ? "var(--color-text-muted)" : "var(--color-accent)",
              border: "none",
              borderRadius: "2px",
              cursor: loading ? "not-allowed" : "pointer",
              lineHeight: 1.4,
              transition: "opacity 0.2s",
              marginTop: "var(--space-sm)",
            }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", textAlign: "center", marginTop: "var(--space-lg)" }}>
          <a href="/" style={{ color: "var(--color-accent)", textDecoration: "underline" }}>
            &larr; Back to site
          </a>
        </p>
      </div>
    </main>
  );
}