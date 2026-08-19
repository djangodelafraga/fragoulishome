// ============================================
// fragoulishome.gr — Root Layout
// Semantic HTML structure + global SEO metadata.
// ============================================

import type { ReactNode } from "react";
import type { Metadata } from "next";
import "./globals.css";
import CookieConsentBanner from "@/components/CookieConsentBanner";

export const metadata: Metadata = {
  // TODO: Finalize title/description templates.
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://fragoulishome.gr",
  ),
  title: {
    default: "Fragoulishome — Rooms to Let",
    template: "%s | Fragoulishome",
  },
  description:
    "Rooms to let at Fragoulishome. TODO: write a compelling, LLM-friendly meta description.",
  // TODO: Add openGraph, twitter, robots, alternates, icons, verification.
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  // TODO: Add <html lang="el"> for Greek or "en" depending on target audience.
  // TODO: Add resource hints (preconnect to supabase/stripe).
  // TODO: Add security headers via next.config (not here).
  return (
    <html lang="en">
      <body>
        {/* TODO: Site header/navigation */}
        {/* TODO: Semantic <header>, <nav>, <main>, <footer> structure */}
        <main>{children}</main>
        {/* TODO: Site footer */}
        <CookieConsentBanner />
      </body>
    </html>
  );
}