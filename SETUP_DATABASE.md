# Setup Database untuk Vercel Deployment

## Masalah
Vercel deployment menggunakan Supabase Connection Pooler (port 6543) untuk koneksi IPv4 yang lebih stabil, namun pooler tidak mendukung operasi DDL seperti CREATE TABLE yang diperlukan untuk migrations.

## Solusi
Jalankan migrations secara manual menggunakan direct connection Supabase sebelum atau setelah deployment.

## Cara Menjalankan Migrations

### Option 1: Menggunakan Script (Windows)
```bash
run-migrations.bat
```

### Option 2: Menggunakan Script (Linux/Mac)
```bash
chmod +x run-migrations.sh
./run-migrations.sh
```

### Option 3: Manual Command
```bash
# Set environment variables untuk direct connection
set DB_CONNECTION=pgsql
set DB_HOST=db.wzlhobpewqaxbucoafdl.supabase.co
set DB_PORT=5432
set DB_DATABASE=postgres
set DB_USERNAME=postgres
set DB_PASSWORD=deamalela@123
set DB_SSLMODE=require

# Jalankan migrations
php artisan migrate --force

# Jalankan seeders
php artisan db:seed --force
```

## Penjelasan Konfigurasi

### Vercel Environment
- **Runtime**: Menggunakan connection pooler (`aws-0-ap-south-1.pooler.supabase.com:6543`)
- **Username format**: `postgres.wzlhobpewqaxbucoafdl` (format pooler)
- **Keuntungan**: Lebih stabil untuk environment serverless Vercel

### Local/Migration Environment  
- **Direct connection**: `db.wzlhobpewqaxbucoafdl.supabase.co:5432`
- **Username**: `postgres` (username standar)
- **Keuntungan**: Mendukung operasi DDL untuk migrations

## Setelah Setup
Setelah migrations berhasil dijalankan, aplikasi di Vercel akan bisa terkoneksi ke database menggunakan connection pooler dan tabel sudah tersedia.
