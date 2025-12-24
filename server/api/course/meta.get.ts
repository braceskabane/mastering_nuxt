import type { CourseMeta, OutlineChapter, OutlineLesson } from "~/types/course";
import { PrismaClient } from "~/server/utils/prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event): Promise<CourseMeta> => {
  // Fetch course data from Supabase via Prisma
  const course = await prisma.course.findFirst({
    include: {
      chapters: {
        include: {
          lessons: true,
        },
        orderBy: {
          number: "asc",
        },
      },
    },
  });

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
