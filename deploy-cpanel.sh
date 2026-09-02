#!/bin/bash

# ============================================================
# Script Deployment untuk cPanel - Dea Malela Portal
# Jalankan script ini di server cPanel via SSH atau Terminal
# ============================================================

echo "🚀 Memulai deployment ke cPanel..."

# 1. Pastikan di directory yang benar
cd ~/public_html || exit 1

# 2. Pull latest changes (jika menggunakan git)
echo "📥 Pulling latest changes..."
git pull origin main

# 3. Install dependencies jika perlu
echo "📦 Installing dependencies..."
composer install --no-dev --optimize-autoloader
npm ci

# 4. Build assets untuk production
echo "🔨 Building assets..."
npm run build

# 5. Clear Laravel cache
echo "🧹 Clearing cache..."
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

# 6. Optimize untuk production
echo "⚡ Optimizing for production..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

# 7. Set permissions yang benar
echo "🔒 Setting permissions..."
chmod -R 755 public/build
chmod -R 755 storage
chmod -R 755 bootstrap/cache

# 8. Link storage (jika belum)
echo "🔗 Linking storage..."
php artisan storage:link

echo "✅ Deployment selesai!"
echo "🌐 Akses aplikasi di: https://deamalelaportal.my.id"