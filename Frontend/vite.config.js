import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
server: {
  proxy: {
    "/api": {
      target: "https://project-management-system-murex.vercel.app/",
      changeOrigin: true,
      secure: true,
    },
  },
},

  plugins: [react()],
});
