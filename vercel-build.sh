#!/bin/bash

# Install Composer dependencies
composer install --no-dev --optimize-autoloader --no-interaction

# Install Node dependencies and build assets
npm install
npm run build

# Generate application key
php artisan key:generate --ansi

# Clear and cache configurations
php artisan config:cache
php artisan route:cache
php artisan view:cache
