@echo off

REM Install Composer dependencies
composer install --no-dev --optimize-autoloader --no-interaction

REM Install Node dependencies and build assets
npm install
npm run build

REM Generate application key
php artisan key:generate --ansi

REM Clear and cache configurations
php artisan config:cache
php artisan route:cache
php artisan view:cache
