import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import * as path from "path";

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  const isProd = mode === "production" && !(process.env.VITE_GH_PAGES === "FALSE");

  return defineConfig({
    plugins: [react()],
    server: {
      port: 8080,
    },
    resolve: {
      alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
    },
    build: {
      outDir: "build",
    },
    base: isProd ? "/mz-event-screen/" : "/",
  });
};
