<template>
  <div class="min-h-screen bg-white flex items-center justify-center p-4">
    <!-- Card Container -->
    <div class="w-full max-w-md">
      <!-- Loading State -->
      <div v-if="loading" class="space-y-6">
        <div
          class="bg-white rounded-2xl border-2 border-blue-600 p-8 shadow-lg"
        >
          <!-- Animated Loading Icon -->
          <div class="flex justify-center mb-8">
            <div class="relative w-16 h-16">
              <div
                class="absolute inset-0 rounded-full border-4 border-blue-200"
              ></div>
              <div
                class="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600 animate-spin"
              ></div>
            </div>
          </div>

          <!-- Loading Text -->
          <div class="space-y-3 text-center">
            <h1 class="text-2xl font-bold text-black">Linking Your Purchase</h1>
            <p class="text-black text-sm leading-relaxed">
              We're verifying your payment and linking it to your account. This
              usually takes just a moment.
            </p>
          </div>

          <!-- Progress Bar -->
          <div class="mt-8 w-full bg-blue-100 rounded-full h-2 overflow-hidden">
            <div
              class="h-full bg-blue-600 rounded-full animate-pulse"
              style="width: 60%"
            ></div>
          </div>
        </div>
      </div>

      <!-- Success State -->
      <div v-else-if="success" class="space-y-6">
        <!-- Success Card -->
        <div
          class="bg-white rounded-2xl border-2 border-blue-600 p-8 shadow-lg"
        >
          <!-- Success Icon -->
          <div class="flex justify-center mb-8">
            <div
              class="relative w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center border-2 border-blue-600"
            >
              <svg
                class="w-10 h-10 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>

          <!-- Success Content -->
          <div class="space-y-4 text-center mb-8">
            <h1 class="text-2xl font-bold text-black">Purchase Verified!</h1>
            <p class="text-black text-sm leading-relaxed">
              Your payment has been successfully verified and linked to your
              account. You now have full access to the course.
            </p>
          </div>

          <!-- CTA Button -->
          <button
            @click="navigateToCourse"
            class="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md"
          >
            Access Your Course
          </button>

          <!-- Divider -->
          <div class="relative my-6">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t-2 border-blue-200"></div>
            </div>
            <div class="relative flex justify-center text-xs">
              <span class="px-2 bg-white text-black font-semibold"
                >What's next?</span
              >
            </div>
          </div>

          <!-- Info Cards -->
          <div class="grid grid-cols-2 gap-3 text-xs">
            <div class="bg-blue-50 rounded-lg p-3 border-2 border-blue-200">
              <div class="text-blue-600 font-bold mb-1">📚</div>
              <div class="text-black font-semibold">Start Learning</div>
            </div>
            <div class="bg-blue-50 rounded-lg p-3 border-2 border-blue-200">
              <div class="text-blue-600 font-bold mb-1">🏆</div>
              <div class="text-black font-semibold">Track Progress</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else class="space-y-6">
        <!-- Error Card -->
        <div
          class="bg-white rounded-2xl border-2 border-blue-600 p-8 shadow-lg"
        >
          <!-- Error Icon -->
          <div class="flex justify-center mb-8">
            <div
              class="relative w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center border-2 border-blue-600"
            >
              <svg
                class="w-10 h-10 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>

          <!-- Error Content -->
          <div class="space-y-4 text-center mb-8">
            <h1 class="text-2xl font-bold text-black">Verification Failed</h1>
            <p class="text-black text-sm leading-relaxed">
              {{
                error ||
                "We couldn't link your purchase at this moment. Please try again or contact support if the problem persists."
              }}
            </p>
          </div>

          <!-- Action Buttons -->
          <div class="space-y-3">
            <button
              @click="retryLinking"
              class="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Try Again
            </button>
            <button
              @click="navigateToHome"
              class="w-full px-6 py-3 bg-white hover:bg-blue-50 text-black font-semibold rounded-lg transition-all duration-300 border-2 border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Back to Home
            </button>
          </div>

          <!-- Support Link -->
          <div
            class="mt-6 text-center text-sm text-black border-t-2 border-blue-200 pt-6"
          >
            <p>
              Need help?
              <a
                href="#"
                class="text-blue-600 hover:text-blue-700 font-semibold"
                >Contact our support team</a
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "default",
  middleware: ["auth"],
});

const route = useRoute();
const loading = ref(true);
const success = ref(false);
const error = ref("");
const paymentId = ref("");

/**
 * Link purchase to user
 */
const linkPurchase = async () => {
  try {
    loading.value = true;
    error.value = "";

    if (!paymentId.value) {
      throw new Error("Payment ID is missing");
    }

    // Call the API to link the purchase
    const response = await $fetch<{ success: boolean }>(
      `/api/user/linkWithPurchase/${paymentId.value}`,
      {
        method: "GET",
      }
    );

    if (response?.success) {
      success.value = true;
      // Auto-navigate after 2 seconds
      setTimeout(() => {
        navigateToCourse();
      }, 2000);
    } else {
      throw new Error("Failed to link purchase");
    }
  } catch (err: any) {
    error.value =
      err.message || "An error occurred while linking your purchase";
    console.error("Link purchase error:", err);
  } finally {
    loading.value = false;
  }
};

/**
 * Retry linking
 */
const retryLinking = async () => {
  await linkPurchase();
};

/**
 * Navigate to course
 */
const navigateToCourse = () => {
  navigateTo("/course");
};

/**
 * Navigate to home
 */
const navigateToHome = () => {
  navigateTo("/");
};

/**
 * On mount, extract paymentId and link
 */
onMounted(async () => {
  paymentId.value = route.params.paymentId as string;

  if (!paymentId.value) {
    error.value = "Invalid payment ID";
    loading.value = false;
    return;
  }

  await linkPurchase();
});
</script>
