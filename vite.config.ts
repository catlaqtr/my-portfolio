import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { siteSettings } from "./scripts/site.mjs"; // shared with scripts/prerender.mjs

const { siteUrl } = siteSettings();

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), tailwindcss()],
  define: {
    // The public site address for canonical / og:url tags ("" when unknown).
    __SITE_URL__: JSON.stringify(siteUrl),
  },
  build: {
    rollupOptions: {
      output: isSsrBuild
        ? {}
        : {
            // Phaser ships as one prebuilt bundle. Keeping it in its own chunk means
            // game-code updates don't invalidate visitors' cached copy of the engine.
            manualChunks: { phaser: ["phaser"] },
          },
    },
    // The Phaser chunk is ~1.7 MB (~380 KB gzip) and only loads on /play.
    chunkSizeWarningLimit: 1750,
  },
}));
