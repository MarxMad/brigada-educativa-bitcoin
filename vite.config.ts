import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    target: 'es2015',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'leaflet': ['leaflet'],
          'qrcode': ['qrcode'],
          'motion': ['motion'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    reportCompressedSize: true,
    sourcemap: false,
  },
  server: {
    host: true,
  },
});
