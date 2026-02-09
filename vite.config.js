import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  server: { port: 5173 },
  preview: { port: 4173 },
  root: ".",
  base: "./",
  resolve: {
    alias: {
      vue: "vue/dist/vue.esm-bundler.js",
    },
  },
  define: {
    __VUE_OPTIONS_API__: true,
    __VUE_PROD_DEVTOOLS__: false,
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
  },
});
