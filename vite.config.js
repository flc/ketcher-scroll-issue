import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { manualChunksPlugin } from "vite-plugin-webpackchunkname"
import commonjs from "vite-plugin-commonjs"

export default defineConfig({
  define: {
    "process.env": {},
    global: "global",
  },
  build: {
    outDir: "build",
    rollupOptions: {
      output: {
        sourcemap: false,
        manualChunks: (id) => {
          if (id.includes("node_modules") && id.includes("ketcher")) return "ketcher"
          if (id.includes("node_modules") && id.includes("miew")) return "miew"
          if (id.includes("node_modules")) return "vendor"
        },
      },
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
  optimizeDeps: {
    include: ["buffer", "process"],
  },
  plugins: [react(), manualChunksPlugin(), commonjs()],
  resolve: {
    mainFields: ["module", "main", "browser"],
  },
})
