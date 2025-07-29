// vite.config.ts

import { defineConfig } from "vite"; // Vite configuration helper
import react from "@vitejs/plugin-react"; // Enables React fast refresh and JSX support

// Export the Vite configuration
export default defineConfig({
  // Plugins used by Vite
  plugins: [react()],

  // Build-specific settings
  build: {
    rollupOptions: {
      output: {
        // Customize file naming for consistency and cache-friendliness
        entryFileNames: "assets/[name].js", // Output file for entry points
        chunkFileNames: "assets/[name].js", // Output file for shared code chunks
        assetFileNames: "assets/[name][extname]", // Output file for assets like CSS, SVGs, etc.
      },
    },
  },

  // SSR (Server-Side Rendering) settings
  ssr: {
    noExternal: true, // Bundle all node_modules to avoid ESM/CJS issues on edge runtimes like Cloudflare Workers
  },
});
