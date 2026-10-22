import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [
    tailwindcss(),
  ],
  build: {
    // The SSR bundle is only used by scripts/prerender.mjs and never served
    copyPublicDir: !isSsrBuild,
  },
}))
