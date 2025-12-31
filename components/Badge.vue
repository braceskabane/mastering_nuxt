<template>
  <span
    :class="[
      'inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold',
      variantClasses,
    ]"
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    variant?: "primary" | "secondary" | "success" | "warning" | "danger";
  }>(),
  {
    variant: "primary",
  }
);

const variantClasses = computed(() => {
  const variants = {
    primary: "bg-blue-100 text-blue-800",
    secondary: "bg-gray-100 text-gray-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    danger: "bg-red-100 text-red-800",
  };
  return variants[props.variant];
});
</script>
