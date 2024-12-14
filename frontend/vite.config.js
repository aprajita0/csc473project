import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/api': {
                target: 'https://server-sooty-gamma-45.vercel.app/', 
                changeOrigin: true,
                secure: true,
            },
        },
    },
});
