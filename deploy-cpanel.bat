@echo off
REM ============================================================
REM Script Deployment untuk cPanel - Dea Malela Portal
REM Versi Windows untuk local development build
REM ============================================================

echo 🚀 Memulai build untuk deployment cPanel...

REM 1. Install dependencies jika perlu
echo 📦 Installing dependencies...
call npm ci

REM 2. Build assets untuk production
echo 🔨 Building assets...
call npm run build

REM 3. Verify build
echo ✅ Build selesai!
echo 📁 Folder build ada di: public\build
echo.
echo 📋 Langkah selanjutnya untuk upload ke cPanel:
echo 1. Upload seluruh file project ke cPanel
echo 2. Pastikan folder public\build ter-upload
echo 3. Set permission folder public\build ke 755
echo 4. Jalankan command di cPanel Terminal:
echo    - php artisan cache:clear
echo    - php artisan config:clear
echo    - php artisan route:clear
echo    - php artisan view:clear
echo    - php artisan storage:link
echo 5. Pastikan .env sudah dikonfigurasi dengan benar
echo.
pause