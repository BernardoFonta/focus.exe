import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    // Adicione esta configuração para o react-grid-layout funcionar no Vite
    'process.env': {}
  }
})