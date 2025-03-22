export default defineConfig({
  plugins: [react()],
  server: {
    // Proxy API requests to the Spring Boot backend
    proxy: {
      '/api': 'http://localhost:8091', // Forward /api to the backend API running on localhost:8091
    },
    port: 5173, // You can change this to the port you want, just be sure to change the cross origins port in the backend within controller and corsconfig
  },
});
