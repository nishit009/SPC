import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file from parent directory (one level up from frontend folder)
  const env = loadEnv(mode, path.resolve(__dirname, '..'), '');
  
  return {
    plugins: [react(), tailwindcss()],
    
    // Make env variables available to the app
    define: {
      'import.meta.env.VITE_GOOGLE_MAPS_API_KEY': JSON.stringify(env.VITE_GOOGLE_MAPS_API_KEY),
    },
  };
});