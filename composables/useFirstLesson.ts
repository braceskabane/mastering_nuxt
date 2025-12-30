// export default () => {
//   const { chapters } = useCourse();
//   return chapters[0].lessons[0];
// };

import type { LessonOutline } from "~/server/api/course/meta.get";

export default async (): Promise<LessonOutline | null> => {
  try {
    const course = await useCourse();

    console.log("📚 Course data received:", course);

    if (!course) {
      console.error("❌ Course data not available");
      return null;
    }

    if (!course.chapters || course.chapters.length === 0) {
      console.error("❌ No chapters found");
      return null;
    }

    const firstChapter = course.chapters[0];
    if (!firstChapter.lessons || firstChapter.lessons.length === 0) {
      console.error("❌ No lessons in first chapter");
      return null;
    }

    const firstLesson = firstChapter.lessons[0];
    console.log("✅ First lesson found:", firstLesson);

    return firstLesson;
  } catch (error) {
    console.error("❌ Error in useFirstLesson:", error);
    throw error;
  }
};
