// ============================================
// fragoulishome.gr — POST /api/payments/intent
// Empty handler placeholder.
// ============================================

import { NextResponse } from "next/server";

export async function POST(_request: Request) {
  // TODO: Parse bookingId + amount from body.
  // TODO: Call stripe.createPaymentIntent().
  // TODO: Return client secret to client.
  return NextResponse.json(
    { error: "Not implemented" },
    { status: 501 },
  );
}