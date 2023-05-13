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

export default defineConfig(({ mode }) => {
  if (mode === "production") {
    return {
      ...baseConfig,
      build: {
        outDir: "production",
      },
      base: "./",
    };
  } else {
    return {
      ...baseConfig,
      server: {
        port:3000,
        host:"0.0.0.0",
        open:false,
        proxy: {
          "/api": {
            target: "http://localhost:3000",
            changeOrigin: true,
            rewrite:(path)=>path.replace('/api','api')
          },
        },
      },
    };
  }
});
