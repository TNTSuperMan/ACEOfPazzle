import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  base: './',
  build: {
    modulePreload: false,
    outDir: 'dist/html',
    assetsDir: '.'
  },
  server: {
    fs: {
      allow: ["../../bge-wasm/pkg", "."]
    }
  }
})
