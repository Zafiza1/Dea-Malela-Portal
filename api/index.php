<?php

/**
 * Here is the serverless function entry
 * for deployment with Vercel.
 */

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', '0'); // Disable display errors in production
ini_set('log_errors', '1');
ini_set('error_log', 'php://stderr');

// Define LARAVEL_START if not already defined
if (!defined('LARAVEL_START')) {
    define('LARAVEL_START', microtime(true));
}

try {
    // Load environment variables from vercel.json
    if (file_exists(__DIR__.'/../vercel.json')) {
        $vercelConfig = json_decode(file_get_contents(__DIR__.'/../vercel.json'), true);
        if (isset($vercelConfig['env'])) {
            foreach ($vercelConfig['env'] as $key => $value) {
                if (!isset($_ENV[$key])) {
                    $_ENV[$key] = $value;
                    putenv("$key=$value");
                }
            }
        }
    }

    // Set proper cache paths for local development
    if (!file_exists('/tmp') && !is_dir('/tmp')) {
        // Use local storage directory for development
        putenv('APP_CONFIG_CACHE=' . __DIR__ . '/../storage/framework/config.php');
        putenv('APP_EVENTS_CACHE=' . __DIR__ . '/../storage/framework/events.php');
        putenv('APP_PACKAGES_CACHE=' . __DIR__ . '/../storage/framework/packages.php');
        putenv('APP_ROUTES_CACHE=' . __DIR__ . '/../storage/framework/routes.php');
        putenv('APP_SERVICES_CACHE=' . __DIR__ . '/../storage/framework/services.php');
        putenv('VIEW_COMPILED_PATH=' . __DIR__ . '/../storage/framework/views');
    }

    // Check for maintenance mode
    $maintenanceFile = __DIR__.'/../storage/framework/maintenance.php';
    if (file_exists($maintenanceFile)) {
        require $maintenanceFile;
    }

    // Register the Composer autoloader
    $autoloadPath = __DIR__.'/../vendor/autoload.php';
    if (!file_exists($autoloadPath)) {
        throw new Exception('Composer autoloader not found at: ' . $autoloadPath);
    }
    require $autoloadPath;

    // Bootstrap Laravel and handle the request
    $app = require_once __DIR__.'/../bootstrap/app.php';
    $app->handleRequest(Illuminate\Http\Request::capture());

} catch (Throwable $e) {
    // Log the error to stderr for Vercel
    error_log('ERROR: ' . $e->getMessage());
    error_log('FILE: ' . $e->getFile() . ' LINE: ' . $e->getLine());
    error_log('TRACE: ' . $e->getTraceAsString());

    // Return a proper error response
    if (!headers_sent()) {
        http_response_code(500);
        header('Content-Type: application/json');
    }
    echo json_encode([
        'error' => 'Application Error',
        'message' => $e->getMessage(),
        'file' => $e->getFile(),
        'line' => $e->getLine(),
        'trace' => $e->getTraceAsString()
    ]);
}
