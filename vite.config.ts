import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";
import { copyFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const OUT_DIR = fileURLToPath(new URL("./dist", import.meta.url));

function githubPagesOutput(): Plugin {
  return {
    name: "github-pages-output",
    apply: "build",
    closeBundle() {
      copyFileSync(resolve(OUT_DIR, "index.html"), resolve(OUT_DIR, "404.html"));
      writeFileSync(resolve(OUT_DIR, ".nojekyll"), "");
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), githubPagesOutput()],
  base: "/",
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
});
