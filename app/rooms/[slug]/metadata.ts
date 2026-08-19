// ============================================
// fragoulishome.gr — Room Detail Metadata (SEO)
// Dynamic title/description per room fetched by slug.
// ============================================

import type { Metadata } from "next";
import { getRoomBySlug } from "@/lib/supabaseClient";

interface RoomMetadataProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: RoomMetadataProps): Promise<Metadata> {
  const { slug } = await params;
  const room = await getRoomBySlug(slug);

  if (!room) {
    return { title: "Room Not Found" };
  }

  return {
    title: room.title,
    description: room.shortDescription ?? room.description,
    openGraph: {
      title: room.title,
      description: room.shortDescription ?? room.description,
      images: room.coverImageUrl
        ? [{ url: room.coverImageUrl, alt: room.title }]
        : [],
    },
  };
}