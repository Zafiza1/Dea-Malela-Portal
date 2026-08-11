<?php

/**
 * Here is the serverless function entry
 * for deployment with Vercel.
 */

// Ensure SQLite database exists for Vercel
$dbPath = '/tmp/database.sqlite';
if (!file_exists($dbPath)) {
    touch($dbPath);
}

require __DIR__.'/../public/index.php';
