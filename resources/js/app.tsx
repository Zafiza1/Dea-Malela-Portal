// @ts-ignore - CSS import for Vite
import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
// import { ThemeProvider } from './Contexts/ThemeContext';
import ErrorBoundary from './Components/ErrorBoundary';

const appName = (import.meta as any).env.VITE_APP_NAME || 'Laravel';

// Add global fetch interceptor to prevent invalid storage requests
const originalFetch = window.fetch;
window.fetch = function(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
    const url = typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url;
    
    // Prevent requests to invalid storage paths
    if (url.includes('/storage/0') || url.includes('/storage/null') || url === '/storage/' || url.endsWith('/storage/')) {
        console.warn('Prevented request to invalid storage path:', url);
        return Promise.reject(new Error('Invalid storage path'));
    }
    
    return originalFetch.call(this, input, init);
};

// Add global image error handler
document.addEventListener('error', (event) => {
    const target = event.target as HTMLImageElement;
    if (target && target.tagName === 'IMG') {
        const src = target.src;
        if (src.includes('/storage/0') || src.includes('/storage/null') || src === '/storage/' || src.endsWith('/storage/')) {
            console.warn('Prevented image load for invalid storage path:', src);
            target.style.display = 'none';
        }
    }
}, true);

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            (import.meta as any).glob('./Pages/**/*.tsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <ErrorBoundary>
                {/* <ThemeProvider> */}
                    <App {...props} />
                {/* </ThemeProvider> */}
            </ErrorBoundary>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
