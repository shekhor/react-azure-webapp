import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// 
// Environment Variables:
// - Vite automatically exposes variables prefixed with VITE_ to the client
// - For local development, create a .env.local file with VITE_API_URL
// - For Azure App Service, set VITE_API_URL in Configuration > Application Settings
// - Environment variables are injected at build time
export default defineConfig({
  plugins: [react()],
})


