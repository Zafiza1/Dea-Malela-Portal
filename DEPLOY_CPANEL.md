# Panduan Deploy ke cPanel — deamalelaportal.my.id

Stack: Laravel 11 + Inertia (React) + Vite + Tailwind, database **MariaDB 10.11 cPanel**.
Domain `deamalelaportal.my.id` adalah **domain utama** akun (document root = `public_html`).
Asumsi kamu punya akses **SSH/Terminal** dan **Composer** di server.

> Aset frontend (`public/build/`) **sudah ada di repo**, jadi tidak perlu Node.js di server.
> Kalau nanti mengubah file di `resources/js`, build ulang di lokal (`npm run build`), commit, lalu `git pull` di server.

---

## 0. Persiapan di lokal (sekali)

Commit perubahan yang sudah disiapkan:

```bash
git add -A
git commit -m "Migrasi ke cPanel/MySQL: hapus config Vercel/Railway/Supabase + bersihkan kredensial"
git push origin main
```

Yang berubah:
- **Database** → `config/database.php`: blok `mysql` membaca `env()` (sebelumnya host/user/password ter-hardcode), default connection & migrasi jadi `mariadb`; koneksi `pgsql-direct` berisi password Supabase dihapus.
- **Storage** → `config/filesystems.php`: disk default jadi `public` (lokal), disk `supabase` dihapus. `ProfileController` tidak lagi memakai `Storage::disk('supabase')` (foto profil kini ke `storage/app/public`).
- **Kredensial** → `.env.example` nilai asli (APP_KEY, password DB, host Supabase) diganti placeholder.
- **File dihapus** (tidak dipakai lagi): `vercel.json`, `vercel-build.*`, `vercel-php.ini`, `.vercelignore`, `api/index.php`, `railway.json`, `Procfile`, `Dockerfile`, `SETUP_DATABASE.md`, `setup_database.sql`, dan beberapa file sampah (`toArray())`, `.yaml`, `vite.config.js.timestamp-*`).
- **Di-untrack tapi tetap ada di disk lokal**: `php84/` + `php84.zip` (PHP Windows bundel), `php.bat`, `composer.bat`, `test-import.zip` — sekarang masuk `.gitignore`.
- `public/index.php` dikembalikan ke versi standar Laravel (handler error Vercel yang membocorkan path file dihapus).
- **Baru**: `.env.production.example` (template env produksi), `DEPLOY_CPANEL.md` (dokumen ini).

---

## 1. Buat database MariaDB di cPanel

> Server: **MariaDB 10.11**, Localhost via UNIX socket.
> ⚠️ User `cpses_xxxxxxxx` yang muncul di phpMyAdmin **bukan** yang dipakai di `.env` —
> itu hanya sesi login sementara. Kamu harus buat user DB sendiri.

cPanel → **MySQL® Databases**:
1. Create New Database, mis. `deamalela_portal` → jadi `namacpanel_deamalela_portal`.
2. Create User, mis. `deamalela_user` → jadi `namacpanel_deamalela_user`. Simpan passwordnya.
3. **Add User To Database** → centang **ALL PRIVILEGES**.

Catat 3 nilai ini untuk `.env`: nama database, nama user, password.
Di `.env` nanti: `DB_CONNECTION=mariadb`, `DB_HOST=localhost` (kalau gagal, `127.0.0.1`).

---

## 2. Ambil kode di server (SSH)

```bash
cd ~
git clone https://github.com/Zafiza1/Dea-Malela-Portal.git deamalelaportal
cd deamalelaportal
```

Struktur akhir yang dituju:
```
/home/NAMACPANEL/
├── deamalelaportal/      <- seluruh aplikasi Laravel
│   └── public/           <- ini yang harus jadi web root
└── public_html/          <- diarahkan / disambungkan ke deamalelaportal/public
```

---

## 3. Install dependency PHP

```bash
cd ~/deamalelaportal
composer install --no-dev --optimize-autoloader --no-interaction
```

Kalau versi PHP CLI default berbeda dengan PHP domain, pakai path php spesifik, contoh:
```bash
/usr/local/bin/ea-php83 /usr/local/bin/composer install --no-dev --optimize-autoloader
```
(Butuh PHP ≥ 8.2 dengan ekstensi: `pdo_mysql`, `mbstring`, `openssl`, `bcmath`, `gd`, `fileinfo`, `zip`, `curl`. Atur versi PHP di cPanel → **MultiPHP Manager**, ekstensi di **MultiPHP INI Editor** / **Select PHP Version**.)

---

## 4. Konfigurasi `.env`

```bash
cp .env.production.example .env
php artisan key:generate
nano .env
```

Isi minimal:
- `APP_URL=https://deamalelaportal.my.id`
- `DB_CONNECTION=mariadb`
- `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD` dari langkah 1 (pakai prefix `namacpanel_`)
- `DB_HOST=localhost` (via UNIX socket; kalau error koneksi, coba `127.0.0.1`)

Cek koneksi DB sebelum lanjut: `php artisan db:show`

---

## 5. Migrasi database + akun admin

```bash
php artisan migrate --force
php artisan db:seed --class=AdminSeeder --force      # buat role admin/guru + user admin
php artisan db:seed --class=SuratFolderSeeder --force # opsional
php artisan db:seed --class=GuruSeeder --force        # opsional (data contoh)
```

Login admin default: **username `admin` / password `admin123`** → segera ganti setelah login.

---

## 6. Symlink storage + permission

```bash
php artisan storage:link
chmod -R 775 storage bootstrap/cache
```

---

## 7. Arahkan web root ke folder `public`

Pilih **salah satu**. Opsi A paling bersih.

### Opsi A — Ubah Document Root (cPanel baru)
cPanel → **Domains** → pada `deamalelaportal.my.id` klik **Manage** → ubah **Document Root** menjadi:
```
/home/NAMACPANEL/deamalelaportal/public
```
Simpan. Selesai — `public_html` lama diabaikan.

### Opsi B — Symlink `public_html`
```bash
cd ~
mv public_html public_html_backup_$(date +%F)
ln -s deamalelaportal/public public_html
```

### Opsi C — Isi `public_html` manual (kalau A & B tidak bisa)
```bash
cd ~
rm -rf public_html/*
cp -r deamalelaportal/public/. public_html/
```
Lalu edit `~/public_html/index.php`, ubah 2 baris path:
```php
require __DIR__.'/../deamalelaportal/vendor/autoload.php';
$app = require_once __DIR__.'/../deamalelaportal/bootstrap/app.php';
```
Dan `~/public_html/storage` harus menunjuk ke `~/deamalelaportal/storage/app/public`
(hapus symlink lama, buat ulang: `ln -sfn ~/deamalelaportal/storage/app/public ~/public_html/storage`).
Kelemahan opsi C: setiap `git pull` yang mengubah isi `public/` harus disalin ulang.

---

## 8. Optimasi cache Laravel

```bash
cd ~/deamalelaportal
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache
```

> Setiap kali mengubah `.env` di kemudian hari, jalankan `php artisan config:clear` lalu `config:cache` lagi.

---

## 9. SSL / HTTPS

cPanel → **SSL/TLS Status** → jalankan **Run AutoSSL** untuk `deamalelaportal.my.id` + `www`.
Setelah sertifikat aktif, tambahkan redirect ke HTTPS. Edit `public/.htaccess`, sisipkan tepat setelah `RewriteEngine On`:

```apache
    RewriteCond %{HTTPS} off
    RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

(`.env` sudah di-set `SESSION_SECURE_COOKIE=true` dan `APP_URL` https.)

---

## 10. Cron untuk scheduler & queue (opsional tapi disarankan)

cPanel → **Cron Jobs**, tambah (tiap menit):
```
* * * * * /usr/local/bin/php /home/NAMACPANEL/deamalelaportal/artisan schedule:run >> /dev/null 2>&1
```
Karena `QUEUE_CONNECTION=database`, untuk memproses job tambahkan cron tiap menit:
```
* * * * * /usr/local/bin/php /home/NAMACPANEL/deamalelaportal/artisan queue:work --stop-when-empty --max-time=55 >> /dev/null 2>&1
```

---

## 11. Update rilis berikutnya

```bash
cd ~/deamalelaportal
php artisan down
git pull origin main
composer install --no-dev --optimize-autoloader
php artisan migrate --force
php artisan config:cache && php artisan route:cache && php artisan view:cache
php artisan up
```

---

## Troubleshooting

| Gejala | Solusi |
|---|---|
| HTTP 500 halaman putih | `tail -n 50 storage/logs/laravel.log`. Sementara set `APP_DEBUG=true` + `php artisan config:clear`. |
| `500` + log "No application encryption key" | `php artisan key:generate` lalu `config:cache`. |
| `SQLSTATE[HY000] [1045] Access denied` | Cek `DB_USERNAME/DB_PASSWORD/DB_DATABASE` (pakai prefix `namacpanel_`), dan user sudah di-Add To Database dengan ALL PRIVILEGES. |
| CSS/JS tidak muncul (404 `/build/...`) | Pastikan folder `public/build` ikut ter-clone; web root benar menunjuk ke `.../public`. |
| Gambar / file upload tidak tampil | `php artisan storage:link` dan cek symlink `public/storage` valid. |
| `403 Forbidden` di root | Document root salah, atau `.htaccess` tidak terbaca — pastikan `AllowOverride All` (default di shared cPanel sudah aktif). |
| Halaman lama/timestamp cache | `php artisan optimize:clear`. |

## Catatan keamanan
Kredensial yang sebelumnya ter-hardcode sudah dihapus dari file yang di-track. **Tapi nilai lama masih tersimpan di riwayat commit GitHub**, jadi remediasi sebenarnya:
- Karena Supabase sudah tidak dipakai, **hapus / nonaktifkan project Supabase-nya** (atau minimal rotate password DB `deamalela@123`) supaya kredensial yang bocor tidak bisa dipakai.
- Anggap `APP_KEY` lama (`base64:UtSqw+...`) sudah bocor — `.env` produksi cPanel wajib pakai key baru dari `php artisan key:generate`.
- Ganti password admin default (`admin123`) setelah login pertama.
- Opsional: bersihkan riwayat git dengan `git filter-repo` bila ingin menghapus jejak kredensial sepenuhnya dari GitHub.
