<?php
// Simple script to generate Laravel password hash
$password = 'admin123';
$hash = password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);
echo "Password: $password\n";
echo "Hash: $hash\n";
// Verify
echo "Verification: " . (password_verify($password, $hash) ? 'Valid' : 'Invalid') . "\n";
