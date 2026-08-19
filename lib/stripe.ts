// ============================================
// fragoulishome.gr — Stripe Integration
// Client initialization + payment intent creation.
// ============================================

import Stripe from "stripe";

// --- Stripe client initialization ---
const stripeSecretKey = process.env.STRIPE_SECRET_KEY ?? "";

export const stripe: Stripe | null = stripeSecretKey
  ? new Stripe(stripeSecretKey, {
      apiVersion: "2025-02-24.acacia",
    })
  : null;

// --- Create a Stripe PaymentIntent for a booking ---
export async function createPaymentIntent(
  amount: number,
  currency: string,
  bookingId: string,
): Promise<Stripe.PaymentIntent | null> {
  if (!stripe) {
    console.error("[stripe] Stripe client not initialized — missing STRIPE_SECRET_KEY");
    return null;
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: currency.toLowerCase(),
      metadata: {
        bookingId,
        source: "fragoulishome.gr",
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return paymentIntent;
  } catch (error) {
    console.error("[stripe] createPaymentIntent error:", error);
    return null;
  }
}

// --- Verify + handle incoming Stripe webhook events ---
export async function handleWebhook(
  payload: string | Buffer,
  signature: string,
): Promise<Stripe.Event | null> {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripe || !webhookSecret) {
    console.error("[stripe] Webhook handling not configured");
    return null;
  }

  try {
    const event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
    return event;
  } catch (error) {
    console.error("[stripe] Webhook signature verification failed:", error);
    return null;
  }
}