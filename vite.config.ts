import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from "@originjs/vite-plugin-federation";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'k3-ring',
      filename: 'remoteEntry.js',
      // Modules to expose
      exposes: {
          './Plugin': './src/Plugin.tsx',
      },
      shared: ['react','react-dom', "@react-three/drei", "@react-three/fiber", "three", "three-stdlib"]
  })
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  }
})
