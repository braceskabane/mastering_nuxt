import { PrismaClient } from "../server/utils/prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding...");

  // Create Course
  const course = await prisma.course.create({
    data: {
      title: "Mastering TypeScript with Vue 3",
      chapters: {
        create: [
          {
            title: "Chapter 1: Introduction to TypeScript with Vue 3",
            slug: "1-chapter-1",
            number: 1,
            lessons: {
              create: [
                {
                  title: "Introduction to TypeScript with Vue 3",
                  slug: "1-introduction-to-typescript-with-vue-js-3",
                  number: 1,
                  videoId: "video-1",
                  downloadUrl: "https://example.com/lesson-1.pdf",
                  text: "Learn the basics of TypeScript with Vue 3...",
                  sourceUrl: "https://github.com/example/lesson-1",
                },
              ],
            },
          },
          {
            title: "Chapter 2: Setting Up TypeScript",
            slug: "2-chapter-2",
            number: 2,
            lessons: {
              create: [
                {
                  title: "Setting Up TypeScript",
                  slug: "2-setting-up-typescript",
                  number: 1,
                  videoId: "video-2",
                  downloadUrl: "https://example.com/lesson-2.pdf",
                  text: "Setup TypeScript in your project...",
                  sourceUrl: "https://github.com/example/lesson-2",
                },
                {
                  title: "TypeScript Configuration",
                  slug: "2-typescript-configuration",
                  number: 2,
                  videoId: "video-3",
                  downloadUrl: "https://example.com/lesson-3.pdf",
                  text: "Configure TypeScript for your needs...",
                  sourceUrl: "https://github.com/example/lesson-3",
                },
              ],
            },
          },
          {
            title: "Chapter 3: Advanced TypeScript",
            slug: "3-chapter-3",
            number: 3,
            lessons: {
              create: [
                {
                  title: "Generics and Types",
                  slug: "3-generics-and-types",
                  number: 1,
                  videoId: "video-4",
                  downloadUrl: "https://example.com/lesson-4.pdf",
                  text: "Master generics in TypeScript...",
                  sourceUrl: "https://github.com/example/lesson-4",
                },
              ],
            },
          },
        ],
      },
    },
  });

  console.log("Seeding finished.", course);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
