<template>
  <Section class="space-y-12 flex flex-col">
    <h1 class="text-7xl font-black text-blue-500 m-0 p-0">
      {{ courseData.title }}
    </h1>
    <img
      :src="courseData.image"
      class="w-full rounded-lg shadow-lg border-2 border-slate-200"
    />
    <div class="text-2xl font-medium"></div>
    <button
      class="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-4 px-8 rounded-lg text-2xl"
      @click="() => (showPayment = !showPayment)"
    >
      Buy Now
    </button>
  </Section>
  <Section title="What you'll learn" class="space-y-6">
    <ul class="text-2xl font-medium space-y-6">
      <li
        v-for="outcome in learningOutcomes"
        :key="outcome"
        class="relative"
      >
        <Badge />
        {{ outcome }}
      </li>
    </ul>
  </Section>
  <Section title="Screenshots">
    <div class="flex flex-row flex wrap relative my-12">
        <img
            v-for="image in screenshots"
            :src="image"
            class="w-1/2 rounded-xl shadow-xl border-4 border-slate-200 even:ml-4 mb-4"
        />
    </div>
  <Section title="Course Outline">
    <ul class="text-2x; font-medium space-y-16">
        <li
            v-for="(chapter, index) in courseData.chapters"
            :key="chapter.slug"
            class="relative"
        >
            <Badge >
            {{  index + 1 }}
            <Badge />
            {{ chapter.title }}

            <ul class="mt-4 space-y-2">
                <li
                    v-for="lesson in chapter.lessons"
                    :key="'${chapter.slug}-${lesson.slug}'"
                    class="left-8 relative flex items-center space-y-2"
                >
                <Badge color="bg-blue-400">
                    {{ lesson.number }}
                </Badge>
                <span class="text-xl opacity-80">
                    {{ lesson.title }}
                </span>
                </li>
            </ul>
        </li>
    </ul>
  </Section>
  <LazyPayment
    v-if="showPayment"
    @close="showPayment = false"
    />
</template>

<script setup lang="ts">
  import screen1 from "~/assets/images/screenshot1.png";
  import screen2 from "~/assets/images/screenshot2.png";
  import screen3 from "~/assets/images/screenshot3.png";
  import screen4 from "~/assets/images/screenshot4.png";
  import screen5 from "~/assets/images/screenshot5.png";

  const config = useRuntimeConfig():

  console.log(config.stripeSecret);
  console.log(config.public.stripeKey);
  
    const course = await useCourse();
    const learningOutcomes = [
        "Understand the fundamentals of Nuxt 3 and its core concepts.",
        "Build dynamic and responsive web applications using Nuxt 3.",
        "Integrate Supabase for backend services like authentication and database management.",
        "Deploy Nuxt 3 applications to production environments.",
        "Implement best practices for performance optimization and SEO in Nuxt 3 apps."
    ];
    const screenshots = [
        "/public/images/screenshot1.png",
        "/public/images/screenshot2.png",
        "/public/images/screenshot3.png",
        "/public/images/screenshot4.png",
        "/public/images/screenshot5.png"
    ];
    definePageMeta({
        layout: false,
    });

    const showPayment = ref(false);
</script>


