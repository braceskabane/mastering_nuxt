<template>
  <label
    class="mt-6 inline-flex items-center justify-center px-4 py-2 rounded-lg font-semibold text-sm cursor-pointer select-none transition-all duration-200 border"
    :class="
      modelValue
        ? 'bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700'
        : 'bg-gray-800 text-gray-200 border-gray-700 hover:bg-gray-700'
    "
  >
    <input
      type="checkbox"
      class="hidden"
      :checked="modelValue"
      @input="$emit('update:modelValue', $event.target.checked)"
    />

    {{ modelValue ? "Completed!" : "Mark as complete" }}
  </label>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["update:modelValue"]);
</script>

<style scoped>
::selection {
  display: none;
}
</style>
