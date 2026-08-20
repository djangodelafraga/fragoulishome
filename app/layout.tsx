// ============================================
// fragoulishome.gr — Root Layout
// Minimal premium header + sparse footer.
// ============================================

import type { ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import "./globals.css";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import MobileNav from "@/components/MobileNav";

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
        <a
          href="#main-content"
          className="sr-only"
          style={{
            position: "absolute",
            left: "0.5rem",
            top: "0.5rem",
            background: "var(--color-accent)",
            color: "var(--color-white)",
            padding: "0.5rem 1rem",
            zIndex: 1000,
          }}
        >
          Skip to main content
        </a>

        {/* Header — minimal, transparent, no border */}
        <header
          role="banner"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
          }}
        >
          <nav
            aria-label="Main navigation"
            className="container"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: "var(--space-lg)",
              paddingBottom: "var(--space-lg)",
            }}
          >
            {/* Wordmark — serif, more typographic presence */}
            <Link
              href="/"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.125rem, 2vw, 1.5rem)",
                letterSpacing: "-0.01em",
                color: "var(--color-white)",
                whiteSpace: "nowrap",
                textShadow: "0 1px 3px rgba(0,0,0,0.15)",
              }}
            >
              Fragoulishome
            </Link>

            {/* Desktop nav links — small, widely spaced */}
            <div
              style={{
                display: "none",
                gap: "var(--space-2xl)",
                alignItems: "center",
              }}
              className="nav-links"
            >
              <Link
                href="/rooms"
                style={{
                  fontSize: "0.75rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--color-white)",
                  textShadow: "0 1px 2px rgba(0,0,0,0.1)",
                  transition: "opacity 0.2s",
                }}
              >
                Rooms
              </Link>
              <Link
                href="/#location"
                style={{
                  fontSize: "0.75rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--color-white)",
                  textShadow: "0 1px 2px rgba(0,0,0,0.1)",
                  transition: "opacity 0.2s",
                }}
              >
                Location
              </Link>
              <Link
                href="/#about"
                style={{
                  fontSize: "0.75rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--color-white)",
                  textShadow: "0 1px 2px rgba(0,0,0,0.1)",
                  transition: "opacity 0.2s",
                }}
              >
                About
              </Link>
            </div>

            {/* Mobile hamburger */}
            <MobileNav />
          </nav>
        </header>

        <main id="main-content" role="main">
          {children}
        </main>

        {/* Footer — sparse, editorial */}
        <footer
          role="contentinfo"
          style={{
            paddingTop: "clamp(60px, 8vw, 100px)",
            paddingBottom: "var(--space-xl)",
          }}
        >
          <div
            className="container"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "var(--space-lg)",
              textAlign: "center",
            }}
          >
            {/* Brand */}
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.25rem",
                color: "var(--color-text)",
              }}
            >
              Fragoulishome
            </p>

            {/* Location */}
            <address
              style={{
                fontStyle: "normal",
                fontSize: "0.8125rem",
                color: "var(--color-text-muted)",
                lineHeight: 1.8,
              }}
            >
              Petras, Sitia · Crete 723 00 · Greece
            </address>

            {/* Contact */}
            <p style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)" }}>
              <a
                href="mailto:fragoulishome@gmail.com"
                style={{
                  color: "var(--color-accent)",
                  borderBottom: "1px solid transparent",
                  transition: "border-color 0.2s",
                }}
              >
                fragoulishome@gmail.com
              </a>
            </p>
          </div>

          {/* Bottom bar — essential links only */}
          <div
            className="container"
            style={{
              marginTop: "var(--space-2xl)",
              paddingTop: "var(--space-md)",
              borderTop: "1px solid var(--color-border)",
              fontSize: "0.6875rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--color-text-muted)",
              textAlign: "center",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "var(--space-sm) var(--space-lg)",
            }}
          >
            <Link
              href="/terms#privacy-policy"
              style={{ color: "var(--color-text-muted)", whiteSpace: "nowrap", transition: "color 0.2s" }}
            >
              Privacy
            </Link>
            <Link
              href="/terms#terms-conditions"
              style={{ color: "var(--color-text-muted)", whiteSpace: "nowrap", transition: "color 0.2s" }}
            >
              Terms
            </Link>
            <Link
              href="/terms#cookie-policy"
              style={{ color: "var(--color-text-muted)", whiteSpace: "nowrap", transition: "color 0.2s" }}
            >
              Cookies
            </Link>
            <Link
              href="/contact"
              style={{ color: "var(--color-text-muted)", whiteSpace: "nowrap", transition: "color 0.2s" }}
            >
              Contact
            </Link>
            <span>&copy; {new Date().getFullYear()}</span>
          </div>
        </footer>

        <CookieConsentBanner />

        {/* Cookie consent configuration — loads before interactive */}
        <Script src="/cookie-config.js" strategy="beforeInteractive" />
      </body>
    </html>
  );
}