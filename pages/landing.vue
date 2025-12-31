<template>
  <div class="bg-white">
    <!-- Hero Section -->
    <Section class="space-y-8 flex flex-col py-16">
      <h1
        class="text-4xl md:text-6xl lg:text-7xl font-black text-blue-500 m-0 p-0 leading-tight"
      >
        {{ course?.title || "Loading Course..." }}
      </h1>
      <p class="text-lg md:text-xl text-gray-600 max-w-2xl">
        Master Nuxt 3, Supabase, and modern full-stack development with this
        comprehensive course.
      </p>
      <button
        class="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-4 px-8 rounded-lg text-lg md:text-xl w-full md:w-auto transition-colors"
        @click="showPayment = !showPayment"
      >
        🚀 Start Learning - $97
      </button>
    </Section>

    <!-- Course Showcase Image -->
    <Section class="py-8">
      <img
        v-if="course?.chapters"
        :src="`/images/screenshot1.png`"
        alt="Course preview"
        class="w-full rounded-lg shadow-lg border-2 border-slate-200"
      />
      <div v-else class="animate-pulse bg-gray-200 rounded-lg h-96"></div>
    </Section>

    <!-- Learning Outcomes -->
    <Section title="What you'll learn" class="space-y-6 py-16">
      <ul class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <li
          v-for="(outcome, idx) in learningOutcomes"
          :key="idx"
          class="flex items-start space-x-4"
        >
          <Badge class="mt-1 flex-shrink-0" />
          <span class="text-base md:text-lg text-gray-700">{{ outcome }}</span>
        </li>
      </ul>
    </Section>

    <!-- Screenshots -->
    <Section title="Screenshots" class="py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <img
          v-for="(image, idx) in screenshots"
          :key="idx"
          :src="image"
          :alt="`Screenshot ${idx + 1}`"
          class="rounded-xl shadow-xl border-4 border-slate-200 hover:shadow-2xl transition-shadow"
        />
      </div>
    </Section>

    <!-- Course Outline -->
    <Section title="Course Outline" class="py-16">
      <div class="space-y-8">
        <div
          v-for="(chapter, chIdx) in course?.chapters || []"
          :key="chapter.slug"
          class="border-l-4 border-blue-500 pl-6"
        >
          <h3 class="text-xl md:text-2xl font-bold text-blue-600 mb-4">
            <Badge class="inline-block mr-3" />
            {{ chapter.title }}
          </h3>
          <ul class="space-y-3 ml-8">
            <li
              v-for="lesson in chapter.lessons"
              :key="lesson.slug"
              class="flex items-center space-x-3 text-gray-700"
            >
              <Badge color="bg-blue-400" class="text-xs" />
              <span class="text-base md:text-lg">{{ lesson.title }}</span>
            </li>
          </ul>
        </div>
      </div>
    </Section>

    <!-- CTA Section -->
    <Section
      class="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-16 rounded-xl space-y-6"
    >
      <h2 class="text-3xl md:text-4xl font-bold">Ready to get started?</h2>
      <p class="text-lg md:text-xl opacity-90">
        Join hundreds of developers learning Nuxt 3
      </p>
      <button
        class="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-4 px-8 rounded-lg text-lg transition-colors"
        @click="showPayment = true"
      >
        Buy Course Now
      </button>
    </Section>
  </div>

  <!-- Lazy Load Payment Modal -->
  <LazyPayment v-if="showPayment" @close="showPayment = false" />
</template>

<script setup lang="ts">
import type { CourseMeta } from "~/types/course";

// Error handling untuk course fetch
let course: CourseMeta | null = null;
try {
  course = await useCourse();
} catch (error) {
  console.error("Error loading course:", error);
  course = null;
}

const config = useRuntimeConfig();
const showPayment = ref(false);

// Learning outcomes
const learningOutcomes = [
  "Master Nuxt 3 fundamentals and advanced patterns",
  "Build full-stack applications with Supabase",
  "Implement authentication and authorization",
  "Deploy to production with Netlify",
  "Optimize performance and SEO",
  "Build progressive web applications",
];

// Screenshots - gunakan public directory untuk images
const screenshots = [
  "/images/screenshot1.png",
  "/images/screenshot2.png",
  "/images/screenshot3.png",
  "/images/screenshot5.png",
];

// Page metadata
definePageMeta({
  layout: "default",
  colorMode: "light",
});

// SEO Head
useHead({
  title: "Learn Nuxt 3 with Supabase - Build Full-Stack Apps",
  meta: [
    {
      name: "description",
      content:
        "Comprehensive course on Nuxt 3, Supabase, and modern full-stack development. Learn by building real projects.",
    },
    {
      name: "og:title",
      content: "Learn Nuxt 3 with Supabase",
    },
    {
      name: "og:description",
      content: "Master full-stack development with Nuxt 3 and Supabase",
    },
  ],
});
</script>
