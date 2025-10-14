import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,       // позволяет доступ из контейнера
    watch: {
      usePolling: true, // принудительно проверяет изменения файлов
      interval: 100    // проверка каждые 100ms
    }
  }
})
