// ============================================
// fragoulishome.gr — SEO Scaffolding
// Empty placeholder functions for metadata generation.
// No real logic.
// ============================================

import type { Metadata } from "next";
import type { Room } from "@/types/database";

// TODO: Generate base metadata (title, description, canonical URL, etc.).
export async function generateMetadata(_input?: {
  title?: string;
  description?: string;
  path?: string;
}): Promise<Metadata> {
  // TODO: Build title template, canonical, robots directives, alternates.
  return {};
}

// TODO: Generate OpenGraph + Twitter Card metadata for social sharing.
export function generateOpenGraph(
  _params: { title: string; description: string; imageUrl?: string; type?: string },
): Record<string, unknown> {
  // TODO: Return og:title, og:description, og:image, og:type, twitter:* tags.
  return {};
}

// TODO: Generate JSON-LD structured data (LodgingBusiness/Product/FAQPage).
export function generateJsonLd(
  _type: "Room" | "Site" | "FAQ" | "BreadcrumbList",
  _data: unknown,
): Record<string, unknown> {
  // TODO: Return @context + @type + structured fields.
  return {};
}

// --- Additional SEO helpers (placeholders) ---

// TODO: Build canonical URL for a given path.
export function canonicalUrl(_path: string): string {
  // TODO: `${NEXT_PUBLIC_SITE_URL}${path}`
  return "";
}

// TODO: Generate LLM-friendly room summary for meta descriptions.
export function roomSeoDescription(_room: Room): string {
  // TODO: Compose concise, keyword-rich description.
  void _room;
  return "";
}