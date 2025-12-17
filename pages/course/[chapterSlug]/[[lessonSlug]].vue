<template>
  <div v-if="lesson">
    <p class="text-sm font-medium text-gray-500 uppercase mb-2">
      Lesson {{ chapter.number }} - {{ lesson.number }}
    </p>
    
    <h2 class="text-3xl font-bold mb-4">{{ lesson.title }}</h2>
    
    <a 
      v-if="lesson.downloadUrl"
      :href="lesson.downloadUrl" 
      target="_blank"
      class="text-blue-600 hover:underline text-sm mb-6 inline-block"
    >
      Download Video
    </a>
    
    <div class="prose max-w-none">
      <p class="whitespace-pre-line">{{ lesson.text }}</p>
    </div>
  </div>
  <div v-else>
    <p>Lesson not found</p>
  </div>
</template>

<script setup>
const course = useCourse();
const route = useRoute();

const chapter = computed(() => {
  return course.chapters.find(
    (chapter) => chapter.slug === route.params.chapterSlug
  );
});

const lesson = computed(() => {
  if (!chapter.value || !route.params.lessonSlug) return null;
  return chapter.value.lessons.find(
    (lesson) => lesson.slug === route.params.lessonSlug
  );
});
</script>
