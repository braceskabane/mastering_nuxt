import { StorageSerializers } from "@vueuse/core";
import type { LessonWithPath } from "~/types/course";

export default async (chapterSlug: string, lessonSlug: string) =>
  useFetchWithCache<LessonWithPath>(
    "/api/course/chapter/" + chapterSlug + "/lesson/" + lessonSlug
  );

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
