import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [preact()],
  server: {
    fs: {
      allow: ["../../ACEGame/bge-wasm/pkg", "../dist", "."]
    },
    port: 4000
  }
})
