<?php

/**
 * Here is the serverless function entry
 * for deployment with Vercel.
 */

// Disable deprecation warnings for cleaner production output
error_reporting(E_ALL ^ E_DEPRECATED ^ E_USER_DEPRECATED);

// Ensure SQLite database exists for Vercel
$dbPath = '/tmp/database.sqlite';
if (!file_exists($dbPath)) {
    touch($dbPath);
}

require __DIR__.'/../public/index.php';
