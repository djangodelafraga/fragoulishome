// ============================================
// fragoulishome.gr — Performance Optimization
// Caching strategy, image optimization, preloading, CDN hints.
// ============================================

// ============================================
// Caching strategy — ISR revalidation times
// ============================================

export const CACHE_TIMES = {
  /** Home page — revalidate every 60s */
  HOME: 60,
  /** Room listing — revalidate every 60s */
  ROOMS_LIST: 60,
  /** Room detail — revalidate every 60s */
  ROOM_DETAIL: 60,
  /** Static pages (terms, privacy, contact) — revalidate every 5min */
  STATIC_PAGE: 300,
  /** Room data from API — Cache stale for 1h, revalidate in background */
  ROOM_DATA: { revalidate: 60, staleWhileRevalidate: 3600 },
  /** Availability data — Cache for 30s (changes frequently) */
  AVAILABILITY: { revalidate: 30, staleWhileRevalidate: 300 },
} as const;

export type CacheConfig = number | { revalidate: number; staleWhileRevalidate?: number };

/**
 * Returns fetch cache options for server-side data fetching.
 * Use with `fetch()` in Server Components.
 *
 * @example
 * ```ts
 * const data = await fetch(url, fetchCacheOptions(CACHE_TIMES.ROOM_DATA));
 * ```
 */
export function fetchCacheOptions(config: CacheConfig): RequestInit {
  if (typeof config === "number") {
    return { next: { revalidate: config } } satisfies RequestInit;
  }

  const nextConfig: Record<string, unknown> = { revalidate: config.revalidate };
  if (config.staleWhileRevalidate) {
    // Next.js 15 supports stale-while-revalidate via the fetch cache extension
    nextConfig.staleWhileRevalidate = config.staleWhileRevalidate;
  }

  return { next: nextConfig } as unknown as RequestInit;
}

// ============================================
// Image optimization — next/image configuration
// ============================================

/**
 * Remote image patterns allowed for next/image.
 * Used in next.config.mjs `images.remotePatterns`.
 */
export const IMAGE_REMOTE_PATTERNS = [
  { protocol: "https" as const, hostname: "**.supabase.co" },
];

/**
 * Default image optimization options.
 */
export const IMAGE_CONFIG = {
  /** Default quality for optimized images */
  quality: 80,
  /** Supported formats in priority order */
  formats: ["image/avif", "image/webp"] as readonly string[],
  /** Device sizes for responsive images (matches Tailwind breakpoints) */
  deviceSizes: [480, 640, 768, 1024, 1280, 1536] as readonly number[],
  /** Image sizes for fill/width-based images */
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384] as readonly number[],
} as const;

// ============================================
// CDN hints — dns-prefetch and preconnect
// ============================================

interface ResourceHint {
  /** Link relation type */
  rel: "dns-prefetch" | "preconnect";
  /** Origin URL */
  href: string;
  /** crossorigin attribute (optional) */
  crossOrigin?: "anonymous" | "use-credentials";
}

/**
 * Returns CDN resource hints for third-party origins.
 * These should be rendered as `<link>` tags in `<head>`.
 */
export function getCdnHints(): ResourceHint[] {
  return [
    // Supabase (authentication, database, storage)
    { rel: "preconnect", href: "https://heoqwpbkdarhctxugzuk.supabase.co", crossOrigin: "anonymous" },
    // Stripe (payment processing)
    { rel: "preconnect", href: "https://js.stripe.com", crossOrigin: "anonymous" },
    { rel: "preconnect", href: "https://api.stripe.com", crossOrigin: "anonymous" },
    // OpenStreetMap (map tiles on contact page)
    { rel: "preconnect", href: "https://*.openstreetmap.org", crossOrigin: "anonymous" },
    // DNS prefetch fallbacks for browsers that don't support preconnect
    { rel: "dns-prefetch", href: "https://heoqwpbkdarhctxugzuk.supabase.co" },
    { rel: "dns-prefetch", href: "https://js.stripe.com" },
    { rel: "dns-prefetch", href: "https://api.stripe.com" },
  ];
}

// ============================================
// Font preloading
// ============================================

/**
 * Returns preload link tags for critical fonts.
 * Each returns a `<link>` tag string for injection in layout `<head>`.
 */
export function getFontPreloadLinks(): { rel: string; href: string; as: string; crossOrigin?: string }[] {
  return [
    {
      rel: "preload",
      href: "/fonts/dancing-script.woff2",
      as: "font",
      crossOrigin: "anonymous",
    },
  ];
}

// ============================================
// Prefetch hints for critical pages
// ============================================

export const PREFETCH_ROUTES = [
  "/rooms",
  "/booking",
  "/contact",
] as const;

// ============================================
// Lazy loading configuration
// ============================================

/**
 * Components that should be lazy-loaded (dynamic import).
 * Returns component names and their import paths.
 */
export function getLazyComponents(): Record<string, string> {
  return {
    // Heavy third-party or below-the-fold components
    BookingForm: "@/components/BookingForm",
    CookieConsentBanner: "@/components/CookieConsentBanner",
  };
}