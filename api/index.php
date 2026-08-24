<?php

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', '1');
ini_set('log_errors', '1');
ini_set('error_log', 'php://stderr');

// Log startup
error_log('Starting Vercel PHP function');

// Check if vendor directory exists
if (!file_exists(__DIR__ . '/../vendor/autoload.php')) {
    error_log('ERROR: vendor/autoload.php not found');
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Vendor dependencies not installed']);
    exit;
}

// Forward Vercel requests to normal index.php
try {
    require __DIR__ . '/../public/index.php';
} catch (Throwable $e) {
    error_log('FATAL ERROR: ' . $e->getMessage());
    error_log('FILE: ' . $e->getFile() . ' LINE: ' . $e->getLine());
    error_log('TRACE: ' . $e->getTraceAsString());
    
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode([
        'error' => 'Application Error',
        'message' => $e->getMessage(),
        'file' => $e->getFile(),
        'line' => $e->getLine()
    ]);
}
