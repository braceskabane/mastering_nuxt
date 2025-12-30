import { StorageSerializers } from "@vueuse/core";

export default async <T>(url: string) => {
  //   const url = "/api/course/chapter/" + chapterSlug + "/lesson/" + lessonSlug;
  const cached = useSessionStorage<T>(url, null, {
    serializer: StorageSerializers.object,
  });

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

  if (!cached.value) {
    const { data, error, pending } = await useLazyFetch<T>(url, {
      headers: useRequestHeaders(["cookie"]),
    });
    if (error.value) {
      throw createError({
        ...error.value,
        statusMessage: `Could not fetch data from ${url}`,
      });
    }
    cached.value = data.value as T;
  } else {
    console.log(`Getting lesson data for ${url} from session storage cache`);
  }

  return cached;
};
