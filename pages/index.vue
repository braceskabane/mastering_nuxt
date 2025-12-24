<template>
  <NuxtLink
    v-if="firstLesson"
    class="text-blue-500 underline font-medium"
    :to="firstLesson.path"
  >
    Go to First Lesson
  </NuxtLink>
</template>

<script setup lang="ts">
const firstLesson = await useFirstLesson();
</script>
