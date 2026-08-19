// ============================================
// fragoulishome.gr — Booking Page Metadata (SEO)
// ============================================

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Room",
  description: "Book your stay at Fragoulishome. TODO: improve booking description.",
  robots: {
    index: false, // Booking flow is not useful for search indexing.
  },
  // TODO: Add canonical URL + noindex confirmation.
};