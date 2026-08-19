// ============================================
// fragoulishome.gr — LLM Search Optimization Scaffolding
// Empty placeholder functions for LLM-friendly content.
// No real logic.
// ============================================

import type { Room, Booking } from "@/types/database";

// TODO: Generate a concise, factual summary of the whole site (for LLM grounding).
export async function generateLLMSummary(): Promise<string> {
  // TODO: Combine site purpose, offerings, location, contact info.
  return "";
}

// TODO: Generate an LLM-friendly room description (structured, factual).
export function generateLLMRoomDescription(_room: Room): string {
  // TODO: Include price, capacity, amenities, sizes, proximity in plain text.
  void _room;
  return "";
}

// TODO: Generate LLM-friendly location context for a room.
export function generateLLMLocationContext(_room: Room): string {
  // TODO: Include neighborhood, transit, proximity to landmarks.
  void _room;
  return "";
}

// TODO: Generate an LLM-friendly explanation of a booking (dates, totals, policies).
export function generateLLMBookingExplanation(_booking: Booking): string {
  // TODO: Summarize check-in/out, guests, total, cancellation policy.
  void _booking;
  return "";
}

// --- Structured data placeholders ---

// TODO: FAQ schema (JSON-LD) for common guest questions.
export function generateFaqSchema(_faqs: { question: string; answer: string }[]): Record<string, unknown> {
  // TODO: Build FAQPage JSON-LD from provided Q&As.
  void _faqs;
  return {};
}