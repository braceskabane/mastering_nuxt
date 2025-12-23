export type Lesson = {
  title: string;
  slug: string;
  number: number;
  downloadUrl: string;
  videoId: string;
  text: string;
  sourceUrl: string;
};

export type LessonWithPath = Lesson & {
  path: string;
};

export type Chapter = {
  title: string;
  lessons: Lesson[] | LessonWithPath[];
  slug: string;
  number: number;
};

export type Course = {
  title: string;
  chapters: Chapter[];
};
