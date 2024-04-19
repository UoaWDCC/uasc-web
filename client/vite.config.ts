import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import svgr from "vite-plugin-svgr"
import viteTsconfigPaths from "vite-tsconfig-paths"
import tailwindcss from "tailwindcss"
import { resolve } from "path"

export default defineConfig({
  build: {
    outDir: "build"
  },
  css: {
    postcss: {
      plugins: [tailwindcss()]
    }
  },
  resolve: {
    alias: {
      $assets: resolve("./src/assets")
    }
  },
  base: "/",
  plugins: [react(), viteTsconfigPaths(), svgr()],
  server: {}
})
