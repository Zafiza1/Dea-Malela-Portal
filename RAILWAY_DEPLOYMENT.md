# Railway Deployment Guide

## Prerequisites
- GitHub account with your project pushed
- Railway account (free $5 credit)
- Database hosting (Railway provides built-in PostgreSQL)

## Railway Setup

### 1. Create Railway Account
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. You'll get $5 free credit

### 2. Deploy Your Application

#### Option A: Deploy from GitHub (Recommended)
1. Click "New Project" in Railway dashboard
2. Click "Deploy from GitHub repo"
3. Select your repository (Zafiza1/Dea-Malela-Portal)
4. Railway will auto-detect Laravel
5. Click "Deploy"

#### Option B: Deploy using Railway CLI
```bash
npm install -g @railway/cli
railway login
railway init
railway up
```

### 3. Configure Environment Variables

After deployment, go to your project settings and add these variables:

#### Required Variables
```
APP_ENV=production
APP_DEBUG=false
APP_KEY=base64:W7wsAxNuMf6bQO3YPS9637RDAL1HdC+KaMWFcfrmJUg=
APP_URL=https://your-app.railway.app
```

#### Database Variables (Railway PostgreSQL)
Railway provides built-in PostgreSQL. Set these variables:
```
DB_CONNECTION=pgsql
DB_HOST=${{RAILWAY_PRIVATE_DOMAIN}}
DB_PORT=5432
DB_DATABASE=${{POSTGRES_DATABASE}}
DB_USERNAME=${{POSTGRES_USER}}
DB_PASSWORD=${{POSTGRES_PASSWORD}}
```

Or manually add:
```
DB_CONNECTION=pgsql
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=railway
DB_USERNAME=postgres
DB_PASSWORD=your-password
```

#### Session & Cache
```
SESSION_DRIVER=database
CACHE_STORE=database
QUEUE_CONNECTION=database
```

#### Optional Variables
```
APP_LOCALE=id
APP_FALLBACK_LOCALE=en
MAIL_MAILER=log
MAIL_FROM_ADDRESS=admin@deamalela.com
MAIL_FROM_NAME="Pesantren Modern Internasional Dea Malela"
```

### 4. Add PostgreSQL Database

1. In your Railway project, click "New Service"
2. Select "Database"
3. Choose "PostgreSQL"
4. Railway will automatically create and connect the database

### 5. Run Database Migrations

Option A: Through Railway Console
1. Go to your project in Railway
2. Click on your app service
3. Click "Console" tab
4. Select "New Console"
5. Run: `php artisan migrate --force`

Option B: Add to Deployment Script
Add this to your `railway.toml`:
```toml
[deploy]
startCommand = "php artisan migrate --force && php artisan serve --host=0.0.0.0 --port=$PORT"
```

### 6. Build Assets

Option A: Through Railway Console
1. Open console in Railway
2. Run: `npm run build`

Option B: Add to Build Process
Railway will automatically detect and run `npm run build` based on `package.json`.

### 7. Storage Link

Run this in Railway console:
```bash
php artisan storage:link
```

## Custom Domain (Optional)

1. Go to your project settings in Railway
2. Click "Networking"
3. Click "Custom Domain"
4. Add your domain (e.g., deamalela.com)
5. Update DNS records as instructed by Railway
6. Update `APP_URL` environment variable

## Monitoring & Logs

1. Go to your project in Railway
2. Click "Logs" to view application logs
3. Click "Metrics" to see performance metrics
4. Set up alerts in "Settings" > "Alerts"

## Scaling

Railway automatically scales based on traffic. For production:
- Consider upgrading to paid plan for better performance
- Railway provides built-in load balancing
- Database is automatically backed up

## Troubleshooting

### Build Fails
- Check build logs in Railway dashboard
- Ensure all dependencies are in `composer.json` and `package.json`
- Verify PHP version compatibility (Railway uses PHP 8.2+)

### Database Connection Issues
- Verify database credentials match Railway's PostgreSQL service
- Check if database service is running
- Ensure database variables use Railway's reference syntax `${{...}}`

### Assets Not Loading
- Run `php artisan storage:link` in console
- Ensure `npm run build` completed successfully
- Check public/build directory exists

### Application Not Starting
- Check logs for specific error messages
- Verify all required environment variables are set
- Ensure `APP_KEY` is set correctly

## Cost & Limits

### Free Tier
- $5 one-time credit
- After credit: $0.000392/minute for services
- PostgreSQL: $0.000125/minute
- 512MB RAM minimum per service

### Estimated Monthly Cost (Small App)
- App Service: ~$17/month
- PostgreSQL: ~$5/month
- Total: ~$22/month

### Tips to Reduce Cost
- Use Railway's sleep functionality for dev environments
- Optimize database queries
- Use caching to reduce resource usage
- Delete unused services

## Backup & Recovery

Railway automatically:
- Backs up PostgreSQL daily
- Keeps 7 days of backups
- Provides point-in-time recovery

Manual backup:
```bash
# In Railway console
php artisan db:backup
```

## Security Best Practices

1. Never commit `.env` file
2. Use Railway's reference syntax for sensitive data
3. Enable HTTPS (automatic on Railway)
4. Regularly update dependencies
5. Monitor logs for suspicious activity
6. Use Railway's built-in secrets management

## CI/CD Integration

Railway automatically deploys when you push to GitHub:
- Push to main branch → Production deployment
- Push to other branches → Preview deployment
- Pull requests → Preview deployments

To disable auto-deploy:
1. Go to project settings
2. Click "GitHub"
3. Disable "Auto-deploy on push"
