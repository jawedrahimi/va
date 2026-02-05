import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const repoName = "va"; // ✅ must match your GitHub repo name exactly

export default defineConfig({
  plugins: [react()],
  base: `/${va}/`,
});
