// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   // server: {
//   //   host: "0.0.0.0",
//   //   port: "8002",
//   // },
  
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
//import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [
    react(),
    //tailwindcss(),
  ],

  // DEV SERVER (npm run dev)
  server: {
    host: '0.0.0.0',
    port: 5174,
    strictPort: true,
  },

  // PREVIEW SERVER (npm run preview)
  preview: {
    host: '0.0.0.0',
    port: 5174,
    allowedHosts: [
      'dashboard.koumanisdietapp.com',
      'www.dashboard.koumanisdietapp.com',
    ],
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: [
      '.mjs',
      '.js',
      '.mts',
      '.ts',
      '.jsx',
      '.tsx',
      '.json',
    ],
  },
})
