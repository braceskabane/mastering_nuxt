// import type { CourseMeta, OutlineChapter, OutlineLesson } from "~/types/course";
// import course from "~/server/courseData";

// export default defineEventHandler((event): CourseMeta => {
//   if (!course) {
//     throw createError({
//       statusCode: 404,
//       statusMessage: "Course not found",
//     });
//   }

//   const outline: OutlineChapter[] = course.chapters.map((chapter) => {
//     const lessons: OutlineLesson[] = chapter.lessons.map((lesson) => ({
//       title: lesson.title,
//       slug: lesson.slug,
//       number: lesson.number,
//       path: `/course/chapter/${chapter.slug}/lesson/${lesson.slug}`,
//     }));

//     return {
//       title: chapter.title,
//       slug: chapter.slug,
//       number: chapter.number,
//       lessons,
//     };
//   });

//   return {
//     title: course.title,
//     chapters: outline,
//   };
// });

import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const lessonSelect = Prisma.validator<Prisma.LessonDefaultArgs>()({
  select: {
    title: true,
    slug: true,
    number: true,
  },
});

export type LessonOutline = Prisma.LessonGetPayload<typeof lessonSelect> & {
  path: string;
};

const chapterSelect = Prisma.validator<Prisma.ChapterDefaultArgs>()({
  select: {
    title: true,
    slug: true,
    number: true,
    lessons: lessonSelect,
  },
});

export type ChapterOutline = Omit<
  Prisma.ChapterGetPayload<typeof chapterSelect>,
  "lessons"
> & {
  lessons: LessonOutline[];
};

const courseSelect = Prisma.validator<Prisma.CourseDefaultArgs>()({
  select: {
    title: true,
    chapters: chapterSelect,
  },
});

export type CourseOutline = Omit<
  Prisma.CourseGetPayload<typeof courseSelect>,
  "chapters"
> & {
  chapters: ChapterOutline[];
};

export default defineEventHandler(async (): Promise<CourseOutline> => {
  console.log("📍 Fetching course metadata...");
  const outline = await prisma.course.findFirst(courseSelect);

  if (!outline) {
    console.error("❌ No course found");
    throw createError({
      statusCode: 404,
      statusMessage: "Course not found",
    });
  }

  console.log(
    `✅ Course found: ${outline.title}, chapters: ${outline.chapters.length}`
  );

  const chapters = outline.chapters.map((chapter) => ({
    ...chapter,
    lessons: chapter.lessons.map((lesson) => ({
      ...lesson,
      path: `/course/chapter/${chapter.slug}/lesson/${lesson.slug}`,
    })),
  }));

  console.log(`📊 Response: ${chapters.length} chapters with paths generated`);
  console.log("🔍 First lesson path:", chapters[0]?.lessons[0]?.path);

  return {
    ...outline,
    chapters,
  };
});
