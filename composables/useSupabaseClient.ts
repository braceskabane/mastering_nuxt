// composables/useSupabaseClient.ts
import { createClient } from "@supabase/supabase-js";

export const useSupabaseClient = () => {
  const config = useRuntimeConfig();

  const supabaseUrl = config.public.supabaseUrl;
  const supabaseKey = config.public.supabaseKey;

  // Pastikan URL dan Key Supabase tersedia
  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase URL or Key is missing in configuration");
  }

  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
      // storage: Gunakan localStorage browser untuk menyimpan sesi
      // autoRefreshToken: Otomatis refresh token saat hampir expired
      // persistSession: Pertahankan sesi meski browser ditutup
      storage: typeof window !== "undefined" ? window.localStorage : undefined,
      autoRefreshToken: true,
      persistSession: true,
    },
  });

  return supabase;
};
