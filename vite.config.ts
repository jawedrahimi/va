import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const repoName = "VA"; // <-- change to your repo name

export default defineConfig({
  plugins: [react()],
  base: `/${repoName}/`,
});
