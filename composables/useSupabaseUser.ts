// composables/useSupabaseUser.ts
import { ref, onMounted } from "vue";
import type { User } from "@supabase/supabase-js";

export const useSupabaseUser = () => {
  const user = ref<User | null>(null);
  const supabase = useSupabaseClient();

  const fetchUser = async () => {
    try {
      const {
        data: { user: authUser },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        console.error("❌ Auth error:", error.message);
        return;
      }

      user.value = authUser;
      console.log("✅ User fetched successfully:", authUser?.email);
      console.log("📊 User metadata:", authUser?.user_metadata);
    } catch (error) {
      console.error("❌ Fetch error:", error);
    }
  };

  // Call fetch immediately if on client
  fetchUser();

  // Also subscribe to auth state changes
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange(async (event, session) => {
    if (session?.user) {
      user.value = session.user;
      console.log("🔄 Auth state updated:", session.user.email);
    } else {
      user.value = null;
      console.log("❌ User signed out");
    }
  });

  // Cleanup on unmount
  onMounted(() => {
    return () => {
      subscription?.unsubscribe();
    };
  });

  return user;
};
