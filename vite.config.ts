import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: {
        index: resolve(import.meta.dirname, "src/index.js"),
      },
      formats: ["es"],
    },
    // rollupOptions: {
    //   external: /@strudel\/.+/,
    // },
    sourcemap: true,
  },
});
