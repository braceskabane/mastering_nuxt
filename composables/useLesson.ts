import type { LessonWithPath } from "~/types/course";

// export default async (chapterSlug: string, lessonSlug: string) => {
//   return useFetchWithCache<LessonWithPath>(
//     "/api/course/chapter/" + chapterSlug + "/lesson/" + lessonSlug
//   );
// };

export default async (chapterSlug: string, lessonSlug: string) => {
  // Lesson data is DYNAMIC (changes per route), so we use direct fetch without caching
  console.log(`📖 Fetching lesson: ${chapterSlug}/${lessonSlug}...`);

  const url = `/api/course/chapter/${chapterSlug}/lesson/${lessonSlug}`;
  const { data, error } = await useFetch<LessonWithPath>(url, {
    headers: useRequestHeaders(["cookie"]),
  });

  if (error.value) {
    console.error(`❌ Fetch error for lesson:`, error.value);
    throw createError({
      ...error.value,
      statusMessage: `Could not fetch lesson ${lessonSlug} in chapter ${chapterSlug}`,
    });
  }

  if (!data.value) {
    console.error(`❌ No lesson data returned`);
    throw createError({
      statusCode: 500,
      statusMessage: `No data returned for lesson ${lessonSlug}`,
    });
  }

  console.log(`✅ Lesson fetched:`, data.value.title);
  return data.value;
};

//   const { data, error } = await useFetch(
//     `/api/course/chapter/${chapterSlug}/lesson/${lessonSlug}`
//   );

//   const { data, error } = await useAsyncData(() =>
//     $fetch(`/api/course/chapter/${chapterSlug}/lesson/${lessonSlug}`)
//   );

//   if (error.value) {
//     throw createError({
//       ...error.value,
//       statusMessage: `Could not fetch lesson ${lessonSlug} in chapter ${chapterSlug}`,
//     });
//   }

//   if (!lesson.value) {
//     const { data, error, pending } = await useLazyFetch<LessonWithPath>(url, {
//       //   pick: ["title", "number"], // semua field lain dibuang ini bukan error tapi data kosong
//       //   lazy: true,
//     });
//     if (error.value) {
//       throw createError({
//         ...error.value,
//         statusMessage: `Could not fetch lesson ${lessonSlug} in chapter ${chapterSlug}`,
//       });
//     }
//     lesson.value = data.value;
//   } else {
//     console.log(
//       `Getting lesson ${lessonSlug} in chapter ${chapterSlug} from session storage`
//     );
//   }

//   return lesson;
// };
