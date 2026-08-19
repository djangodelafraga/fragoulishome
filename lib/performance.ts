// ============================================
// fragoulishome.gr — Performance Scaffolding
// Empty placeholder functions.
// No real logic.
// ============================================

// TODO: Apply caching strategy (Next.js fetch cache, ISR, SWR, etc.).
export function applyCaching(): void {
  // TODO: Configure revalidate intervals + cache tags for data fetching.
}

// TODO: Optimize images (next/image, remote patterns, quality/format).
export function optimizeImages(): void {
  // TODO: Configure next/image usage, AVIF/WebP, blur placeholders.
}

// TODO: Prefetch routes likely to be visited next.
export function prefetchRoutes(): void {
  // TODO: Prefetch /rooms, /rooms/[id], /booking via router.prefetch.
}

// TODO: Preload critical assets (fonts, hero images, key scripts).
export function preloadAssets(): void {
  // TODO: Preload fonts + above-the-fold images.
}

// --- Additional performance placeholders ---

// TODO: Lazy loading for below-the-fold components.
export function lazyLoadingConfig(): void {
  // TODO: dynamic(() => import(...), { ssr: false }) for heavy components.
}

// TODO: CDN hints (dns-prefetch, preconnect) for Supabase/Stripe.
export function cdnHints(): string[] {
  // TODO: Return resource hints for third-party origins.
  return [];
}

// TODO: Compression / bundle optimization.
export function compressionConfig(): void {
  // TODO: Enable gzip/brotli, code-splitting, tree-shaking.
}