import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "k3-ring",
      filename: "remoteEntry.js",
      exposes: {
        "./Plugin": "./src/Plugin.tsx",
      },
      shared: {
        // Only share what the k3-app host actually exposes in its shared list.
        // Packages not provided by the host must be bundled directly to avoid
        // `loadShare` returning `false` → "factory is not a function".
        react: { singleton: true, requiredVersion: "19.1.1" },
        "react-dom": { singleton: true, requiredVersion: "19.1.1" },

        "@react-three/drei": { singleton: true, requiredVersion: "^10.1.2" },
        "@react-three/fiber": { singleton: true, requiredVersion: "^9.1.2" },
        "@react-three/postprocessing": {
          singleton: true,
          requiredVersion: "^3.0.4",
        },
        three: { singleton: true, requiredVersion: "^0.177.0" },
      },
    }),
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
