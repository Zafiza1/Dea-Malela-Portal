<?php

/**
 * Simple test script to verify PHP is working on Vercel
 */

error_reporting(E_ALL);
ini_set('display_errors', '1');

// Test basic PHP functionality
$response = [
    'status' => 'success',
    'php_version' => phpversion(),
    'server_software' => $_SERVER['SERVER_SOFTWARE'] ?? 'unknown',
    'request_method' => $_SERVER['REQUEST_METHOD'] ?? 'unknown',
    'request_uri' => $_SERVER['REQUEST_URI'] ?? 'unknown',
    'time' => date('Y-m-d H:i:s'),
    'extensions' => get_loaded_extensions(),
    'composer_autoload' => file_exists(__DIR__.'/../vendor/autoload.php'),
    'laravel_bootstrap' => file_exists(__DIR__.'/../bootstrap/app.php'),
];

header('Content-Type: application/json');
echo json_encode($response, JSON_PRETTY_PRINT);