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

const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
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

  return prisma.lesson.findFirst({
    where: {
      Chapter: {
        slug: chapterSlug,
      },
    },
    // select: {
    //   slug: true,
    // },
    include: {
      Chapter: {
        select: {
          slug: true,
          title: true,
        },
      },
    },
  });
});
