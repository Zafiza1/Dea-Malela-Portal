<?php

// Simple test to verify PHP is working on Vercel
header('Content-Type: text/plain');
echo "PHP is working!\n";
echo "PHP Version: " . phpversion() . "\n";
echo "Current time: " . date('Y-m-d H:i:s') . "\n";
echo "Test completed successfully!";
