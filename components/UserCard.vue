<template>
  <div v-if="user" class="rounded p-3 flex items-center space-x-3 bg-white">
    <img
      class="rounded-full w-12 h-12 border-2 border-blue-400"
      :src="profile"
    />
    <div class="text-right">
      <div class="font-medium">{{ name }}</div>
      <button
        @click="logout"
        class="text-sm underline text-slate-500 hover:text-red-600 transition"
      >
        Log Out
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const user = useSupabaseUser();
const supabase = useSupabaseClient();

const name = computed(() => {
  // GitHub OAuth provides: user_name, preferred_username
  // Not full_name
  return (
    user.value?.user_metadata?.user_name ||
    user.value?.user_metadata?.preferred_username ||
    user.value?.email?.split("@")[0] ||
    "User"
  );
});

const profile = computed(() => user.value?.user_metadata?.avatar_url);

const logout = async () => {
  try {
    console.log("🚪 Logging out...");

    // Sign out from Supabase (this will clear session from localStorage)
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("❌ Logout error:", error.message);
    } else {
      console.log("✅ Logged out successfully");
    }

    try {
      await $fetch("/api/_supabase/session", {
        method: "POST",
        body: { event: "SIGNED_OUT", session: null },
      });
      user.value = null;
    } catch (e) {
      console.error(error);
    }

    // Navigate to login page
    await navigateTo("/login");
  } catch (error) {
    console.error("❌ Logout failed:", error);
  }
};
</script>
