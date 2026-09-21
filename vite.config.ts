import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0', // Allow access from any network
    port: 3000, // You can change the port if necessary
    allowedHosts: ['.ngrok-free.app'],
  },
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          firebase: ['firebase/app', 'firebase/auth', 'firebase/database'],
          ui: ['@heroui/react'],
          icons: ['@iconify/react'],
        },
      },
    },
  },
});
