<?php

/**
 * Here is the serverless function entry
 * for deployment with Vercel.
 */

// Define LARAVEL_START if not already defined
if (!defined('LARAVEL_START')) {
    define('LARAVEL_START', microtime(true));
}

// Check for maintenance mode
$maintenanceFile = __DIR__.'/../storage/framework/maintenance.php';
if (file_exists($maintenanceFile)) {
    require $maintenanceFile;
}

// Register the Composer autoloader
$autoloadPath = __DIR__.'/../vendor/autoload.php';
if (file_exists($autoloadPath)) {
    require $autoloadPath;
} else {
    // Fallback for Vercel environment
    require __DIR__.'/../vendor/autoload.php';
}

// Bootstrap Laravel and handle the request
$app = require_once __DIR__.'/../bootstrap/app.php';
$app->handleRequest(Illuminate\Http\Request::capture());
