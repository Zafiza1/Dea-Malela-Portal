#!/bin/bash

# Create .env file from environment variables
if [ ! -f .env ]; then
    cp .env.example .env
fi

# Update .env with Vercel environment variables
sed -i "s|APP_NAME=.*|APP_NAME=\"${APP_NAME}\"|g" .env
sed -i "s|APP_ENV=.*|APP_ENV=${APP_ENV}|g" .env
sed -i "s|APP_DEBUG=.*|APP_DEBUG=${APP_DEBUG}|g" .env
sed -i "s|APP_KEY=.*|APP_KEY=${APP_KEY}|g" .env
sed -i "s|APP_URL=.*|APP_URL=${APP_URL}|g" .env
sed -i "s|DB_CONNECTION=.*|DB_CONNECTION=${DB_CONNECTION}|g" .env
sed -i "s|DB_HOST=.*|DB_HOST=${DB_HOST}|g" .env
sed -i "s|DB_PORT=.*|DB_PORT=${DB_PORT}|g" .env
sed -i "s|DB_DATABASE=.*|DB_DATABASE=${DB_DATABASE}|g" .env
sed -i "s|DB_USERNAME=.*|DB_USERNAME=${DB_USERNAME}|g" .env
sed -i "s|DB_PASSWORD=.*|DB_PASSWORD=${DB_PASSWORD}|g" .env

# Generate application key if not set
if [ -z "$APP_KEY" ]; then
    php artisan key:generate
fi

# Run migrations (optional - comment out if you want to run manually)
# php artisan migrate --force

# Clear and cache config
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Start Apache
apache2-foreground
