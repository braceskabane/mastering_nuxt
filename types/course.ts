import type { Lesson } from "@prisma/client";

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

type OutlineBase = {
  title: string;
  slug: string;
  number: number;
};

export type OutlineChapter = OutlineBase & {
  lessons: OutlineLesson[];
};

export type OutlineLesson = OutlineBase & {
  path: string;
};

export type CourseMeta = {
  title: string;
  chapters: OutlineChapter[];
};

export type CourseProgress = {
  [chapterSlug: string]: {
    [lessonSlug: string]: boolean;
  };
};
