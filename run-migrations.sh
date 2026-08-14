#!/bin/bash

# Script untuk menjalankan migrations menggunakan direct connection Supabase
# Gunakan ini untuk setup awal atau saat ada perubahan schema

# Set environment variables untuk direct connection
export DB_CONNECTION=pgsql
export DB_HOST=db.wzlhobpewqaxbucoafdl.supabase.co
export DB_PORT=5432
export DB_DATABASE=postgres
export DB_USERNAME=postgres
export DB_PASSWORD=deamalela@123
export DB_SSLMODE=require

# Jalankan migrations
php artisan migrate --force

# Jalankan seeders
php artisan db:seed --force

echo "Migrations dan seeders selesai!"
