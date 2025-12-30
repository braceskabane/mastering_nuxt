// export default defineNuxtRouteMiddleware(async (to, from) => {
//   const supabase = useSupabaseClient();

//   // Check session directly (synchronous check from localStorage)
//   const {
//     data: { session },
//   } = await supabase.auth.getSession();

//   // Allow access if:
//   // 1. User has valid session (logged in)
//   // 2. OR accessing chapter 1 (free chapter)
//   // 3. OR in development mode (disable auth for testing)
//   if (session?.user || to.params.chapterSlug === "1-chapter-1" || process.dev) {
//     return;
//   }

//   // Setelah user login di halaman /login, mereka akan otomatis di-redirect ke halaman yang sebelumnya mereka coba akses!
//   return navigateTo(`/login?redirectTo=${to.path}`);
// });
export default defineNuxtRouteMiddleware((to, from) => {
  const user = useSupabaseUser();
  if (user.value || to.params.chapterSlug === "1-chapter-1-introduction") {
    return;
  }
  return navigateTo(`/login?redirectTo=${to.path}`);
});
