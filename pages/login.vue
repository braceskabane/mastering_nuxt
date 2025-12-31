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
  // Store the original redirect path in sessionStorage
  const originalRedirect = query.redirectTo as string;
  if (originalRedirect) {
    sessionStorage.setItem("authRedirectTo", originalRedirect);
  }

  // Always redirect to auth/callback after GitHub OAuth completes
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  if (error) {
    console.error("OAuth login error:", error);
  }
};
</script>
