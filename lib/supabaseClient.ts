// ============================================
// fragoulishome.gr — Supabase Client
// Real data access functions for rooms, bookings, availability, auth, and storage.
// ============================================

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type {
  Room,
  RoomRow,
  RoomImage,
  RoomAddress,
  Booking,
  BookingRow,
  BookingStatus,
  Availability,
  AvailabilityRow,
  PaymentRecord,
  PaymentRow,
  PaymentStatus,
  User,
  ProfileRow,
  CalendarFeed,
  CalendarFeedRow,
} from "@/types/database";

// ============================================
// Supabase client (lazy, per-request)
// ============================================

function getSupabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    console.error("[supabase] Missing env vars:", {
      hasUrl: !!url,
      hasKey: !!key,
    });
    return null;
  }

  return createClient(url, key);
}

function getServiceSupabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    console.error("[supabase] Missing service-role env vars");
    return null;
  }

  return createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

// ============================================
// Row → model mappers
// ============================================

function mapRoomRow(row: RoomRow): Room {
  let images: RoomImage[] = [];
  if (row.images && Array.isArray(row.images)) {
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

  let address: RoomAddress = { city: "Athens", country: "Greece" };
  if (row.address && typeof row.address === "object") {
    const a = row.address as Record<string, unknown>;
    address = {
      street: (a.street as string) ?? undefined,
      city: (a.city as string) ?? "Athens",
      postalCode: (a.postalCode as string) ?? (a.postal_code as string) ?? undefined,
      country: (a.country as string) ?? "Greece",
      latitude: (a.latitude as number) ?? undefined,
      longitude: (a.longitude as number) ?? undefined,
      metroStation: (a.metroStation as string) ?? (a.metro_station as string) ?? undefined,
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
    isActive: row.is_active ?? true,
    createdAt: row.created_at ?? undefined,
    updatedAt: row.updated_at ?? undefined,
  };
}

function mapBookingRow(row: BookingRow): Booking {
  return {
    id: row.id,
    roomId: row.room_id,
    guestId: row.guest_id ?? undefined,
    guestName: row.guest_name,
    guestEmail: row.guest_email,
    guestPhone: row.guest_phone ?? undefined,
    checkIn: row.check_in,
    checkOut: row.check_out,
    numberOfGuests: row.number_of_guests,
    totalPrice: row.total_price,
    currency: row.currency ?? "EUR",
    status: (row.status as BookingStatus) ?? "pending",
    paymentStatus: (row.payment_status as PaymentStatus) ?? undefined,
    paymentRecordId: row.payment_record_id ?? undefined,
    specialRequests: row.special_requests ?? undefined,
    createdAt: row.created_at ?? undefined,
    updatedAt: row.updated_at ?? undefined,
  };
}

function mapAvailabilityRow(row: AvailabilityRow): Availability {
  return {
    id: row.id,
    roomId: row.room_id,
    date: row.date,
    isAvailable: row.is_available ?? true,
    reason: (row.reason as Availability["reason"]) ?? undefined,
    priceOverride: row.price_override ?? undefined,
  };
}

function mapPaymentRow(row: PaymentRow): PaymentRecord {
  return {
    id: row.id,
    bookingId: row.booking_id,
    stripePaymentIntentId: row.stripe_payment_intent_id ?? undefined,
    stripeCustomerId: row.stripe_customer_id ?? undefined,
    amount: row.amount,
    currency: row.currency ?? "EUR",
    status: (row.status as PaymentStatus) ?? "unpaid",
    receiptUrl: row.receipt_url ?? undefined,
    createdAt: row.created_at ?? undefined,
    updatedAt: row.updated_at ?? undefined,
  };
}

function mapProfileRow(row: ProfileRow): User {
  return {
    id: row.id,
    email: row.email ?? "",
    fullName: row.full_name ?? undefined,
    phone: row.phone ?? undefined,
    role: (row.role as User["role"]) ?? "guest",
    createdAt: row.created_at ?? undefined,
  };
}

function mapCalendarFeedRow(row: CalendarFeedRow): CalendarFeed {
  return {
    id: row.id,
    roomId: row.room_id,
    url: row.url,
    lastSyncedAt: row.last_synced_at ?? undefined,
    externalId: row.external_id ?? undefined,
  };
}

// ============================================
// Room data access
// ============================================

export async function getRooms(): Promise<Room[]> {
  const client = getSupabase();
  if (!client) {
    console.error("[getRooms] No Supabase client");
    return [];
  }

  const { data, error } = await client
    .from("rooms")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[getRooms] error:", JSON.stringify(error));
    return [];
  }

  return (data ?? []).map(mapRoomRow);
}

export async function getAllRooms(): Promise<Room[]> {
  const client = getSupabase();
  if (!client) {
    console.error("[getAllRooms] No Supabase client");
    return [];
  }

  const { data, error } = await client
    .from("rooms")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[getAllRooms] error:", JSON.stringify(error));
    return [];
  }

  return (data ?? []).map(mapRoomRow);
}

export async function getRoomBySlug(slug: string): Promise<Room | null> {
  const client = getSupabase();
  if (!client) return null;

  const { data, error } = await client
    .from("rooms")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("[getRoomBySlug] error:", JSON.stringify(error));
    return null;
  }

  return data ? mapRoomRow(data as RoomRow) : null;
}

export async function getRoomById(id: string): Promise<Room | null> {
  const client = getSupabase();
  if (!client) return null;

  const { data, error } = await client
    .from("rooms")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("[getRoomById] error:", JSON.stringify(error));
    return null;
  }

  return data ? mapRoomRow(data as RoomRow) : null;
}

export async function updateRoom(
  id: string,
  updates: Partial<Omit<Room, "id" | "createdAt" | "updatedAt">>,
): Promise<Room | null> {
  const client = getSupabase();
  if (!client) return null;

  const row: Record<string, unknown> = {};
  if (updates.title !== undefined) row.title = updates.title;
  if (updates.slug !== undefined) row.slug = updates.slug;
  if (updates.description !== undefined) row.description = updates.description;
  if (updates.shortDescription !== undefined) row.short_description = updates.shortDescription;
  if (updates.pricePerNight !== undefined) row.price_per_night = updates.pricePerNight;
  if (updates.capacity !== undefined) row.capacity = updates.capacity;
  if (updates.bedType !== undefined) row.bed_type = updates.bedType;
  if (updates.sizeSqm !== undefined) row.size_sqm = updates.sizeSqm;
  if (updates.amenities !== undefined) row.amenities = updates.amenities;
  if (updates.isActive !== undefined) row.is_active = updates.isActive;
  if (updates.coverImageUrl !== undefined) row.cover_image_url = updates.coverImageUrl;

  const { data, error } = await client
    .from("rooms")
    .update(row)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("[updateRoom] error:", JSON.stringify(error));
    return null;
  }

  return data ? mapRoomRow(data as RoomRow) : null;
}

export async function createRoom(
  input: Omit<Room, "id" | "createdAt" | "updatedAt" | "images" | "address">,
): Promise<Room | null> {
  const client = getSupabase();
  if (!client) return null;

  const row: Record<string, unknown> = {
    slug: input.slug,
    title: input.title,
    description: input.description,
    short_description: input.shortDescription ?? null,
    price_per_night: input.pricePerNight,
    currency: input.currency,
    capacity: input.capacity,
    bed_type: input.bedType ?? null,
    size_sqm: input.sizeSqm ?? null,
    amenities: input.amenities,
    cover_image_url: input.coverImageUrl ?? null,
    is_active: input.isActive,
  };

  const { data, error } = await client
    .from("rooms")
    .insert(row)
    .select()
    .single();

  if (error) {
    console.error("[createRoom] error:", JSON.stringify(error));
    return null;
  }

  return data ? mapRoomRow(data as RoomRow) : null;
}

export async function deleteRoom(id: string): Promise<boolean> {
  const client = getSupabase();
  if (!client) return false;

  const { error } = await client
    .from("rooms")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("[deleteRoom] error:", JSON.stringify(error));
    return false;
  }

  return true;
}

// ============================================
// Booking data access
// ============================================

export async function createBooking(
  input: Omit<Booking, "id" | "createdAt" | "updatedAt">,
): Promise<Booking | null> {
  const client = getSupabase();
  if (!client) {
    console.error("[createBooking] No Supabase client");
    return null;
  }

  const row = {
    room_id: input.roomId,
    guest_id: input.guestId ?? null,
    guest_name: input.guestName,
    guest_email: input.guestEmail,
    guest_phone: input.guestPhone ?? null,
    check_in: input.checkIn,
    check_out: input.checkOut,
    number_of_guests: input.numberOfGuests,
    total_price: input.totalPrice,
    currency: input.currency,
    status: input.status,
    payment_status: input.paymentStatus ?? null,
    payment_record_id: input.paymentRecordId ?? null,
    special_requests: input.specialRequests ?? null,
  };

  const { data, error } = await client
    .from("bookings")
    .insert(row as Record<string, unknown>)
    .select()
    .single();

  if (error) {
    console.error("[createBooking] error:", JSON.stringify(error));
    return null;
  }

  return data ? mapBookingRow(data as BookingRow) : null;
}

export async function getBookingById(id: string): Promise<Booking | null> {
  const client = getSupabase();
  if (!client) return null;

  const { data, error } = await client
    .from("bookings")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("[getBookingById] error:", JSON.stringify(error));
    return null;
  }

  return data ? mapBookingRow(data as BookingRow) : null;
}

export async function getAllBookings(): Promise<Booking[]> {
  const client = getSupabase();
  if (!client) return [];

  const { data, error } = await client
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[getAllBookings] error:", JSON.stringify(error));
    return [];
  }

  return (data ?? []).map(mapBookingRow);
}

export async function updateBookingStatus(
  id: string,
  status: BookingStatus,
  paymentStatus?: PaymentStatus,
): Promise<Booking | null> {
  const client = getSupabase();
  if (!client) return null;

  const updates: Record<string, string | null> = { status };
  if (paymentStatus !== undefined) {
    updates.payment_status = paymentStatus;
  }

  const { data, error } = await client
    .from("bookings")
    .update(updates as Record<string, unknown>)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("[updateBookingStatus] error:", JSON.stringify(error));
    return null;
  }

  return data ? mapBookingRow(data as BookingRow) : null;
}

// ============================================
// Availability data access
// ============================================

export async function checkAvailability(
  roomId: string,
  checkIn: string,
  checkOut: string,
): Promise<Availability[]> {
  const client = getSupabase();
  if (!client) return [];

  const { data, error } = await client
    .from("availability")
    .select("*")
    .eq("room_id", roomId)
    .gte("date", checkIn)
    .lte("date", checkOut)
    .order("date", { ascending: true });

  if (error) {
    console.error("[checkAvailability] error:", JSON.stringify(error));
    return [];
  }

  return (data ?? []).map(mapAvailabilityRow);
}

export async function getAvailabilityForRoom(
  roomId: string,
  startDate: string,
  endDate: string,
): Promise<Availability[]> {
  return checkAvailability(roomId, startDate, endDate);
}

export async function setAvailabilityBlock(
  roomId: string,
  date: string,
  reason: "booked" | "blocked" | "maintenance",
): Promise<Availability | null> {
  const client = getSupabase();
  if (!client) return null;

  const { data, error } = await client
    .from("availability")
    .upsert(
      {
        room_id: roomId,
        date,
        is_available: false,
        reason,
      } as Record<string, unknown>,
      { onConflict: "room_id,date", ignoreDuplicates: false },
    )
    .select()
    .single();

  if (error) {
    console.error("[setAvailabilityBlock] error:", JSON.stringify(error));
    return null;
  }

  return data ? mapAvailabilityRow(data as AvailabilityRow) : null;
}

export async function clearAvailabilityBlock(
  roomId: string,
  date: string,
): Promise<boolean> {
  const client = getSupabase();
  if (!client) return false;

  const { error } = await client
    .from("availability")
    .delete()
    .eq("room_id", roomId)
    .eq("date", date);

  if (error) {
    console.error("[clearAvailabilityBlock] error:", JSON.stringify(error));
    return false;
  }

  return true;
}

export async function getAvailabilityRange(
  roomId: string,
  startDate: string,
  endDate: string,
): Promise<Availability[]> {
  return checkAvailability(roomId, startDate, endDate);
}

// ============================================
// Calendar sync (iCal)
// ============================================

export async function syncCalendar(roomId: string): Promise<void> {
  const client = getSupabase();
  if (!client) {
    console.error("[syncCalendar] No Supabase client");
    return;
  }

  // Fetch the iCal feed URL for this room
  const { data: feeds, error: feedError } = await client
    .from("calendar_feeds")
    .select("*")
    .eq("room_id", roomId);

  if (feedError) {
    console.error("[syncCalendar] Error fetching feeds:", JSON.stringify(feedError));
    return;
  }

  if (!feeds || feeds.length === 0) {
    console.log("[syncCalendar] No feeds configured for room:", roomId);
    return;
  }

  const feedUrl = process.env.ICAL_FEED_URL;

  if (!feedUrl) {
    console.error("[syncCalendar] Missing ICAL_FEED_URL env var");
    return;
  }

  for (const feed of feeds as CalendarFeedRow[]) {
    try {
      const response = await fetch(feedUrl);
      if (!response.ok) {
        console.error(`[syncCalendar] Failed to fetch iCal feed: ${response.status}`);
        continue;
      }

      const icalText = await response.text();

      const veventBlocks = icalText.match(/BEGIN:VEVENT[\s\S]*?END:VEVENT/g) ?? [];

      for (const block of veventBlocks) {
        const dtStartMatch = block.match(/DTSTART(?:;VALUE=DATE)?:(\d{4})(\d{2})(\d{2})/);
        const dtEndMatch = block.match(/DTEND(?:;VALUE=DATE)?:(\d{4})(\d{2})(\d{2})/);

        if (!dtStartMatch) continue;

        const startDate = `${dtStartMatch[1]}-${dtStartMatch[2]}-${dtStartMatch[3]}`;
        const endRaw = dtEndMatch
          ? `${dtEndMatch[1]}-${dtEndMatch[2]}-${dtEndMatch[3]}`
          : startDate;

        const current = new Date(startDate);
        const endDate = new Date(endRaw);

        while (current < endDate) {
          const dateStr = current.toISOString().split("T")[0]!;
          await setAvailabilityBlock(roomId, dateStr, "booked");
          current.setDate(current.getDate() + 1);
        }
      }

      await client
        .from("calendar_feeds")
        .update({ last_synced_at: new Date().toISOString() } as Record<string, unknown>)
        .eq("id", feed.id);

      console.log(`[syncCalendar] Synced feed ${feed.id} for room ${roomId}`);
    } catch (err) {
      console.error(`[syncCalendar] Error syncing feed ${feed.id}:`, err);
    }
  }
}

// ============================================
// Storage — room image uploads
// ============================================

export async function uploadRoomImages(
  roomId: string,
  _files: File[],
): Promise<string[]> {
  const client = getSupabase();
  if (!client) {
    console.error("[uploadRoomImages] No Supabase client");
    return [];
  }

  const urls: string[] = [];

  for (const file of _files) {
    const fileExt = file.name.split(".").pop();
    const fileName = `${roomId}/${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `room-images/${fileName}`;

    const { data, error } = await client.storage
      .from("room-images")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("[uploadRoomImages] Upload error:", JSON.stringify(error));
      continue;
    }

    const { data: urlData } = client.storage
      .from("room-images")
      .getPublicUrl(data.path);

    urls.push(urlData.publicUrl);
  }

  return urls;
}

// ============================================
// Auth — Supabase Auth integration
// ============================================

export async function getUser(): Promise<User | null> {
  const client = getSupabase();
  if (!client) return null;

  const { data: authData, error: authError } = await client.auth.getUser();
  if (authError || !authData?.user) {
    console.error("[getUser] Auth error:", JSON.stringify(authError));
    return null;
  }

  const { data: profile, error: profileError } = await client
    .from("profiles")
    .select("*")
    .eq("id", authData.user.id)
    .single();

  if (profileError || !profile) {
    return {
      id: authData.user.id,
      email: authData.user.email ?? "",
      fullName: authData.user.user_metadata?.full_name as string | undefined,
      phone: authData.user.phone ?? undefined,
      role: "guest",
      createdAt: authData.user.created_at ?? undefined,
    };
  }

  return mapProfileRow(profile as ProfileRow);
}

export async function login(
  email: string,
  password: string,
): Promise<User | null> {
  const client = getSupabase();
  if (!client) return null;

  const { data, error } = await client.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.user) {
    console.error("[login] Error:", JSON.stringify(error));
    return null;
  }

  const { data: profile } = await client
    .from("profiles")
    .select("*")
    .eq("id", data.user.id)
    .single();

  if (profile) {
    return mapProfileRow(profile as ProfileRow);
  }

  return {
    id: data.user.id,
    email: data.user.email ?? email,
    fullName: data.user.user_metadata?.full_name as string | undefined,
    phone: data.user.phone ?? undefined,
    role: "guest",
    createdAt: data.user.created_at ?? undefined,
  };
}

export async function logout(): Promise<void> {
  const client = getSupabase();
  if (!client) return;

  const { error } = await client.auth.signOut();
  if (error) {
    console.error("[logout] Error:", JSON.stringify(error));
  }
}

// ============================================
// Auth — admin authentication via service role
// ============================================

export async function getAdminUser(
  userId: string,
): Promise<User | null> {
  const client = getServiceSupabase();
  if (!client) return null;

  const { data: profile, error } = await client
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error || !profile) {
    console.error("[getAdminUser] Error:", JSON.stringify(error));
    return null;
  }

  const user = mapProfileRow(profile as ProfileRow);

  if (user.role !== "admin" && user.role !== "superadmin") {
    console.error("[getAdminUser] User is not an admin");
    return null;
  }

  return user;
}

// ============================================
// Payment records
// ============================================

export async function createPaymentRecord(
  input: Omit<PaymentRecord, "id" | "createdAt" | "updatedAt">,
): Promise<PaymentRecord | null> {
  const client = getSupabase();
  if (!client) return null;

  const row = {
    booking_id: input.bookingId,
    stripe_payment_intent_id: input.stripePaymentIntentId ?? null,
    stripe_customer_id: input.stripeCustomerId ?? null,
    amount: input.amount,
    currency: input.currency,
    status: input.status,
    receipt_url: input.receiptUrl ?? null,
  };

  const { data, error } = await client
    .from("payments")
    .insert(row as Record<string, unknown>)
    .select()
    .single();

  if (error) {
    console.error("[createPaymentRecord] Error:", JSON.stringify(error));
    return null;
  }

  return data ? mapPaymentRow(data as PaymentRow) : null;
}

export async function updatePaymentStatus(
  stripePaymentIntentId: string,
  status: PaymentStatus,
  receiptUrl?: string,
): Promise<PaymentRecord | null> {
  const client = getSupabase();
  if (!client) return null;

  const updates: Record<string, string | null> = { status };
  if (receiptUrl !== undefined) {
    updates.receipt_url = receiptUrl;
  }

  const { data, error } = await client
    .from("payments")
    .update(updates as Record<string, unknown>)
    .eq("stripe_payment_intent_id", stripePaymentIntentId)
    .select()
    .single();

  if (error) {
    console.error("[updatePaymentStatus] Error:", JSON.stringify(error));
    return null;
  }

  return data ? mapPaymentRow(data as PaymentRow) : null;
}

// ============================================
// Calendar feeds
// ============================================

export async function getCalendarFeeds(roomId: string): Promise<CalendarFeed[]> {
  const client = getSupabase();
  if (!client) return [];

  const { data, error } = await client
    .from("calendar_feeds")
    .select("*")
    .eq("room_id", roomId);

  if (error) {
    console.error("[getCalendarFeeds] Error:", JSON.stringify(error));
    return [];
  }

  return (data ?? []).map(mapCalendarFeedRow);
}

// ============================================
// Dashboard stats
// ============================================

export interface DashboardStats {
  totalRooms: number;
  activeRooms: number;
  totalBookings: number;
  pendingBookings: number;
  confirmedBookings: number;
  completedBookings: number;
  cancelledBookings: number;
  totalRevenue: number;
  recentBookings: Booking[];
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const client = getSupabase();
  if (!client) {
    return {
      totalRooms: 0,
      activeRooms: 0,
      totalBookings: 0,
      pendingBookings: 0,
      confirmedBookings: 0,
      completedBookings: 0,
      cancelledBookings: 0,
      totalRevenue: 0,
      recentBookings: [],
    };
  }

  const [roomsResult, bookingsResult] = await Promise.all([
    client.from("rooms").select("*"),
    client.from("bookings").select("*").order("created_at", { ascending: false }),
  ]);

  const rooms = (roomsResult.data ?? []) as RoomRow[];
  const bookings = (bookingsResult.data ?? []) as BookingRow[];

  const mappedBookings = bookings.map(mapBookingRow);

  const totalRevenue = mappedBookings
    .filter((b) => b.status === "confirmed" || b.status === "completed")
    .reduce((sum, b) => sum + b.totalPrice, 0);

  return {
    totalRooms: rooms.length,
    activeRooms: rooms.filter((r) => r.is_active).length,
    totalBookings: mappedBookings.length,
    pendingBookings: mappedBookings.filter((b) => b.status === "pending").length,
    confirmedBookings: mappedBookings.filter((b) => b.status === "confirmed").length,
    completedBookings: mappedBookings.filter((b) => b.status === "completed").length,
    cancelledBookings: mappedBookings.filter((b) => b.status === "cancelled").length,
    totalRevenue,
    recentBookings: mappedBookings.slice(0, 10),
  };
}