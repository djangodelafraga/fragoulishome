// ============================================
// fragoulishome.gr — SEO Utilities
// Metadata, OpenGraph, JSON-LD structured data.
// ============================================

import type { Metadata } from "next";
import type { Room } from "@/types/database";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fragoulishome.gr";

// ============================================
// Base metadata
// ============================================

export function generateMetadata(input?: {
  title?: string;
  description?: string;
  path?: string;
}): Metadata {
  const title = input?.title
    ? `${input.title} · Fragoulishome`
    : "Fragoulishome · Self-catered rooms in Sitia, Crete";

  const description =
    input?.description ??
    "Two peaceful maisonettes among olive and pine trees, steps from the sea. Direct booking, no platform fees. Petras, Sitia, eastern Crete.";

  const url = input?.path ? `${SITE_URL}${input.path}` : SITE_URL;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Fragoulishome",
      locale: "el_GR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

// ============================================
// OpenGraph + Twitter Card
// ============================================

export function generateOpenGraph(params: {
  title: string;
  description: string;
  imageUrl?: string;
  type?: string;
}): Record<string, unknown> {
  const url = SITE_URL;
  return {
    "og:title": params.title,
    "og:description": params.description,
    "og:image": params.imageUrl ?? `${url}/og-default.jpg`,
    "og:type": params.type ?? "website",
    "og:site_name": "Fragoulishome",
    "og:locale": "el_GR",
    "twitter:card": "summary_large_image",
    "twitter:title": params.title,
    "twitter:description": params.description,
    "twitter:image": params.imageUrl ?? `${url}/og-default.jpg`,
  };
}

// ============================================
// JSON-LD Structured Data
// ============================================

export function generateJsonLd(
  type: "Room" | "Site" | "FAQ" | "BreadcrumbList",
  data: unknown,
): Record<string, unknown> {
  switch (type) {
    case "Room": {
      const room = data as Room;
      return {
        "@context": "https://schema.org",
        "@type": "Product",
        name: room.title,
        description: room.description ?? room.shortDescription ?? "",
        image: room.coverImageUrl ?? room.images?.[0]?.url ?? "",
        offers: {
          "@type": "Offer",
          price: room.pricePerNight,
          priceCurrency: room.currency ?? "EUR",
          availability: room.isActive
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
        },
      };
    }

    case "Site": {
      return {
        "@context": "https://schema.org",
        "@type": "LodgingBusiness",
        name: "Fragoulishome",
        description:
          "Two self-catered maisonettes set in a private olive grove in Petras, Sitia, Crete. Direct booking.",
        image: `${SITE_URL}/og-default.jpg`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Sitia",
          addressRegion: "Crete",
          addressCountry: "GR",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 35.2075,
          longitude: 26.1067,
        },
        telephone: "+30 6971988575",
      };
    }

    case "FAQ": {
      const faqData = data as { questions: { question: string; answer: string }[] };
      return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: (faqData.questions ?? []).map((q) => ({
          "@type": "Question",
          name: q.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: q.answer,
          },
        })),
      };
    }

    case "BreadcrumbList": {
      const items = data as { name: string; url: string }[];
      return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: (items ?? []).map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
        })),
      };
    }

    default:
      return {};
  }
}

// ============================================
// Utility helpers
// ============================================

export function canonicalUrl(path: string): string {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function roomSeoDescription(room: Room): string {
  const parts: string[] = [room.shortDescription ?? room.description?.slice(0, 120) ?? ""];
  parts.push(`€${room.pricePerNight}/night`);
  parts.push(`up to ${room.capacity} guests`);
  if (room.bedType) parts.push(room.bedType);
  return parts.filter(Boolean).join(" · ");
}