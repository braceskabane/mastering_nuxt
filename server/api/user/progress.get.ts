import { PrismaClient } from "@prisma/client";
import protectRoute from "~/server/utils/protectRoute";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  protectRoute(event);

  const {
    user: { email: userEmail },
  } = event.context;

  console.log("📊 Fetching progress for user:", userEmail);

  // Fetch all lesson progress for this user with lesson and chapter info
  const progressRecords = await prisma.lessonProgress.findMany({
    where: {
      userEmail,
    },
    include: {
      Lesson: {
        include: {
          Chapter: true,
        },
      },
    },
  });

  console.log("📋 Progress records found:", progressRecords.length);

  // Transform into nested structure: { chapterSlug: { lessonSlug: completed } }
  const progress: Record<string, Record<string, boolean>> = {};

  for (const record of progressRecords) {
    const chapterSlug = record.Lesson?.Chapter?.slug;
    const lessonSlug = record.Lesson?.slug;

    if (chapterSlug && lessonSlug) {
      if (!progress[chapterSlug]) {
        progress[chapterSlug] = {};
      }
      progress[chapterSlug][lessonSlug] = record.completed;
    }
  }

  console.log(
    "✅ Progress transformed:",
    Object.keys(progress).length,
    "chapters"
  );

  return progress;
});
