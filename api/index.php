<?php

/**
 * Here is the serverless function entry
 * for deployment with Vercel.
 */

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', '1');
ini_set('log_errors', '1');
ini_set('error_log', 'php://stderr');

// Define LARAVEL_START if not already defined
if (!defined('LARAVEL_START')) {
    define('LARAVEL_START', microtime(true));
}

try {
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

    // Set environment variables from Vercel
    if (isset($_ENV['DB_HOST'])) {
        putenv('DB_HOST=' . $_ENV['DB_HOST']);
    }
    if (isset($_ENV['DB_PORT'])) {
        putenv('DB_PORT=' . $_ENV['DB_PORT']);
    }
    if (isset($_ENV['DB_DATABASE'])) {
        putenv('DB_DATABASE=' . $_ENV['DB_DATABASE']);
    }
    if (isset($_ENV['DB_USERNAME'])) {
        putenv('DB_USERNAME=' . $_ENV['DB_USERNAME']);
    }
    if (isset($_ENV['DB_PASSWORD'])) {
        putenv('DB_PASSWORD=' . $_ENV['DB_PASSWORD']);
    }

    // Bootstrap Laravel and handle the request
    $app = require_once __DIR__.'/../bootstrap/app.php';
    $app->handleRequest(Illuminate\Http\Request::capture());

} catch (Throwable $e) {
    // Log the error to stderr for Vercel
    error_log('ERROR: ' . $e->getMessage());
    error_log('FILE: ' . $e->getFile() . ' LINE: ' . $e->getLine());
    error_log('TRACE: ' . $e->getTraceAsString());

    // Return a proper error response
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode([
        'error' => 'Application Error',
        'message' => $e->getMessage(),
        'file' => $e->getFile(),
        'line' => $e->getLine(),
        'trace' => $e->getTraceAsString()
    ]);
}
