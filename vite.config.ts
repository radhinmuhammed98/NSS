import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import { imagetools } from "vite-imagetools";
import path from "path";

export default defineConfig({
  plugins: [
    TanStackRouterVite({ target: "react", autoCodeSplitting: true }),
    react(),
    imagetools(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    modulePreload: false,
    // Inline tiny assets directly into JS/CSS to save round-trips
    assetsInlineLimit: 4096,
    // Produce smaller, faster-parsed chunks
    target: "es2020",
    cssMinify: true,
    rollupOptions: {
      output: {
        // Vendor chunk splitting — keeps app JS small and enables long-lived caching
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("@tanstack")) return "tanstack";
            if (id.includes("react") || id.includes("scheduler")) return "react-vendor";
            if (id.includes("lucide")) return "icons";
          }
        },
        // Stable chunk names for better CDN caching
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",
      },
    },
  },
});
