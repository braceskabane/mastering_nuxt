<template>
  <div class="min-h-screen bg-white">
    <!-- Navigation Bar -->
    <nav class="sticky top-0 z-50 backdrop-blur-md bg-white/95 border-b border-blue-100">
      <div
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center"
      >
        <div class="text-2xl font-bold text-blue-600">
          {{ course?.title?.split(" ")[0] || "Course" }}
        </div>
        <button
          class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md"
          @click="scrollToCTA"
        >
          Enroll Now
        </button>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-white">
      <div class="absolute inset-0 overflow-hidden">
        <div
          class="absolute -top-40 -right-40 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl"
        ></div>
        <div
          class="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl"
        ></div>
      </div>

      <div class="relative max-w-7xl mx-auto">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div class="space-y-6">
            <div class="inline-block">
              <span
                class="px-4 py-2 bg-blue-100 border border-blue-300 rounded-full text-blue-700 text-sm font-semibold"
              >
                ✨ Complete Course Bundle
              </span>
            </div>

            <h1
              class="text-5xl md:text-6xl lg:text-7xl font-black text-blue-900 leading-tight"
            >
              {{ course?.title || "Master Nuxt 3" }}
            </h1>

            <p class="text-xl text-gray-700 max-w-lg leading-relaxed">
              Learn modern full-stack development with Nuxt 3, Supabase, and
              advanced patterns. Build production-ready applications with
              confidence.
            </p>

            <div class="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                class="group px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
                @click="showPayment = true"
              >
                <span>🚀 Start Learning Now</span>
                <span
                  class="text-xl group-hover:translate-x-1 transition-transform"
                  >→</span
                >
              </button>
              <button
                class="px-8 py-4 border-2 border-blue-600 text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors duration-300"
                @click="scrollToCourse"
              >
                View Curriculum
              </button>
            </div>

            <div class="flex items-center gap-8 pt-8 border-t border-blue-200">
              <div class="space-y-1">
                <p class="text-3xl font-bold text-blue-900">
                  {{ course?.chapters?.length || 0 }}
                </p>
                <p class="text-sm text-gray-600">Chapters</p>
              </div>
              <div class="space-y-1">
                <p class="text-3xl font-bold text-blue-900">
                  {{ getTotalLessons }}
                </p>
                <p class="text-sm text-gray-600">Lessons</p>
              </div>
              <div class="space-y-1">
                <p class="text-3xl font-bold text-blue-900">$97</p>
                <p class="text-sm text-gray-600">One-time</p>
              </div>
            </div>
          </div>

          <!-- Hero Image -->
          <div class="relative">
            <div
              class="absolute inset-0 bg-blue-300/20 rounded-2xl blur-2xl"
            ></div>
            <img
              v-if="course?.chapters"
              :src="`/images/screenshot1.png`"
              alt="Course preview"
              class="relative w-full rounded-2xl shadow-2xl border border-blue-200"
            />
            <div
              v-else
              class="relative w-full h-96 bg-blue-100 rounded-2xl animate-pulse"
            ></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div class="max-w-7xl mx-auto">
        <div class="text-center space-y-4 mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-blue-900">
            What You'll Master
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to become a professional Nuxt 3 developer
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          <div
            v-for="(outcome, idx) in learningOutcomes"
            :key="idx"
            class="group p-6 rounded-xl bg-blue-50 border border-blue-200 hover:border-blue-400 transition-all duration-300 hover:shadow-lg"
          >
            <div
              class="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
            >
              <span class="text-xl text-white">★</span>
            </div>
            <p class="text-lg text-gray-800 font-semibold">{{ outcome }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Course Outline Section -->
    <section ref="courseRef" class="py-20 px-4 sm:px-6 lg:px-8 bg-blue-50">
      <div class="max-w-7xl mx-auto">
        <div class="text-center space-y-4 mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-blue-900">
            Complete Curriculum
          </h2>
          <p class="text-xl text-gray-600">
            Structured learning path from fundamentals to advanced
          </p>
        </div>

        <div class="space-y-6">
          <div
            v-for="(chapter, chIdx) in course?.chapters || []"
            :key="chapter.slug"
            class="group rounded-xl bg-white border border-blue-200 hover:border-blue-400 transition-all duration-300 overflow-hidden hover:shadow-lg"
          >
            <div class="p-8">
              <div class="flex items-start justify-between mb-6">
                <div class="space-y-2">
                  <h3 class="text-2xl font-bold text-blue-900">
                    <span class="text-blue-600">●</span>
                    {{ chapter.title }}
                  </h3>
                  <p class="text-gray-600">
                    {{ chapter.lessons?.length || 0 }} lessons
                  </p>
                </div>
                <div
                  class="text-4xl group-hover:scale-110 transition-transform"
                >
                  📚
                </div>
              </div>

              <ul class="grid sm:grid-cols-2 gap-4">
                <li
                  v-for="lesson in chapter.lessons"
                  :key="lesson.slug"
                  class="flex items-center gap-3 text-gray-700 group-hover:text-blue-600 transition-colors p-2 rounded hover:bg-blue-50"
                >
                  <span class="w-2 h-2 bg-blue-600 rounded-full"></span>
                  {{ lesson.title }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div class="max-w-7xl mx-auto">
        <div class="text-center space-y-4 mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-blue-900">
            Student Success Stories
          </h2>
          <p class="text-xl text-gray-600">
            Join thousands of developers building with Nuxt 3
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          <div
            v-for="testimonial in testimonials"
            :key="testimonial.name"
            class="p-6 rounded-xl bg-blue-50 border border-blue-200 hover:border-blue-400 transition-all duration-300 hover:shadow-lg"
          >
            <div class="flex gap-1 mb-4">
              <span v-for="i in 5" :key="i" class="text-yellow-500">★</span>
            </div>
            <p class="text-gray-700 mb-4 italic">{{ testimonial.quote }}</p>
            <div class="border-t border-blue-200 pt-4">
              <p class="font-semibold text-blue-900">{{ testimonial.name }}</p>
              <p class="text-sm text-gray-600">{{ testimonial.role }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section ref="ctaRef" class="py-20 px-4 sm:px-6 lg:px-8 bg-blue-600">
      <div class="max-w-4xl mx-auto">
        <div
          class="rounded-2xl bg-white p-12 md:p-16 relative overflow-hidden shadow-2xl"
        >
          <div class="absolute inset-0 opacity-5">
            <div
              class="absolute -top-20 -right-20 w-40 h-40 bg-blue-600 rounded-full blur-3xl"
            ></div>
            <div
              class="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-600 rounded-full blur-3xl"
            ></div>
          </div>

          <div class="relative text-center space-y-8">
            <h2 class="text-4xl md:text-5xl font-bold text-blue-900">
              Ready to Master Nuxt 3?
            </h2>
            <p class="text-xl text-gray-700 max-w-2xl mx-auto">
              Get lifetime access to all course materials, updates, and
              community support. Start building modern applications today.
            </p>

            <div class="space-y-4">
              <button
                class="group w-full md:w-auto px-12 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                @click="showPayment = true"
              >
                <span class="flex items-center justify-center gap-2">
                  Enroll Now - $97
                  <span class="group-hover:translate-x-1 transition-transform"
                    >→</span
                  >
                </span>
              </button>
              <p class="text-gray-700">
                30-day money-back guarantee. No questions asked.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer
      class="border-t border-blue-200 bg-white py-12 px-4 sm:px-6 lg:px-8"
    >
      <div class="max-w-7xl mx-auto text-center text-gray-600">
        <p>&copy; 2025 {{ course?.title || "Course" }}. All rights reserved.</p>
      </div>
    </footer>
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
const courseRef = ref<HTMLElement>();
const ctaRef = ref<HTMLElement>();

// Learning outcomes
const learningOutcomes = [
  "Master Nuxt 3 fundamentals and advanced patterns",
  "Build full-stack applications with Supabase",
  "Implement authentication and authorization",
  "Deploy to production with Netlify",
  "Optimize performance and SEO",
  "Build progressive web applications",
];

// Testimonials
const testimonials = [
  {
    name: "Alex Johnson",
    role: "Full-Stack Developer",
    quote:
      "This course completely transformed my understanding of Nuxt 3. The structured approach and real-world examples are invaluable.",
  },
  {
    name: "Sarah Chen",
    role: "Frontend Engineer",
    quote:
      "Finally, a comprehensive course that covers everything from basics to advanced patterns. Highly recommended for anyone serious about Nuxt.",
  },
  {
    name: "Mike Rodriguez",
    role: "Startup Founder",
    quote:
      "Built my entire SaaS product using this course's knowledge. The Supabase integration section saved me weeks of development time.",
  },
];

// Screenshots - gunakan public directory untuk images
const screenshots = [
  "/images/screenshot1.png",
  "/images/screenshot2.png",
  "/images/screenshot3.png",
  "/images/screenshot5.png",
];

// Computed
const getTotalLessons = computed(() => {
  return (
    course?.chapters?.reduce(
      (total, chapter) => total + (chapter.lessons?.length || 0),
      0
    ) || 0
  );
});

// Methods
const scrollToCTA = () => {
  if (ctaRef.value) {
    ctaRef.value.scrollIntoView({ behavior: "smooth" });
  }
};

const scrollToCourse = () => {
  if (courseRef.value) {
    courseRef.value.scrollIntoView({ behavior: "smooth" });
  }
};

// Page metadata
definePageMeta({
  layout: "default",
  colorMode: "dark",
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
