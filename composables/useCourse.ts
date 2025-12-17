import courseData from './courseData.js';

export const useCourse = () => {
  return {
    ...courseData,
    chapters: courseData.chapters.map((chapter) => ({
      ...chapter,
      lessons: chapter.lessons.map((lesson) => ({
        ...lesson,
        path: `/course/${chapter.slug}/${lesson.slug}`,
      })),
    })),
  };
};
