import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    reporters: ["verbose"],
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/__test__/setupTest.js",
    css: true,
  },
});
