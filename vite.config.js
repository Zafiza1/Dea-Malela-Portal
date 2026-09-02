import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.tsx',
            refresh: false,
            buildDirectory: 'build',
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
    build: {
        manifest: true,
        assetsDir: 'assets',
        outDir: 'public/build',
        rollupOptions: {
            output: {
                manualChunks: undefined,
            },
        },
    },
});
