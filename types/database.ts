// ============================================
// fragoulishome.gr — Database Schema Placeholders
// TypeScript interfaces only. No SQL.
// ============================================

// --- Room ---
// TODO: Map to Supabase `rooms` table.
export interface Room {
  id: string;
  slug: string;
  title: string;
  description: string;
  shortDescription?: string;

  // LLM-friendly description placeholder
  llmDescription?: string;

  pricePerNight: number;
  currency: string; // e.g. "EUR"

  capacity: number; // max guests
  bedType?: "single" | "double" | "queen" | "king" | "sofa";
  sizeSqm?: number;

  amenities: string[];

  images: RoomImage[];
  coverImageUrl?: string; // TODO: add alt-text field per image

  address: RoomAddress;
  locationSummary?: string; // LLM-friendly location context

  isActive: boolean;
  createdAt?: string; // ISO date
  updatedAt?: string; // ISO date
}

export interface RoomImage {
  id: string;
  url: string;
  altText: string; // SEO alt-text field
  isCover?: boolean;
  width?: number;
  height?: number;
}

export interface RoomAddress {
  street?: string;
  city: string;
  postalCode?: string;
  country: string; // "Greece"
  latitude?: number;
  longitude?: number;
  metroStation?: string; // proximity context
}

// --- Booking ---
// TODO: Map to Supabase `bookings` table.
export interface Booking {
  id: string;
  roomId: string;
  guestId?: string; // references User
  guestName: string;
  guestEmail: string;
  guestPhone?: string;

  checkIn: string; // ISO date (start)
  checkOut: string; // ISO date (end)
  numberOfGuests: number;

  totalPrice: number;
  currency: string;

  status: BookingStatus;
  paymentStatus?: PaymentStatus;
  paymentRecordId?: string;

  specialRequests?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "cancelled"
  | "completed"
  | "rejected";

export type PaymentStatus =
  | "unpaid"
  | "requires_payment_method"
  | "succeeded"
  | "failed"
  | "refunded";

// --- Availability ---
// TODO: Map to Supabase `availability` table or derived from bookings.
export interface Availability {
  id: string;
  roomId: string;
  date: string; // YYYY-MM-DD
  isAvailable: boolean;
  reason?: "booked" | "blocked" | "maintenance";
  priceOverride?: number;
}

// --- User ---
// TODO: Map to Supabase Auth user + public profile table.
export interface User {
  id: string;
  email: string;
  fullName?: string;
  phone?: string;
  role: UserRole;
  createdAt?: string;
}

export type UserRole = "guest" | "admin" | "superadmin";

// --- Payment Record ---
// TODO: Map to Supabase `payments` table + Stripe objects.
export interface PaymentRecord {
  id: string;
  bookingId: string;
  stripePaymentIntentId?: string;
  stripeCustomerId?: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  receiptUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

// --- Calendar Sync (iCal) ---
// TODO: Map to external iCal feed metadata.
export interface CalendarFeed {
  id: string;
  roomId: string;
  url: string; // iCal feed URL
  lastSyncedAt?: string;
  externalId?: string; // external event UID
}