import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
// https://vitejs.dev/config/
const baseConfig = {
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/index.scss";',
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
      port: 3000,
      host: "0.0.0.0",
      open: false,
      proxy: {
        "/api": {
          target: "http://localhost:3000",
          changeOrigin: true,
          rewrite: (path) => path.replace("/api", "api"),
        },
      },
    },
  },
  default: baseConfig,
};

export default defineConfig(({ mode='default' }) => {
  const extendConfig = actions[mode] ? actions[mode] : actions["development"];
  return { ...baseConfig, ...extendConfig };
});
