<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
    <!-- Card Container -->
    <div class="w-full max-w-md">
      <!-- Loading State -->
      <div v-if="loading" class="space-y-6">
        <!-- Skeleton Background -->
        <div class="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 p-8 backdrop-blur-md">
          <!-- Animated Loading Icon -->
          <div class="flex justify-center mb-8">
            <div class="relative w-16 h-16">
              <div class="absolute inset-0 rounded-full border-2 border-slate-700"></div>
              <div class="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-500 border-r-cyan-500 animate-spin"></div>
            </div>
          </div>
          
          <!-- Loading Text -->
          <div class="space-y-3 text-center">
            <h1 class="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Linking Your Purchase
            </h1>
            <p class="text-slate-400 text-sm leading-relaxed">
              We're verifying your payment and linking it to your account. This usually takes just a moment.
            </p>
          </div>

          <!-- Progress Bar -->
          <div class="mt-8 w-full bg-slate-700/50 rounded-full h-1 overflow-hidden">
            <div class="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      <!-- Success State -->
      <div v-else-if="success" class="space-y-6">
        <!-- Success Card -->
        <div class="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 p-8 backdrop-blur-md">
          <!-- Success Icon -->
          <div class="flex justify-center mb-8">
            <div class="relative w-20 h-20 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full flex items-center justify-center border border-green-400/30">
              <svg class="w-10 h-10 text-green-400 animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>

          <!-- Success Content -->
          <div class="space-y-4 text-center mb-8">
            <h1 class="text-2xl font-bold text-white">
              Purchase Verified!
            </h1>
            <p class="text-slate-400 text-sm leading-relaxed">
              Your payment has been successfully verified and linked to your account. You now have full access to the course.
            </p>
          </div>

          <!-- CTA Button -->
          <button
            @click="navigateToCourse"
            class="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-lg hover:shadow-blue-500/30"
          >
            Access Your Course
          </button>

          <!-- Divider -->
          <div class="relative my-6">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-slate-700"></div>
            </div>
            <div class="relative flex justify-center text-xs">
              <span class="px-2 bg-gradient-to-br from-slate-800 to-slate-900 text-slate-500">What's next?</span>
            </div>
          </div>

          <!-- Info Cards -->
          <div class="grid grid-cols-2 gap-3 text-xs">
            <div class="bg-slate-700/30 rounded-lg p-3 border border-slate-700">
              <div class="text-blue-400 font-semibold mb-1">📚</div>
              <div class="text-slate-300">Start Learning</div>
            </div>
            <div class="bg-slate-700/30 rounded-lg p-3 border border-slate-700">
              <div class="text-cyan-400 font-semibold mb-1">🏆</div>
              <div class="text-slate-300">Track Progress</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else class="space-y-6">
        <!-- Error Card -->
        <div class="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-red-900/30 p-8 backdrop-blur-md">
          <!-- Error Icon -->
          <div class="flex justify-center mb-8">
            <div class="relative w-20 h-20 bg-gradient-to-br from-red-400/20 to-orange-400/20 rounded-full flex items-center justify-center border border-red-400/30">
              <svg class="w-10 h-10 text-red-400 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>

          <!-- Error Content -->
          <div class="space-y-4 text-center mb-8">
            <h1 class="text-2xl font-bold text-white">
              Verification Failed
            </h1>
            <p class="text-red-300/80 text-sm leading-relaxed">
              {{ error || "We couldn't link your purchase at this moment. Please try again or contact support if the problem persists." }}
            </p>
          </div>

          <!-- Action Buttons -->
          <div class="space-y-3">
            <button
              @click="retryLinking"
              class="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              Try Again
            </button>
            <button
              @click="navigateToHome"
              class="w-full px-6 py-3 bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold rounded-lg transition-all duration-300 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500/50"
            >
              Back to Home
            </button>
          </div>

          <!-- Support Link -->
          <div class="mt-6 text-center text-xs text-slate-400 border-t border-slate-700 pt-6">
            <p>Need help? <a href="#" class="text-blue-400 hover:text-blue-300 font-semibold">Contact our support team</a></p>
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
