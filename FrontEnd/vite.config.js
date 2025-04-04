import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    react(),
    // visualizer({ open: true }) // opens bundle report after build
  ],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          vendor: ['axios'],
        },
      },
    },
  },
})
