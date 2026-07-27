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
        react: { singleton: true, requiredVersion: "19.1.1" },
        "react-dom": { singleton: true, requiredVersion: "19.1.1" },

        // REQUIRED as soon as the plugin calls a k3-plugin-api *runtime hook*
        // (useSetCameraPosition, useOpenInstance, useConfigurationVariable, …).
        // Those hooks read module-level state that the host populates via init();
        // a plugin bundling its own copy gets an uninitialised module and throws
        // "k3-plugin-api not initialized". Type-only imports do not need this.
        "k3-plugin-api": { singleton: true, requiredVersion: "^2.3.0" },

        "@mui/material": { singleton: true, requiredVersion: "^7.1.1" },
        "@mui/styled-engine": { singleton: true, requiredVersion: "^7.1.1" },

        "@emotion/react": { singleton: true, requiredVersion: "^11.10.0" },
        "@emotion/styled": { singleton: true, requiredVersion: "^11.10.5" },
        "@emotion/cache": { singleton: true, requiredVersion: "^11.14.0" },

        "@react-three/drei": { singleton: true, requiredVersion: "^10.1.2" },
        "@react-three/fiber": { singleton: true, requiredVersion: "^9.1.2" },
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
