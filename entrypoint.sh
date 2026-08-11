#!/bin/bash

# Create .env file from environment variables
if [ ! -f .env ]; then
    cp .env.example .env
fi

# Update .env with Render environment variables
if [ -n "$APP_NAME" ]; then
    sed -i "s|APP_NAME=.*|APP_NAME=\"${APP_NAME}\"|g" .env
fi
if [ -n "$APP_ENV" ]; then
    sed -i "s|APP_ENV=.*|APP_ENV=${APP_ENV}|g" .env
fi
if [ -n "$APP_DEBUG" ]; then
    sed -i "s|APP_DEBUG=.*|APP_DEBUG=${APP_DEBUG}|g" .env
fi
if [ -n "$APP_KEY" ]; then
    sed -i "s|APP_KEY=.*|APP_KEY=${APP_KEY}|g" .env
fi
if [ -n "$APP_URL" ]; then
    sed -i "s|APP_URL=.*|APP_URL=${APP_URL}|g" .env
fi
if [ -n "$DB_CONNECTION" ]; then
    sed -i "s|DB_CONNECTION=.*|DB_CONNECTION=${DB_CONNECTION}|g" .env
fi
if [ -n "$DB_HOST" ]; then
    sed -i "s|DB_HOST=.*|DB_HOST=${DB_HOST}|g" .env
fi
if [ -n "$DB_PORT" ]; then
    sed -i "s|DB_PORT=.*|DB_PORT=${DB_PORT}|g" .env
fi
if [ -n "$DB_DATABASE" ]; then
    sed -i "s|DB_DATABASE=.*|DB_DATABASE=${DB_DATABASE}|g" .env
fi
if [ -n "$DB_USERNAME" ]; then
    sed -i "s|DB_USERNAME=.*|DB_USERNAME=${DB_USERNAME}|g" .env
fi
if [ -n "$DB_PASSWORD" ]; then
    sed -i "s|DB_PASSWORD=.*|DB_PASSWORD=${DB_PASSWORD}|g" .env
fi
if [ -n "$CACHE_DRIVER" ]; then
    sed -i "s|CACHE_STORE=.*|CACHE_STORE=${CACHE_DRIVER}|g" .env
fi
if [ -n "$SESSION_DRIVER" ]; then
    sed -i "s|SESSION_DRIVER=.*|SESSION_DRIVER=${SESSION_DRIVER}|g" .env
fi
if [ -n "$QUEUE_CONNECTION" ]; then
    sed -i "s|QUEUE_CONNECTION=.*|QUEUE_CONNECTION=${QUEUE_CONNECTION}|g" .env
fi

# Generate application key if not set
if [ -z "$APP_KEY" ] || [ "$APP_KEY" = "" ]; then
    php artisan key:generate
fi

# Run migrations automatically on Render
php artisan migrate --force

# Clear and cache config
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Start PHP-FPM
php-fpm
