// ============================================
// fragoulishome.gr — RoomPreview
// Homepage room card: image, name, capacity, brief description, link.
// No price display — homepage is about the stay, not the rate.
// ============================================

import Image from "next/image";
import Link from "next/link";
import type { Room } from "@/types/database";

interface RoomPreviewProps {
  room: Room;
}

export default function RoomPreview({ room }: RoomPreviewProps) {
  const coverSrc = room.coverImageUrl ?? room.images?.[0]?.url ?? null;
  const altText = room.images?.[0]?.altText ?? room.title;
  const description = room.shortDescription ?? room.description;

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

          {/* Brief description */}
          {description && (
            <p style={{ fontSize: "0.875rem", color: "var(--color-text)", lineHeight: 1.6, marginBottom: "var(--space-md)" }}>
              {description}
            </p>
          )}

          <span style={{ fontSize: "0.8125rem", fontWeight: 500, letterSpacing: "0.02em", textTransform: "uppercase", color: "var(--color-accent)" }}>
            View room &rarr;
          </span>
        </div>
      </Link>
    </article>
  );
}
