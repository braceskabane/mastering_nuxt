<template>
  <div class="p-12 bg-gray-100 w-full h-full min-h-screen flex flex-col items-center">
    <div class="prose mb-12">
      <h1 class="text-5xl">
        <span class="font-medium">Course: </span>
        <span class="font-bold">Mastering Nuxt</span>
      </h1>
    </div>

    <div class="flex flex-row justify-center flex-grow">
      <div class="prose mr-4 p-8 bg-white rounded-md min-w-[20ch] flex flex-col">
        <h3 class="font-bold">Chapters</h3>
        
        <div 
          class="space-y-1 mb-4 flex flex-col"
          v-for="chapter in chapters"
          :key="chapter.slug"
        >
          <h4>{{ chapter.title }}</h4>
          
          <NuxtLink
            v-for="(lesson, index) in chapter.lessons"
            :key="lesson.slug"
            :to="`/course/${chapter.slug}/${lesson.slug}`"
            class="flex flex-row space-x-1 no-underline prose-sm font-normal text-gray-500"
          >
            <span class="text-gray-500">
              {{ index + 1 }}.
            </span>
            
            <span>{{ lesson.title }}</span>
          </NuxtLink>
        </div>
      </div>

      <div class="prose p-12 bg-red-100 rounded-md w-[65ch]">
        <NuxtPage />
      </div>
    </div>
  </div>
</template>

<script setup>
const { chapters } = useCourse();
</script>
