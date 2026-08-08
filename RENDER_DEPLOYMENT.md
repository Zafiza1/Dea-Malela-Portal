# Render Deployment Guide

## Cara Deploy ke Render.com

### 1. Persiapan
- Pastikan project sudah di-push ke GitHub
- Pastikan file `render.yaml` sudah ada di root project

### 2. Setup Account Render
1. Buka [render.com](https://render.com)
2. Sign up dengan GitHub account
3. Authorize Render untuk akses repository GitHub

### 3. Import Project
1. Di Dashboard Render, klik **"New +"** → **"Web Service"**
2. Pilih repository: `Zafiza1/Dea-Malela-Portal`
3. Render akan otomatis mendeteksi `render.yaml`
4. Review konfigurasi yang terdeteksi:
   - **Name**: dea-malela-portal
   - **Environment**: Docker
   - **Plan**: Free
   - **Region**: Singapore (atau yang terdekat)

### 4. Environment Variables
Render akan otomatis membuat environment variables berdasarkan `render.yaml`:
- `APP_ENV`: production
- `APP_DEBUG`: false
- `APP_KEY`: base64:W7wsAxNuMf6bQO3YPS9637RDAL1HdC+KaMWFcfrmJUg=
- `APP_URL`: https://dea-malela-portal.onrender.com
- `DB_CONNECTION`: pgsql
- Database credentials (auto-generated dari database render.yaml)

### 5. Database Setup
Render akan otomatis membuat PostgreSQL database:
- **Database Name**: dea_malela
- **User**: dea_malela_user
- Credentials akan di-inject ke environment variables

### 6. Deploy
1. Klik **"Create Web Service"**
2. Render akan:
   - Build Docker image
   - Setup PostgreSQL database
   - Deploy application
   - Run migrations (via entrypoint.sh)

### 7. Akses Application
Setelah deploy selesai:
- URL: `https://dea-malela-portal.onrender.com`
- Dashboard: Buka Render dashboard untuk monitoring

## Troubleshooting

### Build Failed
- Cek **Logs** di Render dashboard
- Pastikan Dockerfile valid
- Pastikan semua dependencies tersedia

### Database Connection Error
- Pastikan database sudah running
- Cek environment variables
- Pastikan DB_CONNECTION = pgsql

### Migrations Failed
- Cek log di entrypoint.sh
- Pastikan DB credentials benar
- Run manual migration via Render shell jika perlu

## Environment Variables Custom

Jika perlu mengubah environment variables:
1. Buka Web Service di Render dashboard
2. Tab **Environment**
3. Edit/Add variables
4. Restart service

## Storage & File Uploads

Untuk file uploads, setup S3-compatible storage:
1. Buka Render dashboard
2. Add environment variables:
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
   - `AWS_DEFAULT_REGION`
   - `AWS_BUCKET`
   - `FILESYSTEM_DISK`: s3

## Update Production

Untuk update ke production:
1. Push changes ke GitHub
2. Render akan otomatically redeploy
3. Atau trigger manual di Render dashboard

## Cost

- **Free Tier**: 
  - Web Service: 750 hours/month
  - PostgreSQL: 90 days
- Setelah free tier habis: ~$7/month untuk web service + $7/month untuk database

## Support

- Render Docs: https://render.com/docs
- Render Status: https://status.render.com
