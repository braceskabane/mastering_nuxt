import Stripe from "stripe";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  // Get config
  const config = useRuntimeConfig();
  if (!config.stripeSecret) {
    throw createError({
      statusCode: 500,
      statusMessage: "Stripe secret not configured",
    });
  }

  // Initialize Stripe with proper typing
  const stripe = new Stripe(config.stripeSecret as string);

  try {
    // Get email and courseId from body
    const body = await readBody(event);
    const { email, courseId } = body;

    if (!email) {
      throw createError({
        statusCode: 400,
        statusMessage: "Email is required",
      });
    }

    // Default to first course if not specified
    const finalCourseId = courseId || 1;

    // Create Stripe PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 9700, // $97.00 in cents
      currency: "usd",
      metadata: {
        email,
        courseId: String(finalCourseId),
      },
    });

    // Create CoursePurchase record in Supabase via Prisma
    const purchase = await prisma.coursePurchase.create({
      data: {
        courseId: finalCourseId,
        userEmail: email,
        paymentId: paymentIntent.id!,
        verified: false,
      },
    });

    // Return client secret
    return {
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    };
  } catch (error) {
    console.error("Payment intent error:", error);
    throw createError({
      statusCode: 500,
      statusMessage:
        error instanceof Error
          ? error.message
          : "Failed to create payment intent",
    });
  }
});
