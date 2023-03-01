import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
          '/app': {
            target: 'http://localhost:5001',
            channgeOrigin: true,
            secure: false,
          },
        },
    },
});
