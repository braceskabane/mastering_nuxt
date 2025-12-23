<template>
  <div>
    <div class="mb-4 flex justify-between items-center w-full">
      <h1 class="text-3xl">
        <span class="font-medium">Course: </span>
        <span class="font-bold">{{ course.title }}</span>
      </h1>
      <UserCard />
    </div>

    <div class="flex flex-row justify-center flex-grow">
      <div
        class="prose mr-4 p-8 bg-white rounded-md min-w-[20ch] flex flex-col"
      >
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
            :to="lesson.path"
            :class="{
              'text-blue-500': lesson.path === $route.path,
              'text-gray-500': lesson.path !== $route.path,
            }"
            class="flex flex-row space-x-1 no-underline prose-sm font-normal"
          >
            <span> {{ index + 1 }}. </span>

            <span>{{ lesson.title }}</span>
          </NuxtLink>
        </div>
      </div>
      <div class="prose p-12 bg-red-100 rounded-md w-[65ch]">
        <NuxtErrorBoundary>
          <NuxtPage />
          <template #error="{ error }">
            <p>
              Oh no, something went wrong with the lesson!
              <code>{{ error }}</code>
            </p>
            <p>
              <button
                class="hover:cursor-pointer bg-gray-500 text-white font-bold py-2 px-4 rounded mt-4"
                @click="resetError(error)"
              >
                Reset
              </button>
            </p>
          </template>
        </NuxtErrorBoundary>
      </div>
    </div>
  </div>
</template>

<script setup>
// definePageMeta({
//   layout: 'custom',
// });

// const { chapters, title } = useCourse();

// const resetError = async (error) => {
//   throw createError({
//     fatal: true,
//     message: "Fatal error",
//   });
// };

const course = await useCourse();
const firstLesson = await useFirstLesson();

const resetError = async (error) => {
  await navigateTo(firstLesson.path);
  error.value = null;
};
</script>
