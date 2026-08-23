#!/bin/bash

# Set permissions
chown -R www-data:www-data /var/www/html
chmod -R 755 /var/www/html/storage
chmod -R 755 /var/www/html/bootstrap/cache

# Generate application key if not set
if [ -z "$APP_KEY" ]; then
    php artisan key:generate --force
fi

# Clear and cache configurations
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Run migrations if needed (optional - comment out if you prefer manual migrations)
# php artisan migrate --force

# Execute the main command
exec "$@"