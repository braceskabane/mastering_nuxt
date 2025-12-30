// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    ["@nuxtjs/supabase", { redirect: false }],
    "@pinia/nuxt",
  ],
  css: ["~/assets/css/main.css"],
  nitro: {
    preset: "netlify",
  },
});
