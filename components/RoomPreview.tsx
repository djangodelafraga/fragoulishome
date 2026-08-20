// ============================================
// fragoulishome.gr — RoomPreview
// Editorial room card: large image, name, metadata, description, link.
// Asymmetric grid layout — alternating image/text sides on desktop.
// ============================================

import Image from "next/image";
import Link from "next/link";
import type { Room } from "@/types/database";

interface RoomPreviewProps {
  room: Room;
  /** Index in the grid — used for alternating layout */
  index?: number;
}

export default function RoomPreview({ room, index = 0 }: RoomPreviewProps) {
  const coverSrc = room.coverImageUrl ?? room.images?.[0]?.url ?? null;
  const altText = room.images?.[0]?.altText ?? room.title;
  const description = room.shortDescription ?? room.description;
  const isEven = index % 2 === 0;

  return (
    <article
      className={`room-preview-grid${isEven ? "" : " alt"}`}
      style={{
        display: "grid",
        gap: "var(--space-xl)",
        gridTemplateColumns: "1fr",
        alignItems: "center",
      }}
    >
      {/* Image — dominant, no card container */}
      <Link
        href={`/rooms/${room.slug}`}
        className="room-preview-image"
        style={{
          display: "block",
          aspectRatio: "4 / 3",
          overflow: "hidden",
          background: "var(--color-border)",
          position: "relative",
        }}
      >
        {coverSrc ? (
          <Image
            src={coverSrc}
            alt={altText}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: "cover" }}
            className="img-hover"
          />
        ) : (
          <div className="image-placeholder" style={{ height: "100%" }}>
            Photograph coming soon
          </div>
        )}
      </Link>

      {/* Details — typography + whitespace, no card */}
      <div className="room-preview-details">
        <p className="label" style={{ marginBottom: "var(--space-sm)" }}>
          {room.title}
        </p>

        <p
          style={{
            fontSize: "0.8125rem",
            color: "var(--color-text-muted)",
            marginBottom: "var(--space-md)",
          }}
        >
          Up to {room.capacity} guests
          {room.sizeSqm ? ` · ${room.sizeSqm} m²` : ""}
          {room.bedType ? ` · ${room.bedType}` : ""}
        </p>

        {description && (
          <p
            style={{
              fontSize: "0.9375rem",
              color: "var(--color-text)",
              lineHeight: 1.7,
              marginBottom: "var(--space-lg)",
              maxWidth: "480px",
            }}
          >
            {description}
          </p>
        )}

        <Link
          href={`/rooms/${room.slug}`}
          className="link-underline"
        >
          Explore &rarr;
        </Link>
      </div>
    </article>
  );
}