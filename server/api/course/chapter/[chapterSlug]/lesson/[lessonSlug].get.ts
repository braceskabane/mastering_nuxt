import type { LessonWithPath } from "~/types/course";
import course from "~/server/courseData";

export default defineEventHandler((event): LessonWithPath => {
  const { chapterSlug, lessonSlug } = event.context.params as {
    chapterSlug: string;
    lessonSlug: string;
  };

  // Find chapter by slug from static data
  const chapter = course.chapters.find((ch) => ch.slug === chapterSlug);

  if (!chapter) {
    throw createError({
      statusCode: 404,
      statusMessage: "Chapter not found",
    });
  }

  // Find lesson by slug within the chapter
  const lesson = chapter.lessons.find((lesson) => lesson.slug === lessonSlug);

  if (!lesson) {
    throw createError({
      statusCode: 404,
      statusMessage: "Lesson not found",
    });
  }

  return {
    ...lesson,
    path: `/course/chapter/${chapter.slug}/lesson/${lesson.slug}`,
  };
});
