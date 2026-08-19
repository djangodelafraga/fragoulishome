// ============================================
// fragoulishome.gr — robots.txt (SEO)
// ============================================

import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fragoulishome.gr";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // TODO: Disallow admin + API routes from indexing.
        disallow: ["/admin", "/api", "/booking"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    // TODO: Add host directive if needed.
  };
}