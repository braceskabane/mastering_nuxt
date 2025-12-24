import type { LessonWithPath } from "~/types/course";
import { PrismaClient } from "~/server/utils/prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event): Promise<LessonWithPath> => {
  const { chapterSlug, lessonSlug } = event.context.params as {
    chapterSlug: string;
    lessonSlug: string;
  };

  // Find chapter by slug
  const chapter = await prisma.chapter.findUnique({
    where: { slug: chapterSlug },
    include: {
      lessons: true,
    },
  });

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
