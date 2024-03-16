import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import viteTsconfigPaths from "vite-tsconfig-paths"
import tailwindcss from "tailwindcss"

export default defineConfig({
  build: {
    outDir: "build"
  },
  css: {
    postcss: {
      plugins: [tailwindcss()]
    }
  },
  base: "/",
  plugins: [react(), viteTsconfigPaths()],
  server: {}
})
