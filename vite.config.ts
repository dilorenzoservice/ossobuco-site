import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
    hmr: { overlay: false },
  },
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
    dedupe: ["react", "react-dom", "react/jsx-runtime"],
  },
  build: {
    target: "esnext",
    minify: "esbuild",
    cssMinify: true,
    cssCodeSplit: true,
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        manualChunks: {
          // react-router-dom separato: cambia meno spesso di react core
          "react-vendor": ["react", "react-dom"],
          "router": ["react-router-dom"],
          "framer": ["framer-motion"],
          "ui": ["lucide-react"],
        },
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]",
      },
    },
    chunkSizeWarningLimit: 700,
    assetsInlineLimit: 4096,
  },
  optimizeDeps: {
    include: ["react", "react-dom", "framer-motion"],
  },
}));
