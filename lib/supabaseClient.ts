// ============================================
// fragoulishome.gr — Supabase Client
// Real data access functions for rooms.
// ============================================

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type {
  Room,
  RoomImage,
  RoomAddress,
  Booking,
  Availability,
  User,
} from "@/types/database";

// --- Supabase client initialization ---
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

// ============================================
// DB row types (snake_case → matches Supabase columns)
// ============================================

interface RoomRow {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  short_description: string | null;
  llm_description: string | null;
  price_per_night: number;
  currency: string;
  capacity: number;
  bed_type: string | null;
  size_sqm: number | null;
  amenities: string[] | null;
  images: unknown | null; // jsonb — parsed as RoomImage[]
  cover_image_url: string | null;
  address: unknown | null; // jsonb — parsed as RoomAddress
  location_summary: string | null;
  is_active: boolean;
  created_at: string | null;
  updated_at: string | null;
}

// ============================================
// Row → interface mapper
// ============================================

function mapRoomRow(row: RoomRow): Room {
  let images: RoomImage[] = [];
  if (row.images) {
    if (Array.isArray(row.images)) {
      images = (row.images as Record<string, unknown>[]).map(
        (img, i): RoomImage => ({
          id: (img.id as string) ?? `img-${i}`,
          url: (img.url as string) ?? "",
          altText: (img.altText as string) ?? (img.alt_text as string) ?? "",
          isCover: (img.isCover as boolean) ?? (img.is_cover as boolean) ?? false,
          width: (img.width as number) ?? undefined,
          height: (img.height as number) ?? undefined,
        }),
      );
    }
  }

  let address: RoomAddress = {
    city: "Athens",
    country: "Greece",
  };
  if (row.address && typeof row.address === "object") {
    const a = row.address as Record<string, unknown>;
    address = {
      street: (a.street as string) ?? undefined,
      city: (a.city as string) ?? "Athens",
      postalCode: (a.postalCode as string) ?? (a.postal_code as string) ?? undefined,
      country: (a.country as string) ?? "Greece",
      latitude: (a.latitude as number) ?? undefined,
      longitude: (a.longitude as number) ?? undefined,
      metroStation:
        (a.metroStation as string) ?? (a.metro_station as string) ?? undefined,
    };
  }

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description ?? "",
    shortDescription: row.short_description ?? undefined,
    llmDescription: row.llm_description ?? undefined,
    pricePerNight: row.price_per_night,
    currency: row.currency ?? "EUR",
    capacity: row.capacity,
    bedType: (row.bed_type as Room["bedType"]) ?? undefined,
    sizeSqm: row.size_sqm ?? undefined,
    amenities: row.amenities ?? [],
    images,
    coverImageUrl: row.cover_image_url ?? undefined,
    address,
    locationSummary: row.location_summary ?? undefined,
    isActive: row.is_active,
    createdAt: row.created_at ?? undefined,
    updatedAt: row.updated_at ?? undefined,
  };
}

// ============================================
// Room data access
// ============================================

export async function getRooms(): Promise<Room[]> {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("rooms")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getRooms error:", error);
    return [];
  }

  return (data as RoomRow[]).map(mapRoomRow);
}

export async function getRoomBySlug(slug: string): Promise<Room | null> {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("rooms")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("getRoomBySlug error:", error);
    return null;
  }

  return mapRoomRow(data as RoomRow);
}

// Keep the old getRoomById for backward compatibility (delegates to slug lookup)
export async function getRoomById(id: string): Promise<Room | null> {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("rooms")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("getRoomById error:", error);
    return null;
  }

  return mapRoomRow(data as RoomRow);
}

// ============================================
// Booking data access (placeholders — real logic later)
// ============================================

export async function createBooking(
  _input: Omit<Booking, "id" | "createdAt" | "updatedAt">,
): Promise<Booking | null> {
  // TODO: INSERT INTO bookings (...) VALUES (...);
  return null;
}

export async function checkAvailability(
  _roomId: string,
  _checkIn: string,
  _checkOut: string,
): Promise<Availability[]> {
  // TODO: Query availability/blocks between date ranges.
  return [];
}

export async function syncCalendar(_roomId: string): Promise<void> {
  // TODO: Fetch iCal feed, parse events, upsert availability rows.
}

export async function uploadRoomImages(
  _roomId: string,
  _files: File[],
): Promise<string[]> {
  // TODO: Upload each file, return public URLs.
  return [];
}

// ============================================
// Auth placeholders
// ============================================

export async function getUser(): Promise<User | null> {
  // TODO: supabase.auth.getUser() -> map to User.
  return null;
}

export async function login(
  _email: string,
  _password: string,
): Promise<User | null> {
  // TODO: supabase.auth.signInWithPassword(...)
  return null;
}

export async function logout(): Promise<void> {
  // TODO: supabase.auth.signOut()
}