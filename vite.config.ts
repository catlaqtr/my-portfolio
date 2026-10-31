import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        // Phaser ships as one prebuilt bundle. Keeping it in its own chunk means
        // game-code updates don't invalidate visitors' cached copy of the engine.
        manualChunks: { phaser: ["phaser"] },
      },
    },
    // The Phaser chunk is ~1.7 MB (~380 KB gzip) and only loads on /play.
    chunkSizeWarningLimit: 1750,
  },
});
