import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    ssr: "src/entry-server.tsx", // entry point for SSR
    outDir: "dist/server", // output to server folder
    rollupOptions: {
      output: {
        format: "esm", // required for Cloudflare Workers
        entryFileNames: `entry-server.js`,
      },
    },
    target: "esnext",
    minify: false,
  },
});
