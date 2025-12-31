import vsharp from "vite-plugin-vsharp";

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
  vite: {
    plugins: [vsharp()],
  },
  css: ["~/assets/css/main.css"],
  runtimeConfig: {
    // Server-side only (build time)
    stripeSecret: process.env.STRIPE_SECRET_KEY,
    stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    // Public (exposed to client)
    public: {
      supabase: {
        url: process.env.SUPABASE_URL,
        key: process.env.SUPABASE_KEY,
      },
      stripeKey: process.env.STRIPE_PUBLIC_KEY,
    },
  },
  // Route rules untuk caching dan pre-rendering
  routeRules: {
    // Pre-render landing page
    "/landing": { prerender: true, cache: { maxAge: 60 * 60 * 24 } }, // 24 hours
    // Cache public pages
    "/": { cache: { maxAge: 60 * 60 } }, // 1 hour
    // No cache untuk protected routes
    "/course/**": { cache: false },
    "/auth/**": { cache: false },
    "/login": { cache: false },
  },
  nitro: {
    preset: "netlify",
    prerender: {
      crawlLinks: true,
      routes: ["/landing", "/sitemap.xml"],
      ignore: ["/admin"],
    },
  },
});
