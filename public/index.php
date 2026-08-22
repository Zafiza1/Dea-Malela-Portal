<?php

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('log_errors', 1);

// Simple test route for debugging
if ($_SERVER['REQUEST_URI'] === '/test') {
    header('Content-Type: text/plain');
    echo "PHP is working!\n";
    echo "PHP Version: " . phpversion() . "\n";
    echo "Current time: " . date('Y-m-d H:i:s') . "\n";
    echo "Test completed successfully!";
    exit;
}

try {
    // Determine if the application is in maintenance mode...
    if (file_exists($maintenance = __DIR__.'/../storage/framework/maintenance.php')) {
        require $maintenance;
    }

    // Register the Composer autoloader...
    if (!file_exists(__DIR__.'/../vendor/autoload.php')) {
        throw new Exception('Vendor autoload.php not found. Please run: composer install');
    }
    
    require __DIR__.'/../vendor/autoload.php';

    // Bootstrap Laravel and handle the request...
    /** @var Application $app */
    $app = require_once __DIR__.'/../bootstrap/app.php';

    $app->handleRequest(Request::capture());
} catch (Exception $e) {
    http_response_code(500);
    header('Content-Type: text/plain');
    echo "Error: " . $e->getMessage() . "\n";
    echo "File: " . $e->getFile() . "\n";
    echo "Line: " . $e->getLine() . "\n";
    echo "Trace:\n" . $e->getTraceAsString();
} catch (Error $e) {
    http_response_code(500);
    header('Content-Type: text/plain');
    echo "Fatal Error: " . $e->getMessage() . "\n";
    echo "File: " . $e->getFile() . "\n";
    echo "Line: " . $e->getLine() . "\n";
    echo "Trace:\n" . $e->getTraceAsString();
}
