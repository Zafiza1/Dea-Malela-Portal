<?php

// Simple test to verify PHP is working on Vercel
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "PHP is working!\n";
echo "PHP Version: " . phpversion() . "\n";
echo "Current time: " . date('Y-m-d H:i:s') . "\n";

// Check if required extensions are loaded
$required_extensions = ['pdo', 'pdo_pgsql', 'mbstring', 'json', 'openssl'];
foreach ($required_extensions as $ext) {
    echo "Extension $ext: " . (extension_loaded($ext) ? 'LOADED' : 'MISSING') . "\n";
}

// Check environment variables
echo "\nEnvironment check:\n";
echo "APP_KEY: " . (getenv('APP_KEY') ? 'SET' : 'NOT SET') . "\n";
echo "APP_ENV: " . getenv('APP_ENV') . "\n";
echo "DB_HOST: " . getenv('DB_HOST') . "\n";

echo "\nTest completed successfully!";
