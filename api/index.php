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

// Test basic PHP functionality first
echo json_encode([
    'status' => 'PHP working',
    'php_version' => phpversion(),
    'time' => date('Y-m-d H:i:s'),
    'test' => 'Basic PHP test successful'
]);
exit;
