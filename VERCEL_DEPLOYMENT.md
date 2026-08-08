# Vercel Deployment Guide

## Prerequisites
- GitHub account with your project pushed
- Vercel account (free)
- Database hosting (MySQL/PostgreSQL) - use free tier like:
  - [PlanetScale](https://planetscale.com/) (MySQL)
  - [Neon](https://neon.tech/) (PostgreSQL)
  - [Supabase](https://supabase.com/) (PostgreSQL)

## Environment Variables

Set these in Vercel Project Settings > Environment Variables:

### Required Variables
```
APP_ENV=production
APP_DEBUG=false
APP_KEY=base64:your-generated-key-here
APP_URL=https://your-project.vercel.app
```

### Database Variables (replace with your database provider)
```
DB_CONNECTION=mysql
DB_HOST=your-database-host.com
DB_PORT=3306
DB_DATABASE=your-database-name
DB_USERNAME=your-database-username
DB_PASSWORD=your-database-password
```

### Session & Cache
```
SESSION_DRIVER=file
CACHE_STORE=file
```

### Optional Variables
```
APP_LOCALE=id
APP_FALLBACK_LOCALE=en
MAIL_MAILER=log
MAIL_FROM_ADDRESS=admin@deamalela.com
MAIL_FROM_NAME="Pesantren Modern Internasional Dea Malela"
```

## Deployment Steps

### 1. Generate APP_KEY
Run locally:
```bash
php artisan key:generate --show
```
Copy the generated key and set it as `APP_KEY` in Vercel.

### 2. Push to GitHub
```bash
git add .
git commit -m "Add Vercel configuration"
git push
```

### 3. Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure build settings (Vercel will auto-detect from vercel.json)
5. Add environment variables
6. Click "Deploy"

### 4. Post-Deployment
1. Run database migrations (you'll need to do this via your database provider's interface or SSH)
2. Test your application at the provided Vercel URL

## Database Setup for Vercel

### Option 1: PlanetScale (MySQL - Free)
1. Create account at [planetscale.com](https://planetscale.com/)
2. Create new database
3. Get connection string
4. Set DB_* variables in Vercel

### Option 2: Neon (PostgreSQL - Free)
1. Create account at [neon.tech](https://neon.tech/)
2. Create new project
3. Get connection string
4. Set DB_CONNECTION=pgsql and other DB_* variables

### Option 3: Supabase (PostgreSQL - Free)
1. Create account at [supabase.com](https://supabase.com/)
2. Create new project
3. Get connection string
4. Set DB_CONNECTION=pgsql and other DB_* variables

## Troubleshooting

### Build Fails
- Check that all required environment variables are set
- Ensure PHP version compatibility (Vercel uses PHP 8.2+)
- Check build logs in Vercel dashboard

### Database Connection Issues
- Verify database credentials
- Check if database allows connections from Vercel's IP ranges
- Ensure database is not in sleep mode (some free tiers pause)

### Static Assets Not Loading
- Ensure `php artisan storage:link` has been run
- Check Vercel's static file serving configuration

## Limitations of Free Tier

- Vercel: 100GB bandwidth/month, 6GB hours/month
- Most database free tiers have connection limits
- File storage is limited (consider using cloud storage for uploads)
