<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="text-center">
      <h2 class="text-2xl font-bold mb-4">Processing login...</h2>
      <p class="text-gray-600">
        Please wait while we complete your authentication.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const supabase = useSupabaseClient();

onMounted(async () => {
  try {
    // Parse tokens from URL hash
    const hashParams = window.location.hash.substring(1);
    const params = new URLSearchParams(hashParams);
    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");

    if (accessToken && refreshToken) {
      // Set session with tokens from OAuth callback
      const { data, error } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });

      if (error) {
        console.error("❌ Auth error:", error.message);
        await router.push("/login");
        return;
      }

      if (data.session) {
        console.log("✅ Session established:", data.session.user.email);
        console.log("👤 User metadata:", data.session.user.user_metadata);

        // Redirect to index page
        await router.push("/");
      } else {
        console.log("⚠️ No session created");
        await router.push("/login");
      }
    } else {
      console.log("⚠️ No tokens found in URL");
      await router.push("/login");
    }
  } catch (error) {
    console.error("❌ Callback error:", error);
    await router.push("/login");
  }
});
</script>
