<template>
  <div v-if="lesson">
    <p class="text-sm font-medium text-gray-500 uppercase mb-2">
      Lesson {{ chapter.number }} - {{ lesson.number }}
    </p>

    <h2 class="text-2xl font-bold mb-4">{{ lesson.title }}</h2>

    <div class="flex space-x-4 mb-8">
      <a
        v-if="lesson.sourceUrl"
        :href="lesson.sourceUrl"
        target="_blank"
        class="font-normal text-md text-gray-500"
      >
        Download Source Code
      </a>

      <a
        v-if="lesson.downloadUrl"
        :href="lesson.downloadUrl"
        target="_blank"
        class="font-normal text-md text-gray-500"
      >
        Download Video
      </a>
    </div>

    <VideoPlayer v-if="lesson.videoId" :videoId="lesson.videoId" />

    <div class="prose max-w-none mt-8">
      <p class="whitespace-pre-line">{{ lesson.text }}</p>
    </div>
    <LessonCompleteButton
      :model-value="isLessonComplete"
      @update:model-value="toggleComplete"
    />
  </div>
  <div v-else>
    <p>Lesson not found</p>
  </div>
</template>

<script setup>
const course = await useCourse();
const route = useRoute();
let { chapterSlug, lessonSlug } = route.params;
let lesson = await useLesson(chapterSlug, lessonSlug);

// Validation function - separated dari middleware
async function validateLessonRoute({ params }, from) {
  const course = await useCourse();

  const chapter = course.value.chapters.find(
    (chapter) => chapter.slug === params.chapterSlug
  );

  if (!chapter) {
    return abortNavigation(
      createError({
        statusCode: 404,
        message: "Chapter not found",
      })
    );
  }

  const lesson = chapter.lessons.find(
    (lesson) => lesson.slug === params.lessonSlug
  );

  if (!lesson) {
    return abortNavigation(
      createError({
        statusCode: 404,
        message: "Lesson not found",
      })
    );
  }

  return true;
}

definePageMeta({
  middleware: [validateLessonRoute, "auth"],
});

const chapter = computed(() => {
  return course.value.chapters.find(
    (chapter) => chapter.slug === route.params.chapterSlug
  );
});

if (!chapter.value) {
  throw createError({
    statusCode: 404,
    message: "Chapter not found",
  });
}

// const lesson = computed(() => {
//   if (!chapter.value || !route.params.lessonSlug) return null;
//   return chapter.value.lessons.find(
//     (lesson) => lesson.slug === route.params.lessonSlug
//   );
// });

const title = computed(() => {
  if (!lesson.value) return course.value.title;
  return `${lesson.value.title} - ${course.value.title}`;
});
useHead({
  title,
});

const progress = useLocalStorage("progress", []);

const isLessonComplete = computed(() => {
  if (!progress.value[chapter.value.number - 1]) {
    return false;
  }

  if (!progress.value[chapter.value.number - 1][lesson.value.number - 1]) {
    return false;
  }

  return progress.value[chapter.value.number - 1][lesson.value.number - 1];
});

const toggleComplete = () => {
  if (!progress.value[chapter.value.number - 1]) {
    progress.value[chapter.value.number - 1] = [];
  }

  progress.value[chapter.value.number - 1][lesson.value.number - 1] =
    !isLessonComplete.value;
};
</script>
