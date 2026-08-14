# Setup Database untuk Vercel Deployment

## Masalah
Vercel deployment menggunakan Supabase Connection Pooler (port 6543) untuk koneksi IPv4 yang lebih stabil, namun pooler tidak mendukung operasi DDL seperti CREATE TABLE yang diperlukan untuk migrations.

## Solusi
Jalankan SQL setup script di Supabase Dashboard untuk membuat tabel-tabel yang diperlukan.

## Cara Menjalankan Setup Database

### Option 1: Menggunakan SQL Script (Recommended)

1. Buka Supabase Dashboard: https://supabase.com/dashboard
2. Pilih project Anda
3. Masuk ke **SQL Editor**
4. Copy isi file `setup_database.sql`
5. Paste dan jalankan SQL tersebut

### Option 2: Menggunakan Laravel Migrations (Jika punya PostgreSQL driver)

Jika PHP Anda sudah memiliki driver PostgreSQL (pdo_pgsql):

#### Windows:
```bash
run-migrations.bat
```

#### Linux/Mac:
```bash
chmod +x run-migrations.sh
./run-migrations.sh
```

#### Manual Command:
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

## Setup Script Details

File `setup_database.sql` akan membuat:
- ✅ Tabel users, password_reset_tokens, sessions
- ✅ Tabel cache dan cache_locks
- ✅ Tabel jobs, job_batches, failed_jobs
- ✅ Tabel permissions, roles, dan pivot tables
- ✅ Tabel gurus dan santri
- ✅ Tabel surat_folders dan surat_files
- ✅ User admin default (username: admin, password: admin123)
- ✅ Role admin dan assign ke user admin

## Jika Login Gagal

Jika login dengan password `admin123` gagal, jalankan SQL berikut di Supabase Dashboard:

```sql
-- Update admin user password to admin123
UPDATE users 
SET password = '$2y$12$/jdyWr4AqgkuOvohTjkvL.4r1ofVzdc2bXm6zRt97kYCnw1juXcpO' 
WHERE username = 'admin';
```

Atau jalankan file `update_admin_password.sql` di SQL Editor Supabase.

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
Setelah setup database berhasil, aplikasi di Vercel akan bisa terkoneksi ke database menggunakan connection pooler dan tabel sudah tersedia.

**Default Login:**
- Username: `admin`
- Password: `admin123`

⚠️ **Penting**: Ganti password admin setelah login pertama!
