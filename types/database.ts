// ============================================
// fragoulishome.gr — Database Schema Types
// Auto-generated from Supabase project + manual camelCase models.
// ============================================

// ============================================
// Auto-generated raw row types (snake_case)
// Derived from Supabase project heoqwpbkdarhctxugzuk
// ============================================

export interface RoomRow {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  short_description: string | null;
  llm_description: string | null;
  price_per_night: number;
  currency: string | null;
  capacity: number;
  bed_type: string | null;
  size_sqm: number | null;
  amenities: string[] | null;
  images: unknown | null;
  cover_image_url: string | null;
  address: unknown | null;
  location_summary: string | null;
  is_active: boolean | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface BookingRow {
  id: string;
  room_id: string;
  guest_id: string | null;
  guest_name: string;
  guest_email: string;
  guest_phone: string | null;
  check_in: string;
  check_out: string;
  number_of_guests: number;
  total_price: number;
  currency: string | null;
  status: string | null;
  payment_status: string | null;
  payment_record_id: string | null;
  special_requests: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface AvailabilityRow {
  id: string;
  room_id: string;
  date: string;
  is_available: boolean | null;
  reason: string | null;
  price_override: number | null;
}

export interface PaymentRow {
  id: string;
  booking_id: string;
  stripe_payment_intent_id: string | null;
  stripe_customer_id: string | null;
  amount: number;
  currency: string | null;
  status: string | null;
  receipt_url: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface ProfileRow {
  id: string;
  email: string | null;
  full_name: string | null;
  phone: string | null;
  role: string | null;
  created_at: string | null;
}

export interface CalendarFeedRow {
  id: string;
  room_id: string;
  url: string;
  last_synced_at: string | null;
  external_id: string | null;
}

// ============================================
// Application model types (camelCase)
// ============================================

export interface Room {
  id: string;
  slug: string;
  title: string;
  description: string;
  shortDescription?: string;
  llmDescription?: string;
  pricePerNight: number;
  currency: string;
  capacity: number;
  bedType?: "single" | "double" | "queen" | "king" | "sofa";
  sizeSqm?: number;
  amenities: string[];
  images: RoomImage[];
  coverImageUrl?: string;
  address: RoomAddress;
  locationSummary?: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface RoomImage {
  id: string;
  url: string;
  altText: string;
  isCover?: boolean;
  width?: number;
  height?: number;
}

export interface RoomAddress {
  street?: string;
  city: string;
  postalCode?: string;
  country: string;
  latitude?: number;
  longitude?: number;
  metroStation?: string;
}

export interface Booking {
  id: string;
  roomId: string;
  guestId?: string;
  guestName: string;
  guestEmail: string;
  guestPhone?: string;
  checkIn: string;
  checkOut: string;
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

export interface Availability {
  id: string;
  roomId: string;
  date: string;
  isAvailable: boolean;
  reason?: "booked" | "blocked" | "maintenance";
  priceOverride?: number;
}

export interface User {
  id: string;
  email: string;
  fullName?: string;
  phone?: string;
  role: UserRole;
  createdAt?: string;
}

export type UserRole = "guest" | "admin" | "superadmin";

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

export interface CalendarFeed {
  id: string;
  roomId: string;
  url: string;
  lastSyncedAt?: string;
  externalId?: string;
}

// ============================================
// Database type for typed Supabase client
// Simple flat object types to avoid Supabase type inference issues.
// ============================================

export interface Database {
  public: {
    Tables: {
      rooms: {
        Row: RoomRow;
        Insert: Record<string, unknown>;
        Update: Record<string, unknown>;
      };
      bookings: {
        Row: BookingRow;
        Insert: Record<string, unknown>;
        Update: Record<string, unknown>;
      };
      availability: {
        Row: AvailabilityRow;
        Insert: Record<string, unknown>;
        Update: Record<string, unknown>;
      };
      payments: {
        Row: PaymentRow;
        Insert: Record<string, unknown>;
        Update: Record<string, unknown>;
      };
      profiles: {
        Row: ProfileRow;
        Insert: Record<string, unknown>;
        Update: Record<string, unknown>;
      };
      calendar_feeds: {
        Row: CalendarFeedRow;
        Insert: Record<string, unknown>;
        Update: Record<string, unknown>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}