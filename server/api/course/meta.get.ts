import type { CourseMeta, OutlineChapter, OutlineLesson } from "~/types/course";
import course from "~/server/courseData";

export default defineEventHandler((event): CourseMeta => {
  if (!course) {
    throw createError({
      statusCode: 404,
      statusMessage: "Course not found",
    });
  }

  const outline: OutlineChapter[] = course.chapters.map((chapter) => {
    const lessons: OutlineLesson[] = chapter.lessons.map((lesson) => ({
      title: lesson.title,
      slug: lesson.slug,
      number: lesson.number,
      path: `/course/chapter/${chapter.slug}/lesson/${lesson.slug}`,
    }));

    return {
      title: chapter.title,
      slug: chapter.slug,
      number: chapter.number,
      lessons,
    };
  });

  return {
    title: course.title,
    chapters: outline,
  };
});
