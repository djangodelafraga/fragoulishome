// ============================================
// fragoulishome.gr — SeoHead Placeholder Component
// TODO: Implement SEO head component (meta tags, OG, JSON-LD, canonical).
// NOTE: With App Router, per-page metadata is preferred via metadata.ts.
// This component is kept as a scaffolding reference for client-side needs.
// ============================================

interface SeoHeadProps {
  title?: string;
  description?: string;
  canonical?: string;
  jsonLd?: Record<string, unknown>;
}

export default function SeoHead({
  title,
  description,
  canonical,
  jsonLd,
}: SeoHeadProps) {
  // TODO: Render <title>, <meta name="description">, canonical link.
  // TODO: Inject JSON-LD script tag (structured data).
  void title;
  void description;
  void canonical;
  void jsonLd;

  return null;
}