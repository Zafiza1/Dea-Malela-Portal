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
        console.error('BLOCKED: Invalid storage request:', url);
        console.trace('Request stack trace:');
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
            console.error('BLOCKED: Invalid image src:', src);
            console.trace('Image element:');
            target.style.display = 'none';
            event.preventDefault();
            event.stopPropagation();
        }
    }
}, true);

// Block all requests to invalid storage paths via XMLHttpRequest
const originalXMLHttpRequest = window.XMLHttpRequest;
window.XMLHttpRequest = function(this: XMLHttpRequest) {
    const xhr = new originalXMLHttpRequest();
    const originalOpen = xhr.open;
    xhr.open = function(method: string, url: string | URL, async?: boolean, user?: string | null, password?: string | null) {
        const urlString = typeof url === 'string' ? url : url.toString();
        if (urlString.includes('/storage/0') || urlString.includes('/storage/null') || urlString === '/storage/' || urlString.endsWith('/storage/')) {
            console.error('BLOCKED: Invalid XHR request:', urlString);
            console.trace('XHR origin:');
            throw new Error('Invalid storage path');
        }
        return originalOpen.call(this, method, url, async ?? true, user, password);
    };
    return xhr;
} as any;

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
