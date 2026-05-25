import { defineConfig } from "vite-plus";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "url";

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true,
  },
  staged: {
    "*": "vp check --fix",
  },
  fmt: {},
  resolve: {
    alias: {
      // Alias @ to the src directory
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  lint: { options: { typeAware: true, typeCheck: true } },
  plugins: [react(), babel({ presets: [reactCompilerPreset()] }), tailwindcss()],
});
