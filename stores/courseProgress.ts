import { defineStore } from "pinia";
import type { CourseProgress } from "~/types/course";

export const useCourseProgress = defineStore("courseProgress", () => {
  // Error muncul karena useLocalStorage("progress", {}) tanpa tipe eksplisit membuat TypeScript menganggapnya sebagai {} (empty object literal type).
  //   const progress = useLocalStorage<any>("progress", {});
  const progress = ref<CourseProgress>({});
  const initialized = ref(false);

  async function initialize() {
    // if the course has already been initialized, return
    if (!initialized.value) return;
    initialized.value = true;

    // fetch user progress from endpoint
    const { data: userProgress } = await useFetch<CourseProgress>(
      "/api/user/progress",
      { headers: useRequestHeaders(["cookie"]) }
    );
    if (userProgress.value) {
      progress.value = userProgress.value;
    }
  }

  const toggleComplete = async (chapter: string, lesson: string) => {
    const user = useSupabaseUser();
    if (!user.value) return;

    if (!chapter || !lesson) {
      const {
        params: { chapterSlug, lessonSlug },
      } = useRoute();
      chapter = chapterSlug as string;
      lesson = lessonSlug as string;
    }

    // Get the current Progress for the lesson
    const currentProgress = progress.value[chapter]?.[lesson];

    // Optimistic Update the progress value in the UI
    progress.value[chapter] = {
      ...progress.value[chapter],
      [lesson]: !currentProgress,
    };

    try {
      // Send the update to the server
      await $fetch(`/api/course/chapter/${chapter}/lesson/${lesson}/progress`, {
        method: "POST",
        body: {
          completed: !currentProgress,
          //   userEmail: user.value.email,
        },
      });
    } catch (error) {
      console.error("Failed to update lesson progress:", error);

      progress.value[chapter] = {
        ...progress.value[chapter],
        [lesson]: currentProgress,
      };
    }
  };

  const percentageCompleted = computed(() => {
    const chapters = Object.values(progress.value).map((chapter) => {
      const lessons = Object.values(chapter);
      const completedLessons = lessons.filter((lesson) => lesson);
      return Number((completedLessons.length / lessons.length) * 100).toFixed(
        0
      );
    }, []);

    const totalLessons = Object.values(progress.value).reduce(
      (number, chapter) => {
        return number + Object.values(chapter).length;
      },
      0
    );
    const totalCompletedLessons = Object.values(progress.value).reduce(
      (number, chapter) => {
        return (
          number + Object.values(chapter).filter((lesson) => lesson).length
        );
      },
      0
    );
    const course = Number((totalCompletedLessons / totalLessons) * 100);

    return {
      chapters,
      course,
    };
  });

  return {
    initialize,
    progress,
    toggleComplete,
    percentageCompleted,
  };
});
