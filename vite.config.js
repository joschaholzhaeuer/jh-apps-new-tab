import { crx } from "@crxjs/vite-plugin";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import manifest from "./public/manifest.json";

export default defineConfig({
  plugins: [vue(), crx({ manifest })],
  build: {
    rollupOptions: {
      input: {
        newtab: "index.html",
      },
    },
    chunkSizeWarningLimit: 600, // Set limit to 600kb to avoid warnings for reasonable chunk sizes
  },
  server: {
    port: 5173,
    strictPort: true,
    hmr: {
      port: 5173,
    },
  },
});
