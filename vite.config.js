import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// index.html reads %VITE_GA_ID%; default it to empty so builds without
// analytics don't warn. Set VITE_GA_ID in the environment to enable GA4.
process.env.VITE_GA_ID ??= ''

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
