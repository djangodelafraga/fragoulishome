// ============================================
// fragoulishome.gr — Room Detail Page
// Fetches room by slug from Supabase and displays full details.
// ============================================

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getRoomBySlug } from "@/lib/supabaseClient";
import { generateJsonLd } from "@/lib/seo";

interface RoomDetailPageProps {
  params: Promise<{ slug: string }>;
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
    <article>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <h1>{room.title}</h1>

      {/* Image gallery */}
      <section className="room-gallery" style={{ marginBottom: "2rem" }}>
        {coverSrc ? (
          <Image
            src={coverSrc}
            alt={room.images?.[0]?.altText ?? room.title}
            width={800}
            height={500}
            style={{ objectFit: "cover", width: "100%", height: "auto", borderRadius: 8 }}
            priority
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: 300,
              background: "#e0e0e0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#888",
              borderRadius: 8,
            }}
          >
            No image yet
          </div>
        )}

        {/* Thumbnail strip for additional images */}
        {room.images && room.images.length > 1 && (
          <div
            className="room-gallery__thumbs"
            style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem", overflowX: "auto" }}
          >
            {room.images.map((img) => (
              <Image
                key={img.id}
                src={img.url}
                alt={img.altText}
                width={120}
                height={80}
                style={{ objectFit: "cover", borderRadius: 4, flexShrink: 0 }}
              />
            ))}
          </div>
        )}
      </section>

      {/* Price + capacity summary */}
      <div
        className="room-summary"
        style={{
          display: "flex",
          gap: "2rem",
          flexWrap: "wrap",
          marginBottom: "1.5rem",
          padding: "1rem",
          background: "#f5f5f5",
          borderRadius: 8,
        }}
      >
        <div>
          <strong>€{room.pricePerNight}</strong>
          <small> / night</small>
        </div>
        <div>
          <strong>{room.capacity}</strong> guests max
        </div>
        {room.bedType && <div>Bed: <strong>{room.bedType}</strong></div>}
        {room.sizeSqm && <div><strong>{room.sizeSqm}</strong> m²</div>}
      </div>

      {/* Description */}
      <section className="room-description" style={{ marginBottom: "1.5rem" }}>
        <h2>About this room</h2>
        <p>{room.description}</p>
        {room.llmDescription && (
          <details style={{ marginTop: "1rem" }}>
            <summary>More details</summary>
            <p>{room.llmDescription}</p>
          </details>
        )}
      </section>

      {/* Amenities */}
      {room.amenities.length > 0 && (
        <section className="room-amenities" style={{ marginBottom: "1.5rem" }}>
          <h2>Amenities</h2>
          <ul style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", listStyle: "none", padding: 0 }}>
            {room.amenities.map((amenity) => (
              <li
                key={amenity}
                style={{
                  padding: "0.25rem 0.75rem",
                  background: "#e8f4f8",
                  borderRadius: 16,
                  fontSize: "0.9rem",
                }}
              >
                {amenity}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Location */}
      <section className="room-location" style={{ marginBottom: "1.5rem" }}>
        <h2>Location</h2>
        {room.locationSummary && <p>{room.locationSummary}</p>}
        <p>
          {room.address.city}, {room.address.country}
          {room.address.metroStation && ` — near ${room.address.metroStation}`}
        </p>
      </section>

      {/* Booking CTA */}
      <div style={{ marginTop: "2rem" }}>
        <Link
          href={`/booking?roomId=${room.id}`}
          style={{
            display: "inline-block",
            padding: "0.75rem 2rem",
            background: "#b7791f",
            color: "#fff",
            borderRadius: 8,
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          Book this room
        </Link>
      </div>
    </article>
  );
}