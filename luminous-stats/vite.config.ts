import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    // Only use componentTagger in development
    ...(mode === "development"
      ? [(await import("lovable-tagger")).componentTagger()]
      : [])
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    rollupOptions: {
      external: ["jspdf", "html2canvas"],
    },
  },
  base: "./", // ensures assets resolve correctly on Vercel
}));
