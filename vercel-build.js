const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Starting Vercel build for Laravel...');

// Create a simple index.php that serves the Laravel app
try {
  console.log('Installing Composer...');
  execSync('curl -sS https://getcomposer.org/installer | php', { stdio: 'inherit' });
  
  console.log('Installing PHP dependencies...');
  execSync('php composer.phar install --no-dev --optimize-autoloader', { stdio: 'inherit' });
  
  console.log('Installing Node dependencies...');
  execSync('npm install', { stdio: 'inherit' });
  
  console.log('Building frontend assets...');
  execSync('npm run build', { stdio: 'inherit' });
  
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}
