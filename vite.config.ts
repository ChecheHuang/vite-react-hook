import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
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
          additionalData: '@import "./src/styles/sassConfig.scss";',
        },
      },
    },
  };
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
