import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Enable client-side routing fallback in development
    historyApiFallback: true,
  },
  preview: {
    // Enable client-side routing fallback in preview mode
    historyApiFallback: true,
  },
})
