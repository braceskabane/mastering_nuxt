<template>
  <div v-if="user" class="rounded p-3 flex items-center space-x-3 bg-white">
    <img
      class="rounded-full w-12 h-12 border-2 border-blue-400"
      :src="profile"
    />
    <div class="text-right">
      <div class="font-medium">{{ name }}</div>
      <button class="text-sm underline text-slate-500">Log Out</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const user = useSupabaseUser();

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
</script>
