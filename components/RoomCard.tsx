// ============================================
// fragoulishome.gr — RoomCard Component
// Displays a room card with cover image, title, price, capacity, link.
// ============================================

import Image from "next/image";
import Link from "next/link";
import type { Room } from "@/types/database";

interface RoomCardProps {
  room: Room;
}

export default function RoomCard({ room }: RoomCardProps) {
  const coverSrc = room.coverImageUrl ?? room.images?.[0]?.url ?? null;
  const altText = room.images?.[0]?.altText ?? room.title;

  return (
    <article className="room-card">
      <Link href={`/rooms/${room.slug}`}>
        {/* Cover image */}
        <div className="room-card__image">
          {coverSrc ? (
            <Image
              src={coverSrc}
              alt={altText}
              width={400}
              height={300}
              style={{ objectFit: "cover", width: "100%", height: "auto" }}
            />
          ) : (
            <div
              className="room-card__image-placeholder"
              style={{
                width: "100%",
                height: 200,
                background: "#e0e0e0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#888",
              }}
            >
              No image yet
            </div>
          )}
        </div>

        {/* Details */}
        <div className="room-card__body">
          <h2 className="room-card__title">{room.title}</h2>
          {room.shortDescription && (
            <p className="room-card__description">{room.shortDescription}</p>
          )}
          <div className="room-card__meta">
            <span className="room-card__price">
              €{room.pricePerNight}
              <small> / night</small>
            </span>
            <span className="room-card__capacity">
              Up to {room.capacity} guests
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}