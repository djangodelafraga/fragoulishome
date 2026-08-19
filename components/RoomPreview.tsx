// ============================================
// fragoulishome.gr — RoomPreview
// Homepage room card: image, name, capacity, key amenities, link.
// No price display — homepage is about the stay, not the rate.
// ============================================

import Image from "next/image";
import Link from "next/link";
import type { Room } from "@/types/database";

interface RoomPreviewProps {
  room: Room;
}

const AMENITY_SHOW_LIMIT = 4;

export default function RoomPreview({ room }: RoomPreviewProps) {
  const coverSrc = room.coverImageUrl ?? room.images?.[0]?.url ?? null;
  const altText = room.images?.[0]?.altText || room.title;

  // Extract short amenity labels (strip the category prefix like "Bathroom: ")
  const shortAmenities = (room.amenities ?? [])
    .map((a) => {
      const colonIdx = a.indexOf(":");
      return colonIdx > 0 ? a.slice(colonIdx + 1).trim() : a;
    })
    .filter(Boolean)
    .slice(0, AMENITY_SHOW_LIMIT);

  return (
    <article style={{ borderTop: "1px solid var(--color-border)", paddingTop: "var(--space-xl)" }}>
      <Link href={`/rooms/${room.slug}`} style={{ display: "grid", gap: "var(--space-md)", textDecoration: "none", color: "inherit" }}>
        {/* Image */}
        <div style={{ aspectRatio: "4 / 3", overflow: "hidden", background: "var(--color-border)", position: "relative" }}>
          {coverSrc ? (
            <Image
              src={coverSrc}
              alt={altText}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              style={{ objectFit: "cover" }}
            />
          ) : (
            <div className="image-placeholder" style={{ height: "100%" }}>
              Photograph coming soon
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", marginBottom: "var(--space-xs)" }}>
            {room.title}
          </h3>

          <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", marginBottom: "var(--space-sm)" }}>
            Up to {room.capacity} guests
            {room.sizeSqm ? ` · ${room.sizeSqm} m²` : ""}
            {room.bedType ? ` · ${room.bedType}` : ""}
          </p>

          {/* Key amenities */}
          {shortAmenities.length > 0 && (
            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexWrap: "wrap", gap: "var(--space-xs)", marginBottom: "var(--space-md)" }}>
              {shortAmenities.map((amenity) => (
                <li
                  key={amenity}
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--color-text-muted)",
                    background: "var(--color-bg-alt)",
                    padding: "0.25rem 0.5rem",
                    borderRadius: "2px",
                    lineHeight: 1.4,
                  }}
                >
                  {amenity}
                </li>
              ))}
            </ul>
          )}

          <span style={{ fontSize: "0.8125rem", fontWeight: 500, letterSpacing: "0.02em", textTransform: "uppercase", color: "var(--color-accent)" }}>
            View room &rarr;
          </span>
        </div>
      </Link>
    </article>
  );
}