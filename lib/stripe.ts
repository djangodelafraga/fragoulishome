// ============================================
// fragoulishome.gr — Stripe Scaffolding
// Client initialization + empty placeholder functions.
// No real logic.
// ============================================

import Stripe from "stripe";

// --- Stripe client initialization ---
const stripeSecretKey = process.env.STRIPE_SECRET_KEY ?? "";

// Guarded initialization: the client is only created when the secret key is
// present so the skeleton compiles before credentials are configured.
// TODO: Initialize Stripe with API version + app info once key is available.
export const stripe: Stripe | null = stripeSecretKey
  ? new Stripe(stripeSecretKey, {
      // TODO: Pin to the desired Stripe API version for backward compatibility.
      apiVersion: "2025-02-24.acacia",
      // TODO: appInfo: { name: "fragoulishome" }
    })
  : null;

// --- Payment placeholders ---

// TODO: Create a Stripe PaymentIntent for a booking.
export async function createPaymentIntent(
  _amount: number,
  _currency: string,
  _bookingId: string,
): Promise<Stripe.PaymentIntent | null> {
  // TODO: stripe.paymentIntents.create({ amount, currency, metadata: { bookingId } });
  return null;
}

// TODO: Verify + handle incoming Stripe webhook events.
export async function handleWebhook(
  _payload: string | Buffer,
  _signature: string,
): Promise<void> {
  // TODO: stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  // TODO: Switch on event type (payment_intent.succeeded, payment_intent.failed, etc.)
}