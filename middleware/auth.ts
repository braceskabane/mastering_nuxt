export default defineNuxtRouteMiddleware(async (to) => {
  const user = useSupabaseUser();

  // Allow access to public routes - don't protect these
  const publicRoutes = ["/", "/landing", "/login", "/auth/callback"];
  if (
    publicRoutes.includes(to.path) ||
    to.path.startsWith("/linkWithPurchase")
  ) {
    return;
  }

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
    const response = await $fetch<{ hasAccess: boolean }>(
      "/api/user/hasAccess",
      {
        headers: useRequestHeaders(["cookie"]),
      }
    );

    if (response?.hasAccess) {
      return;
    }

    // User is logged in but doesn't have access (not verified/paid)
    // Redirect to login to complete payment flow
    console.log(
      "User not verified, redirecting to login for payment"
    );
    return navigateTo(`/login?redirectTo=${to.path}`);
  } catch (error) {
    console.error("Access check failed:", error);
    // On error, allow access (better UX than blocking)
    // User will see content but might not be able to progress
    console.warn("Allowing access despite error:", error);
    return;
  }
});
