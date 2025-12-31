<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4"
  >
    <div class="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
      <!-- Loading State -->
      <div
        v-if="loading"
        class="flex flex-col items-center justify-center space-y-4"
      >
        <Loading class="h-12 w-12 text-blue-600" />
        <h1 class="text-xl font-bold text-gray-800">
          Linking Your Purchase...
        </h1>
        <p class="text-gray-600 text-center">
          Please wait while we verify and link your purchase to your account.
        </p>
      </div>

      <!-- Success State -->
      <div
        v-else-if="success"
        class="flex flex-col items-center justify-center space-y-4"
      >
        <div class="text-6xl">✅</div>
        <h1 class="text-2xl font-bold text-gray-800 text-center">
          Purchase Linked Successfully!
        </h1>
        <p class="text-gray-600 text-center">
          Your purchase has been linked to your account. You now have access to
          the course.
        </p>
        <button
          @click="navigateToCourse"
          class="w-full mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
        >
          Go to Course
        </button>
      </div>

      <!-- Error State -->
      <div v-else class="flex flex-col items-center justify-center space-y-4">
        <div class="text-6xl">❌</div>
        <h1 class="text-2xl font-bold text-gray-800 text-center">
          Something Went Wrong
        </h1>
        <p class="text-red-600 text-center">
          {{ error || "Failed to link your purchase. Please try again." }}
        </p>
        <div class="flex gap-3 w-full">
          <button
            @click="retryLinking"
            class="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            Retry
          </button>
          <button
            @click="navigateToHome"
            class="flex-1 px-6 py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-lg transition-colors"
          >
            Home
          </button>
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
