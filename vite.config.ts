import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import pages from "vite-plugin-pages";
// https://vitejs.dev/config/
const baseConfig = {
  plugins: [react()],
  server: {
    port: 3000,
    host: "0.0.0.0",
    open: false,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData: "@import @/styles/global.scss;",
      },
    },
  },
};
const actions = {
  production: {
    build: {
      outDir: "production",
    },
    base: "./",
  },
  development: {
    server: {
      proxy: {
        "/api": {
          target: "http://localhost:3000",
          changeOrigin: true,
          rewrite: (path) => path.replace("/api", "api"),
        },
      },
    },
  },
  mock: {
    plugins: [pages()],
  },
  default: baseConfig,
};
export default defineConfig(({ mode = "default" }) => {
  const extendConfig = actions[mode] ? actions[mode] : actions["development"];
  return mergeObjects(baseConfig, extendConfig);
});
function mergeObjects(obj1, obj2) {
  const result = { ...obj1 };
  for (const key in obj2) {
    if (Object.prototype.hasOwnProperty.call(obj2, key)) {
      if (Array.isArray(obj2[key]) && Array.isArray(obj1[key])) {
        result[key] = obj1[key].concat(obj2[key]);
      } else if (
        typeof obj2[key] === "object" &&
        Object.prototype.hasOwnProperty.call(obj1, key)
      ) {
        result[key] = mergeObjects(obj1[key], obj2[key]);
      } else {
        result[key] = obj2[key];
      }
    }
  }
  return result;
}
