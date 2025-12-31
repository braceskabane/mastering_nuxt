<template>
  <Modal @close="$emit('close')">
    <div
      class="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl w-full max-w-2xl border border-slate-700"
    >
      <!-- Success State -->
      <div
        v-if="success"
        class="flex flex-col items-center justify-center space-y-6"
      >
        <div class="text-6xl animate-bounce">🎉</div>
        <h2 class="font-bold text-3xl text-center text-white">
          Welcome Aboard!
        </h2>
        <p class="text-slate-300 text-center max-w-md leading-relaxed">
          Your payment has been successfully processed. You're now ready to
          start your learning journey. Click below to access your course.
        </p>
        <button
          class="w-full text-lg text-white h-12 px-16 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:shadow-lg hover:shadow-blue-500/50 cursor-pointer font-semibold transition-all duration-300 transform hover:scale-105"
          @click="navigateToLogin"
        >
          Login with GitHub to Access Course
        </button>
      </div>

      <!-- Payment Form -->
      <form v-else @submit.prevent="handleSubmit" class="space-y-6">
        <div class="space-y-2 mb-8">
          <h2 class="font-bold text-3xl text-white text-center">
            Enroll in {{ course?.title || "Course" }}
          </h2>
          <p class="text-center text-slate-400">
            Secure payment powered by Stripe
          </p>
        </div>

        <!-- Email Input -->
        <div class="space-y-2">
          <label class="block font-semibold text-slate-300"
            >Email Address</label
          >
          <input
            v-model="email"
            type="email"
            autocomplete="email"
            placeholder="your@email.com"
            required
            class="w-full px-4 py-3 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-700 text-white placeholder-slate-500 transition-colors"
          />
        </div>

        <!-- Stripe Card Element -->
        <div class="space-y-2">
          <label class="block font-semibold text-slate-300">Card Details</label>
          <div
            id="card-element"
            class="p-4 border border-slate-600 rounded-lg bg-slate-700 focus:ring-2 focus:ring-blue-500"
          ></div>
        </div>

        <!-- Error Message -->
        <div
          v-if="error"
          class="p-4 rounded-lg bg-red-900/30 border border-red-600 text-red-200"
        >
          <p class="text-sm font-semibold">{{ error }}</p>
        </div>

        <!-- Loading and Submit Button -->
        <div class="flex gap-4">
          <button
            type="button"
            class="flex-1 h-12 px-6 text-slate-300 rounded-lg bg-slate-700 hover:bg-slate-600 font-semibold transition-colors border border-slate-600 disabled:opacity-50"
            @click="$emit('close')"
            :disabled="processingPayment"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="flex-1 h-12 px-6 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="processingPayment"
          >
            <span v-if="!processingPayment">Pay Now</span>
            <span v-else>Processing...</span>
          </button>
        </div>

        <!-- Secure Payment Badge -->
        <div
          class="flex items-center justify-center gap-2 text-xs text-slate-400 pt-4 border-t border-slate-700"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clip-rule="evenodd"
            />
          </svg>
          Your payment information is secure and encrypted
        </div>
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

// Stripe styling for dark theme
const formStyle = {
  base: {
    fontSize: "16px",
    color: "#f1f5f9",
    fontFamily: "system-ui, -apple-system, sans-serif",
    backgroundColor: "#0f172a",
    "::placeholder": {
      color: "#64748b",
    },
  },
  invalid: {
    color: "#fca5a5",
    iconColor: "#fca5a5",
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
    const response = await $fetch<{
      clientSecret: string;
      paymentIntentId: string;
    }>("/api/stripe/paymentIntent", {
      method: "POST",
      body: { email: email.value },
    });

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
