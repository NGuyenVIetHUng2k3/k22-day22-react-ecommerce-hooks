import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/k22-day22-react-ecommerce-hooks/',
  plugins: [react(), tailwindcss()],
})
