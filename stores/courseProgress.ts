import { defineStore } from "pinia";
import type { CourseProgress, CourseMeta } from "~/types/course";

export const useCourseProgress = defineStore("courseProgress", () => {
  // Persist progress to localStorage for offline support
  const progress = useLocalStorage<CourseProgress>("courseProgress", {});
  const initialized = ref(false);
  const courseData = ref<CourseMeta | null>(null);

  function setCourseData(course: CourseMeta) {
    courseData.value = course;
  }

  async function initialize() {
    // if the course has already been initialized, return
    if (initialized.value) return;
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
    // Use course data if available for accurate per-chapter percentages
    const course = courseData.value;

    if (!course || !course.chapters || course.chapters.length === 0) {
      // Fallback: calculate based on progress structure only
      const chapters = Object.values(progress.value).map((chapter) => {
        const lessons = Object.values(chapter);
        const completedLessons = lessons.filter((lesson) => lesson);
        return Number(
          (completedLessons.length / lessons.length) * 100 || 0
        ).toFixed(0);
      });

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
      const coursePercentage = Number(
        totalLessons > 0 ? (totalCompletedLessons / totalLessons) * 100 : 0
      ).toFixed(0);

      return {
        chapters,
        course: coursePercentage,
      };
    }

    // Calculate percentage per chapter using course.chapters order
    const chapters = course.chapters.map((chapter: any) => {
      const chapterProgress = progress.value[chapter.slug];
      const totalLessonsInChapter = chapter.lessons.length;
      const completedLessonsInChapter = Object.values(
        chapterProgress || {}
      ).filter((completed) => completed).length;

      return Number(
        (completedLessonsInChapter / totalLessonsInChapter) * 100 || 0
      ).toFixed(0);
    });

    // Calculate total course percentage
    const totalLessons = course.chapters.reduce(
      (sum: number, chapter: any) => sum + chapter.lessons.length,
      0
    );
    const totalCompletedLessons = Object.values(progress.value).reduce(
      (sum, chapterProgress) => {
        return (
          sum +
          Object.values(chapterProgress).filter((completed) => completed)
            .length
        );
      },
      0
    );

    const coursePercentage = Number(
      totalLessons > 0 ? (totalCompletedLessons / totalLessons) * 100 : 0
    ).toFixed(0);

    return {
      chapters,
      course: coursePercentage,
    };
  });

  return {
    initialize,
    progress,
    toggleComplete,
    percentageCompleted,
    setCourseData,
  };
});
