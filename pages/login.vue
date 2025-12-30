<template>
  <div class="prose w-full max-w-2xl h-9">
    <h1>Log in to {{ course?.title || "Course" }}</h1>
    <button
      class="bg-blue-500 text-white font-bold py-2 px-4 rounded"
      @click="login"
    >
      Log in with Github
    </button>
  </div>
</template>

<script setup lang="ts">
let course;
try {
  course = await useCourse();
} catch (error) {
  console.error("Error fetching course:", error);
  course = null;
}
const { query } = useRoute();
const supabase = useSupabaseClient();
const user = useSupabaseUser();

watchEffect(async () => {
  if (user.value) {
    const redirectPath = (query.redirectTo as string) || "/";
    await navigateTo(redirectPath, {
      replace: true,
    });
  }
});

const login = async () => {
  // OAuth redirect ke callback (bukan ke redirectTo langsung)
  // const { data, error } = await supabase.auth.signInWithOAuth({
  //   provider: "github",
  //   options: {
  //     redirectTo: `${window.location.origin}/auth/callback`,
  //   },
  // });

  // if (error) {
  //   console.error("Error during login:", error.message);
  // } else {
  //   console.log("Login initiated:", data);
  // }
  const redirectTo = query.redirectTo
    ? `${window.location.origin}/login?redirectTo=${query.redirectTo}`
    : window.location.origin;

  const { error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo,
    },
  });

  if (error) {
    console.error(error);
  }
};
</script>
