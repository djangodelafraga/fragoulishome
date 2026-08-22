// ============================================
// fragoulishome.gr — AdminSidebar
// Navigation sidebar with active route highlighting and logout.
// ============================================

"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { createBrowserClient } from "@supabase/ssr";

interface NavItem {
  href: string;
  label: string;
}

const navItems: NavItem[] = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/rooms", label: "Rooms" },
  { href: "/admin/bookings", label: "Bookings" },
  { href: "/admin/calendar", label: "Calendar" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  function isActive(href: string): boolean {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  }

  async function handleLogout() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      const supabase = createBrowserClient(supabaseUrl, supabaseKey);
      await supabase.auth.signOut();
    }

    router.push("/admin/login");
    router.refresh();
  }

  return (
    <nav
      className="admin-sidebar"
      style={{
        width: "240px",
        minHeight: "100vh",
        background: "var(--color-bg-alt)",
        borderRight: "1px solid var(--color-border)",
        display: "flex",
        flexDirection: "column",
        padding: "var(--space-lg) 0",
        position: "sticky",
        top: 0,
        alignSelf: "flex-start",
      }}
    >
      {/* Logo / Brand */}
      <div style={{ padding: "0 var(--space-lg)", marginBottom: "var(--space-xl)" }}>
        <Link
          href="/admin"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "1.125rem",
            color: "var(--color-text)",
            textDecoration: "none",
            display: "block",
          }}
        >
          Fragoulishome
        </Link>
        <span style={{ fontSize: "0.6875rem", color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          Admin
        </span>
      </div>

      {/* Navigation */}
      <ul style={{ listStyle: "none", padding: 0, margin: 0, flex: 1 }}>
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              style={{
                display: "block",
                padding: "0.5rem var(--space-lg)",
                fontSize: "0.875rem",
                color: isActive(item.href) ? "var(--color-accent)" : "var(--color-text)",
                background: isActive(item.href) ? "var(--color-accent-light)" : "transparent",
                textDecoration: "none",
                borderRight: isActive(item.href) ? "2px solid var(--color-accent)" : "2px solid transparent",
                transition: "background 0.15s, color 0.15s",
                fontWeight: isActive(item.href) ? 500 : 400,
              }}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Logout */}
      <div style={{ padding: "var(--space-lg)", borderTop: "1px solid var(--color-border)" }}>
        <button
          onClick={handleLogout}
          style={{
            width: "100%",
            padding: "0.5rem",
            fontSize: "0.8125rem",
            color: "var(--color-text-muted)",
            background: "transparent",
            border: "1px solid var(--color-border)",
            borderRadius: "2px",
            cursor: "pointer",
            lineHeight: 1.4,
            transition: "color 0.15s, border-color 0.15s",
          }}
          onMouseOver={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = "var(--color-text)";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--color-text-muted)";
          }}
          onMouseOut={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = "var(--color-text-muted)";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--color-border)";
          }}
        >
          Sign Out
        </button>
      </div>
    </nav>
  );
}