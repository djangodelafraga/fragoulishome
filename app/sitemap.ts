// ============================================
// fragoulishome.gr — Sitemap (SEO)
// Generates static routes + dynamic room detail pages from Supabase.
// ============================================

import type { MetadataRoute } from "next";
import { getRooms } from "@/lib/supabaseClient";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fragoulishome.gr";

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/rooms`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.1,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.1,
    },
  ];

  // Dynamic room detail pages
  let roomRoutes: MetadataRoute.Sitemap = [];
  try {
    const rooms = await getRooms();
    roomRoutes = rooms.map((room) => ({
      url: `${baseUrl}/rooms/${room.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  } catch (error) {
    console.error("Failed to fetch rooms for sitemap:", error);
  }

  return [...staticRoutes, ...roomRoutes];
}
