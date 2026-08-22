import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.tsx',
            refresh: false,
        }),
    ],
    server: {
        watch: null,
        hmr: false,
        https: false, // Force HTTP instead of HTTPS
        host: 'localhost',
        port: 5173,
        strictPort: true,
    },
    base: '/', // Ensure assets are served from root
});
