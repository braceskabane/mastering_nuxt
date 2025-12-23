// File ini sudah dipindahkan ke:
// /api/course/chapter/[chapterSlug]/lesson/[lessonSlug].ts

export default defineEventHandler((event) => {
  throw createError({
    statusCode: 410,
    message:
      "Endpoint has moved to /api/course/chapter/[chapterSlug]/lesson/[lessonSlug]",
  });
});
