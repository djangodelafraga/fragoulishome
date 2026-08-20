// ============================================
// fragoulishome.gr — Root Layout
// Semantic HTML structure + global SEO metadata.
// ============================================

import type { ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import "./globals.css";
import CookieConsentBanner from "@/components/CookieConsentBanner";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://fragoulishome.gr",
  ),
  title: {
    default: "Fragoulishome — Rooms to Let in Sitia, Crete",
    template: "%s | Fragoulishome",
  },
  description:
    "Two peaceful maisonettes surrounded by olive and pine trees, less than 100 metres from the sea in Petras, Sitia, Crete. Direct booking, no platform fees.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="sr-only" style={{ position: "absolute", left: "0.5rem", top: "0.5rem", background: "var(--color-accent)", color: "var(--color-white)", padding: "0.5rem 1rem", zIndex: 1000 }}>
          Skip to main content
        </a>

        <header role="banner" style={{ borderBottom: "1px solid var(--color-border)" }}>
          <nav aria-label="Main navigation" className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "var(--space-md)", paddingBottom: "var(--space-md)" }}>
            {/* Wordmark */}
            <Link href="/" style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", letterSpacing: "-0.01em", color: "var(--color-text)", whiteSpace: "nowrap" }}>
              Fragoulishome
            </Link>

            {/* Desktop nav links */}
            <div style={{ display: "none", gap: "var(--space-xl)", alignItems: "center" }} className="nav-links">
              <Link href="/rooms" style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", transition: "color 0.2s" }}>
                Rooms
              </Link>
              <Link href="/#location" style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", transition: "color 0.2s" }}>
                Location
              </Link>
              <Link href="/#about" style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", transition: "color 0.2s" }}>
                About
              </Link>
            </div>

            {/* Check availability CTA */}
            <Link
              href="/booking"
              style={{
                fontSize: "0.8125rem",
                fontWeight: 500,
                letterSpacing: "0.02em",
                textTransform: "uppercase",
                color: "var(--color-white)",
                background: "var(--color-accent)",
                padding: "0.5rem 1rem",
                borderRadius: "2px",
                transition: "background 0.2s",
                whiteSpace: "nowrap",
              }}
            >
              Check availability
            </Link>
          </nav>
        </header>

        <main id="main-content" role="main">
          {children}
        </main>

        <footer role="contentinfo" style={{ borderTop: "1px solid var(--color-border)", marginTop: "var(--space-4xl)", paddingTop: "var(--space-2xl)", paddingBottom: "var(--space-2xl)" }}>
          <div className="container" style={{ display: "grid", gap: "var(--space-xl)", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
            {/* Contact */}
            <div>
              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1rem", marginBottom: "var(--space-sm)" }}>Contact</h3>
              <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", lineHeight: 1.8 }}>
                <a href="mailto:fragoulishome@gmail.com" style={{ color: "var(--color-accent)" }}>fragoulishome@gmail.com</a>
                <br />
                {/* TODO: Add phone number when available */}
              </p>
            </div>

            {/* Address */}
            <div>
              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1rem", marginBottom: "var(--space-sm)" }}>Address</h3>
              <address style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", fontStyle: "normal", lineHeight: 1.8 }}>
                Petras, Sitia<br />
                Crete 723 00, Greece
              </address>
            </div>

            {/* Links */}
            <div>
              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1rem", marginBottom: "var(--space-sm)" }}>Links</h3>
              <nav aria-label="Footer navigation" style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", lineHeight: 2 }}>
                <Link href="/rooms" style={{ display: "block", color: "var(--color-accent)" }}>Rooms</Link>
                <Link href="/privacy" style={{ display: "block", color: "var(--color-accent)" }}>Privacy Policy</Link>
                <Link href="/terms" style={{ display: "block", color: "var(--color-accent)" }}>Terms & Conditions</Link>
              </nav>
            </div>
          </div>

          <div className="container" style={{ marginTop: "var(--space-xl)", paddingTop: "var(--space-md)", borderTop: "1px solid var(--color-border)", fontSize: "0.75rem", color: "var(--color-text-muted)", textAlign: "center" }}>
            &copy; {new Date().getFullYear()} Fragoulishome. All rights reserved.
          </div>
        </footer>

        <CookieConsentBanner />

        {/* Cookie consent configuration — loads before interactive */}
        <Script
          src="/cookie-config.js"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}