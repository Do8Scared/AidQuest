import { defineConfig } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./"),
      },
    },
    base: '/',
    build: {
      outDir: 'dist',
    }
  };
});