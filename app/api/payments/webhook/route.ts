// ============================================
// fragoulishome.gr — POST /api/payments/webhook
// Empty handler placeholder.
// ============================================

import { NextResponse } from "next/server";

export async function POST(_request: Request) {
  // TODO: Read raw body + Stripe-Signature header.
  // TODO: Verify signature via security.verifyStripeSignature().
  // TODO: Handle payment_intent.succeeded / payment_intent.failed.
  // TODO: Update booking paymentStatus accordingly.
  return NextResponse.json(
    { error: "Not implemented" },
    { status: 501 },
  );
}