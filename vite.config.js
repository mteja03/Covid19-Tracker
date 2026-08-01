import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Emit into "build" so the existing firebase.json hosting config keeps working.
  build: {
    outDir: "build",
  },
});
