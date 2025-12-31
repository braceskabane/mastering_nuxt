<template>
  <Modal @close="$emit('close')">
    <div class="bg-white p-8 rounded-xl w-full max-w-2xl">
      <!-- Success State -->
      <div
        v-if="success"
        class="flex flex-col items-center justify-center space-y-6"
      >
        <div class="text-6xl">🎉</div>
        <h2 class="font-bold text-2xl text-center">
          Thank you for your purchase!
        </h2>
        <p class="text-gray-600 text-center">
          Your payment has been processed. Click below to login and start learning.
        </p>
        <button
          class="w-full text-lg text-white h-12 px-16 rounded-lg bg-blue-600 hover:bg-blue-700 cursor-pointer font-semibold transition-colors"
          @click="navigateToLogin"
        >
          Login with GitHub to Access Course
        </button>
      </div>

      <!-- Payment Form -->
      <form v-else @submit.prevent="handleSubmit" class="space-y-6">
        <h2 class="font-bold text-2xl text-center">
          Enroll in {{ course?.title || "Course" }}
        </h2>

        <!-- Email Input -->
        <div class="space-y-2">
          <label class="block font-semibold text-gray-700">Email Address</label>
          <input
            v-model="email"
            type="email"
            autocomplete="email"
            placeholder="your@email.com"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- Stripe Card Element -->
        <div class="space-y-2">
          <label class="block font-semibold text-gray-700">Card Details</label>
          <div
            id="card-element"
            class="p-4 border border-gray-300 rounded-lg bg-white"
          ></div>
        </div>

        <!-- Error Message -->
        <div v-if="error" class="p-4 bg-red-50 border border-red-300 rounded-lg">
          <p class="text-red-800 text-sm">{{ error }}</p>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="processingPayment || !email"
          class="w-full text-lg text-white font-semibold h-12 rounded-lg transition-all"
          :class="
            processingPayment || !email
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-yellow-400 hover:bg-yellow-500 cursor-pointer'
          "
        >
          <div v-if="processingPayment" class="flex items-center justify-center space-x-2">
            <Loading class="h-5 w-5" />
            <span>Processing...</span>
          </div>
          <div v-else>Pay $97</div>
        </button>

        <!-- Security Notice -->
        <p class="text-xs text-gray-500 text-center">
          Your payment information is secure and encrypted
        </p>
      </form>
    </div>
  </Modal>
</template>

<script setup lang="ts">
// Emit close event
const emit = defineEmits(["close"]);

// Get course data
let course = null;
try {
  course = await useCourse();
} catch (error) {
  console.error("Error loading course:", error);
}

// Get config
const config = useRuntimeConfig();

// State
const stripe = ref<any>(null);
const elements = ref<any>(null);
const card = ref<any>(null);
const email = ref("");
const processingPayment = ref(false);
const success = ref(false);
const error = ref("");
const paymentIntentId = ref("");

// Stripe styling
const formStyle = {
  base: {
    fontSize: "16px",
    color: "#32325d",
    fontFamily: "system-ui, -apple-system, sans-serif",
    "::placeholder": {
      color: "#aab7c4",
    },
  },
  invalid: {
    color: "#fa755a",
    iconColor: "#fa755a",
  },
};

/**
 * Initialize Stripe Elements
 */
const initializeStripe = () => {
  if (!config.public.stripeKey) {
    error.value = "Stripe key not configured";
    return;
  }

  stripe.value = (window as any).Stripe(config.public.stripeKey);
  elements.value = stripe.value.elements();

  // Create card element
  card.value = elements.value.create("card", { style: formStyle });
  card.value.mount("#card-element");

  // Handle card errors
  card.value.on("change", (event: any) => {
    if (event.error) {
      error.value = event.error.message;
    } else {
      error.value = "";
    }
  });
};

/**
 * Handle form submission
 */
const handleSubmit = async () => {
  if (!email.value) {
    error.value = "Please enter your email";
    return;
  }

  processingPayment.value = true;
  error.value = "";

  try {
    // Step 1: Create payment intent on server
    const response = await $fetch<{ clientSecret: string; paymentIntentId: string }>(
      "/api/stripe/paymentIntent",
      {
        method: "POST",
        body: { email: email.value },
      }
    );

    const { clientSecret } = response;

    // Step 2: Confirm card payment with Stripe
    const { paymentIntent, error: stripeError } =
      await stripe.value.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card.value,
          billing_details: { email: email.value },
        },
      });

    if (stripeError) {
      error.value = stripeError.message;
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      success.value = true;
      paymentIntentId.value = paymentIntent.id;
    } else {
      error.value = "Payment failed. Please try again.";
    }
  } catch (err: any) {
    error.value = err.message || "An error occurred. Please try again.";
    console.error("Payment error:", err);
  } finally {
    processingPayment.value = false;
  }
};

/**
 * Navigate to login with redirect
 */
const navigateToLogin = () => {
  const redirectTo = `/linkWithPurchase/${paymentIntentId.value}`;
  navigateTo(`/login?redirectTo=${redirectTo}`);
};

/**
 * Setup script on mount
 */
useHead({
  script: [
    {
      src: "https://js.stripe.com/v3/",
      async: true,
      onload: initializeStripe,
    },
  ],
});

// Cleanup on unmount
onBeforeUnmount(() => {
  if (card.value) {
    card.value.destroy();
  }
});
</script>
