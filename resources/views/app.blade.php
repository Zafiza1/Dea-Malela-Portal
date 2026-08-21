<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Content Security Policy for mixed content -->
        @if(app()->environment('production'))
            <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
        @endif

        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <!-- Prevent invalid storage requests at DOM level -->
        <script>
            (function() {
                const originalCreateElement = document.createElement;
                document.createElement = function(tagName) {
                    const element = originalCreateElement.call(document, tagName);
                    if (tagName.toLowerCase() === 'img') {
                        const originalSetAttribute = element.setAttribute;
                        element.setAttribute = function(name, value) {
                            if (name === 'src' && (value.includes('/storage/0') || value.includes('/storage/null') || value === '/storage/' || value.endsWith('/storage/'))) {
                                console.error('BLOCKED: Invalid img src at DOM level:', value);
                                element.style.display = 'none';
                                return;
                            }
                            return originalSetAttribute.call(this, name, value);
                        };
                    }
                    return element;
                };
            })();
            
            // Make CSRF token available globally
            window.csrf_token = '{{ csrf_token() }}';
        </script>

        <!-- Scripts -->
        @routes
        @vite(['resources/js/app.tsx'])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
