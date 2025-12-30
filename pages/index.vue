<template>
  <div class="p-8">
    <h1 class="text-4xl font-bold mb-8">Welcome to TypeScript with Vue.js 3</h1>

    <div v-if="isLoading" class="text-gray-500 py-4">
      <p>⏳ Loading first lesson...</p>
    </div>

    <div v-else-if="firstLesson && firstLesson.path" class="mt-6">
      <button
        @click="goToLesson"
        class="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 cursor-pointer"
      >
        🎯 Start Learning: {{ firstLesson.title }}
      </button>
      <p class="text-xs text-gray-400 mt-3">Route: {{ firstLesson.path }}</p>
    </div>

    <div v-else class="text-red-500 py-4 bg-red-50 p-4 rounded">
      <p class="font-semibold">❌ Could not load first lesson</p>
      <p v-if="error" class="text-sm mt-2 whitespace-pre-wrap">{{ error }}</p>
      <details class="mt-4 text-xs">
        <summary class="cursor-pointer font-medium">🔍 Debug Info</summary>
        <pre
          class="mt-2 bg-gray-800 text-gray-100 p-2 rounded overflow-auto text-xs"
        >
Open browser console (F12) for detailed logs
        </pre>
      </details>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LessonOutline } from "~/server/api/course/meta.get";

const router = useRouter();
const isLoading = ref(true);
const firstLesson = ref<LessonOutline | null>(null);
const error = ref("");

const goToLesson = () => {
  if (firstLesson.value && firstLesson.value.path) {
    console.log("🚀 Navigating to:", firstLesson.value.path);
    router.push(firstLesson.value.path);
  } else {
    console.error("❌ Cannot navigate: no path available");
  }
};

try {
  console.log("🔄 Loading first lesson...");
  const lesson = await useFirstLesson();

  console.log("📦 Lesson data:", lesson);
  console.log("📋 Lesson keys:", lesson ? Object.keys(lesson) : "null");
  console.log("🔗 Lesson path:", lesson?.path);

  if (lesson && lesson.path) {
    console.log("✅ Valid lesson with path");
    firstLesson.value = lesson;
  } else if (lesson) {
    console.error(
      "❌ Lesson missing path. Data:",
      JSON.stringify(lesson, null, 2)
    );
    error.value = `Lesson data incomplete. Got: ${JSON.stringify(lesson)}`;
  } else {
    console.error("❌ Lesson is null");
    error.value = "No lesson data returned";
  }
} catch (err) {
  console.error("❌ Error loading first lesson:", err);
  error.value = `Error: ${err instanceof Error ? err.message : String(err)}`;
} finally {
  isLoading.value = false;
}
</script>
