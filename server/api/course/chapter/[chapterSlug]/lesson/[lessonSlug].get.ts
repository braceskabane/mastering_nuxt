// import type { LessonWithPath } from "~/types/course";
// import course from "~/server/courseData";

// export default defineEventHandler((event): LessonWithPath => {
//   const { chapterSlug, lessonSlug } = event.context.params as {
//     chapterSlug: string;
//     lessonSlug: string;
//   };

//   const chapter = course.chapters.find((ch) => ch.slug === chapterSlug);

//   if (!chapter) {
//     throw createError({
//       statusCode: 404,
//       statusMessage: "Chapter not found",
//     });
//   }

//   const lesson = chapter.lessons.find((lesson) => lesson.slug === lessonSlug);

//   if (!lesson) {
//     throw createError({
//       statusCode: 404,
//       statusMessage: "Lesson not found",
//     });
//   }

//   return {
//     ...lesson,
//     path: `/course/chapter/${chapter.slug}/lesson/${lesson.slug}`,
//   };
// });

import { PrismaClient } from "@prisma/client";
import protectRoute from "~/server/utils/protectRoute";

const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  if (event.context.params?.chapterSlug !== "1-chapter-1") {
    protectRoute(event);
  }
  const { chapterSlug, lessonSlug } = event.context.params as {
    chapterSlug: string;
    lessonSlug: string;
  };

  // return prisma.lesson.findFirst();

  // return prisma.lesson.findMany({
  //   where: {
  //     Chapter: {
  //       slug: chapterSlug,
  //     },
  //   },
  //   // select: {
  //   //   slug: true,
  //   // },
  //   include: {
  //     Chapter: true,
  //   },
  // });

  const lesson = await prisma.lesson.findFirst({
    where: {
      slug: lessonSlug,
      Chapter: {
        slug: chapterSlug,
      },
    },
  });
  console.log("Fetched lesson:", lesson);
  if (!lesson) {
    throw createError({
      statusCode: 404,
      statusMessage: "Lesson not found",
    });
  }

  return {
    ...lesson,
    path: `/course/chapter/${chapterSlug}/lesson/${lessonSlug}`,
  };
});
