@echo off
REM Script untuk menjalankan migrations menggunakan direct connection Supabase
REM Gunakan ini untuk setup awal atau saat ada perubahan schema

REM Set environment variables untuk direct connection
set DB_CONNECTION=pgsql
set DB_HOST=db.wzlhobpewqaxbucoafdl.supabase.co
set DB_PORT=5432
set DB_DATABASE=postgres
set DB_USERNAME=postgres
set DB_PASSWORD=deamalela@123
set DB_SSLMODE=require

REM Jalankan migrations
php artisan migrate --force

REM Jalankan seeders
php artisan db:seed --force

echo Migrations dan seeders selesai!
