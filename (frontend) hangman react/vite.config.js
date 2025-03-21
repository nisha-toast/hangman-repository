import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // Proxy API requests to the Spring Boot backend
    proxy: {
      '/api': 'http://localhost:8091', // Forward /api to the backend API running on localhost:8091
    },
    port: 5714, // You can change this to the port you want for your React app
  },
});
