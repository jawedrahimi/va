import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => ({
  plugins: [react()],
  // ✅ localhost uses "/", build for GitHub Pages uses "/va/"
  base: command === "build" ? "/va/" : "/",
}));
