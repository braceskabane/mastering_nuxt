import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  // First, create the course
  const course = await prisma.course.create({
    data: {
      title: "TypeScript with Vue.js 3",
    },
  });

  // Chapter 1
  const chapter1 = await prisma.chapter.create({
    data: {
      title: "Chapter 1",
      slug: "1-chapter-1",
      number: 1,
      courseId: course.id,
    },
  });

  // Chapter 1 Lessons
  await prisma.lesson.createMany({
    data: [
      {
        title: "Introduction to TypeScript with Vue.js 3",
        slug: "1-introduction-to-typescript-with-vue-js-3",
        number: 1,
        downloadUrl:
          "https://vueschool.io/lessons/introduction-to-typescript-with-vue-js-3",
        sourceUrl:
          "https://github.com/vueschool/typescript-vue3-course/tree/main/lesson-1",
        videoId: "G_IjpeXxAkE",
        text: "In this lesson, we take a look at some of the benefits of using TypeScript with Vue.js 3.",
        chapterId: chapter1.id,
      },
      {
        title: "Basic Types in TypeScript",
        slug: "1-basic-types-in-typescript",
        number: 2,
        downloadUrl: "https://vueschool.io/lessons/basic-types-in-typescript",
        sourceUrl:
          "https://github.com/vueschool/typescript-vue3-course/tree/main/lesson-2",
        videoId: "abc123def45",
        text: "Learn about the basic types in TypeScript.",
        chapterId: chapter1.id,
      },
      {
        title: "TypeScript Interfaces for Vue Components",
        slug: "1-typescript-interfaces-for-vue-components",
        number: 3,
        downloadUrl:
          "https://vueschool.io/lessons/typescript-interfaces-for-vue-components",
        sourceUrl:
          "https://github.com/vueschool/typescript-vue3-course/tree/main/lesson-3",
        videoId: "xyz789ghi01",
        text: "Discover how to use TypeScript interfaces.",
        chapterId: chapter1.id,
      },
    ],
  });

  // Chapter 2
  const chapter2 = await prisma.chapter.create({
    data: {
      title: "Chapter 2",
      slug: "2-chapter-2",
      number: 2,
      courseId: course.id,
    },
  });

  await prisma.lesson.createMany({
    data: [
      {
        title: "Setting up TypeScript",
        slug: "2-setting-up-typescript",
        number: 1,
        downloadUrl: "https://vueschool.io/lessons/setting-up-typescript",
        sourceUrl:
          "https://github.com/vueschool/typescript-vue3-course/tree/main/lesson-4",
        videoId: "ymqHMOD_NaE",
        text: "Learn how to set up TypeScript in a Vue.js 3 project.",
        chapterId: chapter2.id,
      },
      {
        title: "Configuring tsconfig.json for Vue Projects",
        slug: "2-configuring-tsconfig-for-vue-projects",
        number: 2,
        downloadUrl:
          "https://vueschool.io/lessons/configuring-tsconfig-for-vue-projects",
        sourceUrl:
          "https://github.com/vueschool/typescript-vue3-course/tree/main/lesson-5",
        videoId: "jkl234mno56",
        text: "Deep dive into tsconfig.json configuration.",
        chapterId: chapter2.id,
      },
      {
        title: "TypeScript with Vue Composition API",
        slug: "2-typescript-with-vue-composition-api",
        number: 3,
        downloadUrl:
          "https://vueschool.io/lessons/typescript-with-vue-composition-api",
        sourceUrl:
          "https://github.com/vueschool/typescript-vue3-course/tree/main/lesson-6",
        videoId: "pqr789stu01",
        text: "Learn how to leverage TypeScript with Vue 3's Composition API.",
        chapterId: chapter2.id,
      },
    ],
  });

  // Chapter 3
  const chapter3 = await prisma.chapter.create({
    data: {
      title: "Chapter 3",
      slug: "3-chapter-3",
      number: 3,
      courseId: course.id,
    },
  });

  await prisma.lesson.createMany({
    data: [
      {
        title: "Advanced TypeScript Types",
        slug: "3-advanced-typescript-types",
        number: 1,
        downloadUrl: "https://vueschool.io/lessons/advanced-typescript-types",
        sourceUrl:
          "https://github.com/vueschool/typescript-vue3-course/tree/main/lesson-7",
        videoId: "uvw123xyz45",
        text: "Explore advanced TypeScript types.",
        chapterId: chapter3.id,
      },
      {
        title: "Vue Router with TypeScript",
        slug: "3-vue-router-with-typescript",
        number: 2,
        downloadUrl: "https://vueschool.io/lessons/vue-router-with-typescript",
        sourceUrl:
          "https://github.com/vueschool/typescript-vue3-course/tree/main/lesson-8",
        videoId: "def456ghi78",
        text: "Learn how to type Vue Router routes.",
        chapterId: chapter3.id,
      },
      {
        title: "Pinia Store Typing Patterns",
        slug: "3-pinia-store-typing-patterns",
        number: 3,
        downloadUrl: "https://vueschool.io/lessons/pinia-store-typing-patterns",
        sourceUrl:
          "https://github.com/vueschool/typescript-vue3-course/tree/main/lesson-9",
        videoId: "jkl901mno23",
        text: "Master TypeScript integration with Pinia.",
        chapterId: chapter3.id,
      },
    ],
  });

  // Chapter 4
  const chapter4 = await prisma.chapter.create({
    data: {
      title: "Chapter 4",
      slug: "4-chapter-4",
      number: 4,
      courseId: course.id,
    },
  });

  await prisma.lesson.createMany({
    data: [
      {
        title: "TypeScript Utility Types in Vue",
        slug: "4-typescript-utility-types-in-vue",
        number: 1,
        downloadUrl:
          "https://vueschool.io/lessons/typescript-utility-types-in-vue",
        sourceUrl:
          "https://github.com/vueschool/typescript-vue3-course/tree/main/lesson-10",
        videoId: "nop456pqr78",
        text: "Learn how to use TypeScript's built-in utility types.",
        chapterId: chapter4.id,
      },
      {
        title: "Testing Vue Components with TypeScript",
        slug: "4-testing-vue-components-with-typescript",
        number: 2,
        downloadUrl:
          "https://vueschool.io/lessons/testing-vue-components-with-typescript",
        sourceUrl:
          "https://github.com/vueschool/typescript-vue3-course/tree/main/lesson-11",
        videoId: "stu901vwx23",
        text: "Write type-safe tests for your Vue.js 3 components.",
        chapterId: chapter4.id,
      },
      {
        title: "Performance Optimization with TypeScript",
        slug: "4-performance-optimization-with-typescript",
        number: 3,
        downloadUrl:
          "https://vueschool.io/lessons/performance-optimization-with-typescript",
        sourceUrl:
          "https://github.com/vueschool/typescript-vue3-course/tree/main/lesson-12",
        videoId: "yzab45cde67",
        text: "Optimize your Vue.js 3 application performance.",
        chapterId: chapter4.id,
      },
    ],
  });

  console.log("Seed completed successfully!");
}

try {
  await seed();
  await prisma.$disconnect();
} catch (e) {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
}
