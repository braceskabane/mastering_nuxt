<template>
  <NuxtLink
    class="text-blue-500 underline font-medium"
    :href="firstLesson.path"
  >
    Go to First Lesson
  </NuxtLink>
</template>

<script setup lang="ts">
const firstLesson = useFirstLesson();
</script>
