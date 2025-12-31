import Stripe from "stripe";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  if (!config.stripeSecret || !config.stripeWebhookSecret) {
    throw createError({
      statusCode: 500,
      statusMessage: "Stripe configuration incomplete",
    });
  }

  // Get raw body for signature verification
  const body = await readRawBody(event);
  const signature = getHeader(event, "stripe-signature");

  if (!body || !signature) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing webhook body or signature",
    });
  }

  // Initialize Stripe
  const stripe = new Stripe(config.stripeSecret as string);

  let stripeEvent: Stripe.Event;

  try {
    // Verify webhook signature
    stripeEvent = stripe.webhooks.constructEvent(
      body,
      signature,
      config.stripeWebhookSecret as string
    );
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    throw createError({
      statusCode: 400,
      statusMessage: "Webhook signature verification failed",
    });
  }

  try {
    // Handle payment_intent.succeeded event
    if (stripeEvent.type === "payment_intent.succeeded") {
      const paymentIntent = stripeEvent.data.object as Stripe.PaymentIntent;

      // Update CoursePurchase record to verified
      await prisma.coursePurchase.updateMany({
        where: { paymentId: paymentIntent.id },
        data: { verified: true },
      });

      console.log(
        `✅ Payment verified for ${paymentIntent.id}: ${paymentIntent.metadata?.email}`
      );
    }

    // Handle payment_intent.payment_failed event
    if (stripeEvent.type === "payment_intent.payment_failed") {
      const paymentIntent = stripeEvent.data.object as Stripe.PaymentIntent;
      console.log(
        `❌ Payment failed for ${paymentIntent.id}: ${paymentIntent.metadata?.email}`
      );
    }

    return { received: true };
  } catch (error) {
    console.error("Webhook processing error:", error);
    throw createError({
      statusCode: 500,
      statusMessage:
        error instanceof Error ? error.message : "Webhook processing failed",
    });
  }
});
