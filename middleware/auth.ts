export default defineNuxtRouteMiddleware(async (to) => {
  const user = useSupabaseUser();

  // Allow access to free chapters
  if (to.params.chapterSlug === "1-chapter-1") {
    return;
  }

  // If not logged in, redirect to login
  if (!user.value) {
    return navigateTo(`/login?redirectTo=${to.path}`);
  }

  try {
    // Check if user has access to the course
    const response = await $fetch<{ hasAccess: boolean }>("/api/user/hasAccess", {
      headers: useRequestHeaders(["cookie"]),
    });

    if (response?.hasAccess) {
      return;
    }

    // User is logged in but doesn't have access
    // Redirect to login to start payment flow
    return navigateTo(`/login?redirectTo=${to.path}`);
  } catch (error) {
    console.error("Access check failed:", error);
    // On error, deny access and redirect to login
    return navigateTo(`/login?redirectTo=${to.path}`);
  }
});
