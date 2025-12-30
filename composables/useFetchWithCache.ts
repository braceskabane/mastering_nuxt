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
    console.log(`📡 Fetching data from ${url}...`);
    const { data, error, pending } = await useFetch<T>(url, {
      headers: useRequestHeaders(["cookie"]),
    });

    if (error.value) {
      console.error(`❌ Fetch error for ${url}:`, error.value);
      throw createError({
        ...error.value,
        statusMessage: `Could not fetch data from ${url}`,
      });
    }

    if (!data.value) {
      console.error(`❌ No data returned from ${url}`);
      throw createError({
        statusCode: 500,
        statusMessage: `No data returned from ${url}`,
      });
    }

    console.log(`✅ Data fetched and cached for ${url}`);
    cached.value = data.value as T;
  } else {
    console.log(`✅ Getting data for ${url} from session storage cache`);
  }

  return cached.value;
};
