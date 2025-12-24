-- Seed data for Course, Chapter, and Lesson tables

-- Insert Course
INSERT INTO "Course" (title, "createdAt", "updatedAt") 
VALUES ('Mastering TypeScript with Vue 3', NOW(), NOW());

-- Get the course ID (should be 1 if this is the first insert)
-- Insert Chapters
INSERT INTO "Chapter" (title, slug, number, "courseId", "createdAt", "updatedAt") 
VALUES 
  ('Chapter 1: Introduction to TypeScript with Vue 3', '1-chapter-1', 1, 1, NOW(), NOW()),
  ('Chapter 2: Setting Up TypeScript', '2-chapter-2', 2, 1, NOW(), NOW()),
  ('Chapter 3: Advanced TypeScript', '3-chapter-3', 3, 1, NOW(), NOW()),
  ('Chapter 4: Building Production Apps', '4-chapter-4', 4, 1, NOW(), NOW());

-- Insert Lessons for Chapter 1
INSERT INTO "Lesson" (title, slug, number, "videoId", "downloadUrl", text, "sourceUrl", "chapterId", "createdAt", "updatedAt") 
VALUES 
  (
    'Introduction to TypeScript with Vue 3', 
    '1-introduction-to-typescript-with-vue-js-3', 
    1, 
    'dqdsIhyadKs',
    'https://vueschool.io/lessons/introduction-to-typescript-with-vue-js-3',
    'Learn the basics of TypeScript with Vue 3. This lesson covers the fundamentals of using TypeScript in Vue 3 applications.',
    'https://github.com/vueschool/typescript-fundamentals',
    1,
    NOW(), 
    NOW()
  );

-- Insert Lessons for Chapter 2
INSERT INTO "Lesson" (title, slug, number, "videoId", "downloadUrl", text, "sourceUrl", "chapterId", "createdAt", "updatedAt") 
VALUES 
  (
    'Setting Up TypeScript', 
    '2-setting-up-typescript', 
    1,
    'EP5qKzXnCkc',
    'https://vueschool.io/lessons/setting-up-typescript',
    'Setup TypeScript in your Nuxt 3 project. Configure tsconfig and learn best practices.',
    'https://github.com/vueschool/typescript-fundamentals',
    2,
    NOW(), 
    NOW()
  ),
  (
    'TypeScript Configuration', 
    '2-typescript-configuration', 
    2,
    'EP5qKzXnCkd',
    'https://vueschool.io/lessons/typescript-configuration',
    'Configure TypeScript for your needs. Deep dive into tsconfig options.',
    'https://github.com/vueschool/typescript-fundamentals',
    2,
    NOW(), 
    NOW()
  );

-- Insert Lessons for Chapter 3
INSERT INTO "Lesson" (title, slug, number, "videoId", "downloadUrl", text, "sourceUrl", "chapterId", "createdAt", "updatedAt") 
VALUES 
  (
    'Generics and Types', 
    '3-generics-and-types', 
    1,
    'EP5qKzXnCke',
    'https://vueschool.io/lessons/generics-and-types',
    'Master generics in TypeScript. Learn advanced type system features.',
    'https://github.com/vueschool/typescript-fundamentals',
    3,
    NOW(), 
    NOW()
  ),
  (
    'Advanced Type Patterns', 
    '3-advanced-type-patterns', 
    2,
    'EP5qKzXnCkf',
    'https://vueschool.io/lessons/advanced-type-patterns',
    'Explore advanced TypeScript type patterns and utilities.',
    'https://github.com/vueschool/typescript-fundamentals',
    3,
    NOW(), 
    NOW()
  );

-- Insert Lessons for Chapter 4
INSERT INTO "Lesson" (title, slug, number, "videoId", "downloadUrl", text, "sourceUrl", "chapterId", "createdAt", "updatedAt") 
VALUES 
  (
    'Building Production Apps', 
    '4-building-production-apps', 
    1,
    'EP5qKzXnCkg',
    'https://vueschool.io/lessons/building-production-apps',
    'Learn how to build production-ready applications with TypeScript and Nuxt 3.',
    'https://github.com/vueschool/typescript-fundamentals',
    4,
    NOW(), 
    NOW()
  ),
  (
    'Deployment Best Practices', 
    '4-deployment-best-practices', 
    2,
    'EP5qKzXnCkh',
    'https://vueschool.io/lessons/deployment-best-practices',
    'Master deployment strategies for TypeScript Nuxt 3 applications.',
    'https://github.com/vueschool/typescript-fundamentals',
    4,
    NOW(), 
    NOW()
  );

-- Verify data
SELECT 'Course' as table_name, COUNT(*) as count FROM "Course"
UNION ALL
SELECT 'Chapter', COUNT(*) FROM "Chapter"
UNION ALL
SELECT 'Lesson', COUNT(*) FROM "Lesson";
