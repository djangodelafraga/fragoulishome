// ============================================
// fragoulishome.gr — Admin Edit Room Page
// Form to edit an existing room.
// ============================================

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getRoomBySlug } from "@/lib/supabaseClient";
import RoomForm from "../../RoomForm";

export const metadata: Metadata = {
  title: "Edit Room",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function EditRoomPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const room = await getRoomBySlug(slug);

  if (!room) {
    notFound();
  }

  return (
    <section>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-xl)" }}>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem" }}>Edit: {room.title}</h1>
        <Link
          href="/admin/rooms"
          style={{
            fontSize: "0.8125rem",
            color: "var(--color-text-muted)",
            textDecoration: "underline",
          }}
        >
          &larr; Back to Rooms
        </Link>
      </div>

      <RoomForm
        initialData={{
          id: room.id,
          title: room.title,
          slug: room.slug,
          description: room.description,
          shortDescription: room.shortDescription,
          pricePerNight: room.pricePerNight,
          capacity: room.capacity,
          bedType: room.bedType,
          sizeSqm: room.sizeSqm,
          amenities: room.amenities,
          coverImageUrl: room.coverImageUrl,
          isActive: room.isActive,
        }}
      />
    </section>
  );
}