// ============================================
// fragoulishome.gr — Root Layout
// Minimal premium header + sparse footer.
// ============================================

import type { ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { Dancing_Script } from "next/font/google";
import "./globals.css";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import MobileNav from "@/components/MobileNav";

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-calligraphy",
});

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
      <body className={dancingScript.variable}>
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

        {/* Header — fixed at top, visible on scroll */}
        <header
          role="banner"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            background: "rgba(42, 40, 37, 0.25)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
        >
          <nav
            aria-label="Main navigation"
            className="container"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: "var(--space-sm)",
              paddingBottom: "var(--space-sm)",
            }}
          >
            {/* Wordmark — calligraphy script */}
            <Link
              href="/"
              style={{
                fontFamily: "var(--font-calligraphy), var(--font-serif)",
                fontSize: "clamp(1.25rem, 2vw, 1.75rem)",
                letterSpacing: "0.02em",
                color: "var(--color-white)",
                whiteSpace: "nowrap",
                textShadow: "0 2px 6px rgba(0,0,0,0.3)",
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
              <Link
                href="/contact"
                style={{
                  fontSize: "0.75rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--color-white)",
                  textShadow: "0 1px 2px rgba(0,0,0,0.1)",
                  transition: "opacity 0.2s",
                }}
              >
                Contact
              </Link>
            </div>

            {/* Mobile hamburger */}
            <MobileNav />
          </nav>
        </header>

        <main
          id="main-content"
          role="main"
          style={{
            paddingTop: "clamp(56px, 8vw, 72px)",
          }}
        >
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
            className="container footer-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "var(--space-2xl)",
              textAlign: "center",
              maxWidth: "800px",
              margin: "0 auto",
            }}
          >
            <style>{`
              @media (min-width: 480px) {
                .footer-grid {
                  grid-template-columns: 1fr 1fr !important;
                  align-items: start;
                }
              }
            `}</style>

            {/* Contact Details */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-sm)",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1rem",
                  color: "var(--color-text)",
                  marginBottom: "var(--space-xs)",
                }}
              >
                Get in Touch
              </p>
              <p style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)", margin: 0 }}>
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
              <p style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)", margin: 0 }}>
                <a
                  href="tel:+306971988575"
                  style={{
                    color: "var(--color-accent)",
                    borderBottom: "1px solid transparent",
                    transition: "border-color 0.2s",
                  }}
                >
                  +30 697 198 8575
                </a>
              </p>
              <p style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)", margin: 0 }}>
                <a
                  href="https://instagram.com/fragoulishome"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "var(--color-accent)",
                    borderBottom: "1px solid transparent",
                    transition: "border-color 0.2s",
                  }}
                >
                  @fragoulishome
                </a>
              </p>
            </div>

            {/* Address Details */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-sm)",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1rem",
                  color: "var(--color-text)",
                  marginBottom: "var(--space-xs)",
                }}
              >
                Find Us
              </p>
              <address
                style={{
                  fontStyle: "normal",
                  fontSize: "0.8125rem",
                  color: "var(--color-text-muted)",
                  lineHeight: 1.8,
                  margin: 0,
                }}
              >
                Petras, Sitia<br />
                Crete 723 00<br />
                Greece
              </address>
            </div>
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
            <span>&copy; {new Date().getFullYear()} fragoulishome</span>
          </div>
        </footer>

        <CookieConsentBanner />

        {/* Cookie consent configuration — loads before interactive */}
        <Script src="/cookie-config.js" strategy="beforeInteractive" />
      </body>
    </html>
  );
}