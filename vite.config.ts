import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { imagetools } from "vite-imagetools";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";


export default defineConfig({
  cloudflare: false,
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts
    server: { entry: "server" },
  },
  vite: {
    plugins: [
      tanstackStart({
        server: { entry: "src/server.ts" },
      }),
      imagetools(),
    ],
  },
});

