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
    },
});
