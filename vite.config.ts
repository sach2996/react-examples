import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  publicDir: "src/assets", // Point Vite's public folder to your assets
  build: {
    outDir: "dist", // Output to the dist folder as usual
    emptyOutDir: false, // Do not delete dist folder when building
  },
});
