<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xl backdrop-brightness-50"
  >
    <!-- Close button -->
    <button
      class="absolute top-6 right-6 w-12 h-12 rounded-full bg-slate-600 hover:bg-slate-500 text-white text-2xl flex items-center justify-center transition"
      @click="$emit('close')"
      aria-label="Close modal"
    >
      &#10005;
    </button>

    <!-- Modal content -->
    <div class="z-10">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

defineEmits<{
  (e: "close"): void;
}>();

const previousOverflow = ref<string>("");

onMounted(() => {
  // Lock scroll when modal is open
  previousOverflow.value = document.body.style.overflow;
  document.body.style.overflow = "hidden";
});

onBeforeUnmount(() => {
  // Restore scroll
  document.body.style.overflow = previousOverflow.value;
});
</script>
