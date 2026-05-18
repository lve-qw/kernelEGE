import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0',        // Слушать все сетевые интерфейсы
    port: 5173,             // Явно указать порт
    proxy: {
      '/api': {
        target: 'http://192.168.1.24:8000', // Адрес бэкенда на Raspberry
        changeOrigin: true,
        secure: false
      }
    }
  },
  // Важно: чтобы фронтенд знал, куда делать запросы в production
  define: {
    'import.meta.env.VITE_API_BASE': JSON.stringify('http://192.168.1.24:8000/api/v1')
  }
})
