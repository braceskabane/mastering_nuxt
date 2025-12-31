import Stripe from "stripe";

const config = useRuntimeConfig();

if (!config.stripeSecret) {
  throw new Error("STRIPE_SECRET_KEY is not configured");
}

const stripe = new Stripe(config.stripeSecret as string);

export default stripe;
