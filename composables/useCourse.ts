import courseData from './courseData.js';

type Lesson = {
  title: string;
  slug: string;
  number: number;
  downloadUrl: string;
  videoId: string;
  text: string;
  sourceUrl: string;
  path: string;
};

type Chapter = {
  title: string;
  lessons: Lesson[];
  slug: string;
  number: number;
};

type Course = {
  title: string;
  chapters: Chapter[];
};

export const useCourse = (): Course => {
    const chapters: Chapter[] = courseData.chapters.map(
        (chapter) => {
            const lessons: Lesson[] = chapter.lessons.map(
                (lesson) => ({
                    ...lesson,
                    path: `/course/${chapter.slug}/${lesson.slug}`,
                })
            );
            return {
                ...chapter,
                lessons,
            };
        }
    );
    return {
      ...courseData,
      chapters,
    };
};
