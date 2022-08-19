/// <reference types="vitest"/>
/// <reference types="vite/client"/>

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react({
      include: "**/*.tsx",
    }),
  ],
  test: {
    globals: true,
    environment: `jsdom`,
    setupFiles: "./src/__test__/setup.tsx",
    coverage: {
      reporter: ["text", "json", "html"],
    },
  },
});
