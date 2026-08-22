// ============================================
// fragoulishome.gr — LLM Search Optimization
// Generates factual, structured, machine-readable content
// for AI crawlers, LLM agents, and search engine bots.
// All descriptions are grounded in actual room data.
// ============================================

import type { Room, Booking } from "@/types/database";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fragoulishome.gr";

// ============================================
// Site summary — for LLM grounding (robots.txt /.well-known)
// ============================================

export async function generateLLMSummary(): Promise<string> {
  const siteName = "Fragoulishome";
  const location = "Petras, Sitia, Crete, Greece";
  const propertyType = "Two self-catered maisonettes (apartment-style units)";
  const setting = "Private 4,000 m² grove of olive, pine, and palm trees";
  const proximity = "Less than 100 metres from the beach, 1.5 km from Sitia town centre";
  const booking = "Direct booking via website, email (fragoulishome@gmail.com), or phone (+30 697 198 8575)";
  const amenities = "Fully equipped kitchen, private entrance, free parking, Wi-Fi, air conditioning, outdoor space";
  const pricing = "Rates vary by season and room. Contact for current rates and availability.";

  return [
    { label: "Name", value: siteName },
    { label: "Type", value: propertyType },
    { label: "Location", value: location },
    { label: "Setting", value: setting },
    { label: "Proximity", value: proximity },
    { label: "Amenities", value: amenities },
    { label: "Pricing", value: pricing },
    { label: "Booking", value: booking },
    { label: "Website", value: SITE_URL },
  ]
    .map((item) => `${item.label}: ${item.value}`)
    .join("\n");
}

// ============================================
// Room description — structured, factual, no fluff
// ============================================

export function generateLLMRoomDescription(room: Room): string {
  const parts: string[] = [];

  // Core identity
  parts.push(`Room: ${room.title}`);
  parts.push(`Type: Self-contained maisonette`);

  // Size
  if (room.sizeSqm) {
    parts.push(`Size: ${room.sizeSqm} m²`);
  }

  // Beds
  if (room.bedType) {
    const bedLabel: Record<string, string> = {
      single: "Single bed",
      double: "Double bed",
      queen: "Queen-size bed",
      king: "King-size bed",
      sofa: "Sofa bed",
    };
    parts.push(`Bed: ${bedLabel[room.bedType] ?? room.bedType}`);
  }

  // Capacity
  parts.push(`Maximum guests: ${room.capacity}`);

  // Pricing
  parts.push(`Price: €${room.pricePerNight} per night (${room.currency ?? "EUR"})`);

  // Description
  const descText = room.shortDescription ?? room.description?.slice(0, 300) ?? "";
  if (descText) {
    parts.push(`Description: ${descText}`);
  }

  // Amenities
  if (room.amenities && room.amenities.length > 0) {
    parts.push(`Amenities: ${room.amenities.join(", ")}`);
  }

  // Location
  if (room.address) {
    const addrParts: string[] = [];
    if (room.address.street) addrParts.push(room.address.street);
    if (room.address.city) addrParts.push(room.address.city);
    if (room.address.country) addrParts.push(room.address.country);
    if (addrParts.length > 0) {
      parts.push(`Address: ${addrParts.join(", ")}`);
    }
    if (room.locationSummary) {
      parts.push(`Location notes: ${room.locationSummary}`);
    }
  }

  // Status
  parts.push(room.isActive ? "Status: Available for booking" : "Status: Currently not available");

  return parts.join("\n");
}

// ============================================
// Location context — neighbourhood, transit, landmarks
// ============================================

export function generateLLMLocationContext(room: Room): string {
  const area = "Petras, Sitia";
  const town = "Sitia (population ~10,000)";
  const region = "Eastern Crete, Greece";

  const baseParts: string[] = [
    `Location: ${area}, ${region}`,
    `Nearest settlement: ${town}`,
    `Beach distance: Less than 100 m walking`,
    `Town centre: 1.5 km (approximately 10–15 minutes on foot)`,
    `Airport: Sitia Public Airport (JSH) — ~3 km, 10 minutes by car`,
    `Port: Sitia port — ~2 km, links to Athens (Piraeus) and other islands`,
    `Region: Eastern Crete — known for the palm forest of Vai, Zakros Gorge, Richtis Gorge, and Minoan archaeological sites`,
  ];

  // Add room-specific location from database
  if (room.address?.metroStation) {
    baseParts.push(`Nearest public transport: ${room.address.metroStation}`);
  }

  if (room.locationSummary) {
    baseParts.push(`Specifics: ${room.locationSummary}`);
  }

  // Nearby attractions (static, relevant to the area)
  baseParts.push("Nearby attractions:");
  baseParts.push("- Vai Palm Beach (famous palm forest) — ~25 km east");
  baseParts.push("- Zakros Gorge (Valley of the Dead) — ~35 km east");
  baseParts.push("- Richtis Gorge and waterfall — ~20 km west");
  baseParts.push("- Toplou Monastery — ~12 km east");
  baseParts.push("- Minoan palace of Zakros — ~38 km east");
  baseParts.push("- Sitia Archaeological Museum — in town centre");

  return baseParts.join("\n");
}

// ============================================
// Booking explanation — dates, totals, policies
// ============================================

export function generateLLMBookingExplanation(booking: Booking): string {
  const parts: string[] = [];

  parts.push(`Booking ID: ${booking.id}`);
  parts.push(`Room: ${booking.roomId}`);

  if (booking.guestName) {
    parts.push(`Guest name: ${booking.guestName}`);
  }

  parts.push(`Check-in: ${booking.checkIn}`);
  parts.push(`Check-out: ${booking.checkOut}`);

  // Calculate nights
  const checkInDate = new Date(booking.checkIn);
  const checkOutDate = new Date(booking.checkOut);
  const nights = Math.round((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
  parts.push(`Nights: ${nights}`);
  parts.push(`Number of guests: ${booking.numberOfGuests}`);

  if (booking.totalPrice > 0) {
    parts.push(`Total price: €${booking.totalPrice} ${booking.currency ?? "EUR"}`);
  }

  parts.push(`Status: ${booking.status}`);
  if (booking.paymentStatus) {
    parts.push(`Payment status: ${booking.paymentStatus}`);
  }

  // Policies (static for now — can be made dynamic later)
  parts.push("Cancellation policy: Contact host for details");
  parts.push("Booking method: Direct booking through website or contact");

  return parts.join("\n");
}

// ============================================
// FAQ schema — common guest questions
// ============================================

const COMMON_FAQS: { question: string; answer: string }[] = [
  {
    question: "How do I book a room at Fragoulishome?",
    answer:
      "You can book directly through our website, send an email to fragoulishome@gmail.com, or call us at +30 697 198 8575. We handle all reservations personally.",
  },
  {
    question: "What is the check-in and check-out time?",
    answer:
      "Check-in is typically from 14:00 and check-out by 11:00. Early check-in or late check-out may be available on request.",
  },
  {
    question: "Is there free parking?",
    answer:
      "Yes, free on-site parking is available for all guests.",
  },
  {
    question: "Is Wi-Fi included?",
    answer:
      "Yes, free Wi-Fi is available in both maisonettes.",
  },
  {
    question: "Do the rooms have air conditioning?",
    answer:
      "Yes, both maisonettes are equipped with air conditioning for your comfort.",
  },
  {
    question: "Is the property suitable for children?",
    answer:
      "Yes, the property has outdoor space and is suitable for families. Please let us know the number and ages of children when booking.",
  },
  {
    question: "What is the cancellation policy?",
    answer:
      "Cancellation terms are agreed at the time of booking. Please contact us directly for specific details regarding your reservation.",
  },
  {
    question: "How far is the beach?",
    answer:
      "The nearest beach is less than 100 metres from the property, an easy walk.",
  },
  {
    question: "How far is Sitia town centre?",
    answer:
      "Sitia town centre is about 1.5 km away — a 10 to 15 minute walk.",
  },
  {
    question: "Do you accept pets?",
    answer:
      "Please contact us in advance to discuss pet arrangements. Each request is considered individually.",
  },
];

export function generateFaqSchema(faqs?: { question: string; answer: string }[]): Record<string, unknown> {
  const questions = faqs && faqs.length > 0 ? faqs : COMMON_FAQS;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };
}

// Export common FAQs for embedding on pages
export function getCommonFaqs(): { question: string; answer: string }[] {
  return COMMON_FAQS;
}