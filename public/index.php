<?php

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// Simple test route for debugging
if ($_SERVER['REQUEST_URI'] === '/test') {
    header('Content-Type: text/plain');
    echo "PHP is working!\n";
    echo "PHP Version: " . phpversion() . "\n";
    echo "Current time: " . date('Y-m-d H:i:s') . "\n";
    echo "Test completed successfully!";
    exit;
}

// Determine if the application is in maintenance mode...
if (file_exists($maintenance = __DIR__.'/../storage/framework/maintenance.php')) {
    require $maintenance;
}

// Register the Composer autoloader...
require __DIR__.'/../vendor/autoload.php';

// Bootstrap Laravel and handle the request...
/** @var Application $app */
$app = require_once __DIR__.'/../bootstrap/app.php';

$app->handleRequest(Request::capture());
