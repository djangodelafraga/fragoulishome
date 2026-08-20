// ============================================
// fragoulishome.gr — Room Detail Page
// Fetches room by slug from Supabase and displays full details.
// ============================================

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getRoomBySlug } from "@/lib/supabaseClient";
import { generateJsonLd } from "@/lib/seo";

interface RoomDetailPageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60; // ISR: revalidate every 60 seconds

export async function generateMetadata({ params }: RoomDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const room = await getRoomBySlug(slug);

  if (!room) {
    return { title: "Room Not Found · Fragoulishome" };
  }

  const description = room.shortDescription ?? room.description?.slice(0, 160) ?? "";
  const imageUrl = room.coverImageUrl ?? room.images?.[0]?.url ?? undefined;

  return {
    title: `${room.title} · Fragoulishome`,
    description,
    alternates: { canonical: `/rooms/${slug}` },
    openGraph: {
      title: `${room.title} · Fragoulishome`,
      description,
      url: `https://fragoulishome.gr/rooms/${slug}`,
      siteName: "Fragoulishome",
      locale: "el_GR",
      type: "website",
      images: imageUrl ? [{ url: imageUrl, width: 800, height: 600 }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${room.title} · Fragoulishome`,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

export default async function RoomDetailPage({ params }: RoomDetailPageProps) {
  const { slug } = await params;
  const room = await getRoomBySlug(slug);

  if (!room) {
    notFound();
  }

  const jsonLd = generateJsonLd("Room", room);

  const coverSrc = room.coverImageUrl ?? room.images?.[0]?.url ?? null;

  return (
    <main className="container" style={{ paddingTop: "var(--space-3xl)", paddingBottom: "var(--space-4xl)" }}>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" style={{ marginBottom: "var(--space-lg)", fontSize: "0.8125rem", color: "var(--color-text-muted)" }}>
        <ol style={{ listStyle: "none", display: "flex", gap: "var(--space-xs)" }}>
          <li><a href="/" style={{ textDecoration: "underline", color: "var(--color-text-muted)" }}>Home</a></li>
          <li aria-hidden="true">/</li>
          <li><a href="/rooms" style={{ textDecoration: "underline", color: "var(--color-text-muted)" }}>Rooms</a></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" style={{ color: "var(--color-text)" }}>{room.title}</li>
        </ol>
      </nav>

      {/* Title */}
      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", marginBottom: "var(--space-xl)" }}>
        {room.title}
      </h1>

      {/* Image gallery */}
      <section className="room-gallery" style={{ marginBottom: "var(--space-2xl)" }}>
        <div style={{ position: "relative", aspectRatio: "16 / 10", overflow: "hidden", borderRadius: 8, background: "var(--color-border)" }}>
          {coverSrc ? (
            <Image
              src={coverSrc}
              alt={room.images?.[0]?.altText ?? room.title}
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              style={{ objectFit: "cover" }}
              priority
            />
          ) : (
            <div className="image-placeholder" style={{ height: "100%" }}>
              Image coming soon
            </div>
          )}
        </div>

        {/* Thumbnail strip for additional images */}
        {room.images && room.images.length > 1 && (
          <div
            className="room-gallery__thumbs"
            style={{ display: "flex", gap: "var(--space-sm)", marginTop: "var(--space-sm)", overflowX: "auto" }}
          >
            {room.images.map((img) => (
              <div key={img.id} style={{ position: "relative", flexShrink: 0, width: 120, height: 80, borderRadius: 4, overflow: "hidden" }}>
                <Image
                  src={img.url}
                  alt={img.altText}
                  fill
                  sizes="120px"
                  style={{ objectFit: "cover" }}
                />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Price + capacity summary */}
      <div
        className="room-summary"
        style={{
          display: "flex",
          gap: "var(--space-xl)",
          flexWrap: "wrap",
          marginBottom: "var(--space-xl)",
          padding: "var(--space-lg)",
          background: "var(--color-bg-alt)",
          borderRadius: 8,
          fontSize: "0.9375rem",
        }}
      >
        <div>
          <span style={{ fontSize: "1.5rem", fontWeight: 600, color: "var(--color-accent)" }}>
            €{room.pricePerNight}
          </span>
          <small style={{ color: "var(--color-text-muted)" }}> / night</small>
        </div>
        <div style={{ color: "var(--color-text-muted)" }}>
          Up to <strong>{room.capacity}</strong> guests
        </div>
        {room.bedType && (
          <div style={{ color: "var(--color-text-muted)" }}>
            <strong style={{ color: "var(--color-text)" }}>{room.bedType}</strong> bed
          </div>
        )}
        {room.sizeSqm && (
          <div style={{ color: "var(--color-text-muted)" }}>
            <strong style={{ color: "var(--color-text)" }}>{room.sizeSqm}</strong> m²
          </div>
        )}
      </div>

      {/* Description */}
      <section className="room-description" style={{ marginBottom: "var(--space-xl)" }}>
        <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", marginBottom: "var(--space-md)" }}>
          About this room
        </h2>
        <p style={{ color: "var(--color-text)", lineHeight: 1.7, maxWidth: "42em" }}>{room.description}</p>
        {/* LLM_OPTIMIZATION: room.llmDescription is served only via structured data (JSON-LD) for AI crawlers.
             Not shown to human visitors — update lib/seo.ts roomSeoDescription() if needed for meta tags. */}
      </section>

      {/* Amenities */}
      {room.amenities.length > 0 && (
        <section className="room-amenities" style={{ marginBottom: "var(--space-xl)" }}>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", marginBottom: "var(--space-md)" }}>
            Amenities
          </h2>
          <ul style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-sm)", listStyle: "none", padding: 0 }}>
            {room.amenities.map((amenity) => (
              <li
                key={amenity}
                style={{
                  padding: "0.375rem 0.875rem",
                  background: "var(--color-accent-light)",
                  color: "var(--color-text)",
                  borderRadius: 20,
                  fontSize: "0.875rem",
                }}
              >
                {amenity}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Location */}
      <section className="room-location" style={{ marginBottom: "var(--space-xl)" }}>
        <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", marginBottom: "var(--space-md)" }}>
          Location
        </h2>
        {room.locationSummary && (
          <p style={{ color: "var(--color-text)", lineHeight: 1.7, marginBottom: "var(--space-sm)", maxWidth: "42em" }}>
            {room.locationSummary}
          </p>
        )}
        <p style={{ color: "var(--color-text-muted)", fontSize: "0.9375rem" }}>
          {room.address.city}, {room.address.country}
          {room.address.metroStation && ` — near ${room.address.metroStation}`}
        </p>
      </section>

      {/* Booking CTA */}
      <div style={{ marginTop: "var(--space-2xl)", padding: "var(--space-lg)", background: "var(--color-bg-alt)", borderRadius: 8, borderLeft: "3px solid var(--color-accent)" }}>
        <p style={{ fontSize: "0.9375rem", marginBottom: "var(--space-md)", lineHeight: 1.6 }}>
          Ready to book? Reserve directly through our website — no platform fees, no commissions.
        </p>
        <Link
          href={`/booking?roomId=${room.id}`}
          style={{
            display: "inline-block",
            padding: "0.75rem 2rem",
            background: "var(--color-accent)",
            color: "var(--color-white)",
            borderRadius: 6,
            textDecoration: "none",
            fontWeight: 600,
            fontSize: "0.9375rem",
          }}
        >
          Book this room
        </Link>
      </div>
    </main>
  );
}