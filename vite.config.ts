import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  server: {
    port: 5173,
    open: false,
    cors: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
    },
  },
  build: {
    target: "es2022",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        agent: resolve(__dirname, "agent.html"),
        mcpApp: resolve(__dirname, "mcp-app.html"),
      },
    },
  },
});
