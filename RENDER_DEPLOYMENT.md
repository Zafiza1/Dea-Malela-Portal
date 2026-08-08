# Render Deployment Guide

## Prerequisites
- GitHub account with your project pushed
- Render account (free tier available)
- Understanding of PostgreSQL (Render provides built-in database)

## Render Free Tier Limits

### Web Services
- **Free**: 750 hours/month (~31 days continuous)
- **Web Service**: 512MB RAM, 0.1 CPU
- **After free tier**: $7/month for basic web service

### PostgreSQL Database
- **Free**: 90 days trial
- **After trial**: $7/month for basic PostgreSQL
- **Storage**: 1GB included

## Deployment Steps

### 1. Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Authorize Render to access your repositories

### 2. Deploy Using render.yaml (Recommended)

#### Option A: Automatic Deployment
1. Go to [render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Render will detect `render.yaml` file
5. Click "Deploy"

#### Option B: Manual Configuration
If render.yaml is not detected:
1. Click "New +" → "Web Service"
2. Connect repository: `Zafiza1/Dea-Malela-Portal`
3. Configure settings:
   - **Name**: dea-malela-portal
   - **Environment**: PHP
   - **Build Command**: `composer install --no-dev --optimize-autoloader && npm install && npm run build`
   - **Start Command**: `php artisan serve --host=0.0.0.0 --port=$PORT`

### 3. Add PostgreSQL Database

1. Click "New +" → "PostgreSQL"
2. Configure:
   - **Name**: dea-malela-db
   - **Database**: dea_malela
   - **User**: dea_malela_user
3. Click "Create Database"
4. Wait for database to be ready (~2-3 minutes)

### 4. Configure Environment Variables

Go to your web service → "Environment" and add these variables:

#### Required Variables
```
APP_ENV=production
APP_DEBUG=false
APP_KEY=base64:W7wsAxNuMf6bQO3YPS9637RDAL1HdC+KaMWFcfrmJUg=
APP_URL=https://dea-malela-portal.onrender.com
```

#### Database Variables (Render will auto-connect if using render.yaml)
If not using render.yaml, add these manually:
```
DB_CONNECTION=pgsql
DB_HOST=your-database-host.a1.render.com
DB_PORT=5432
DB_DATABASE=dea_malela
DB_USERNAME=dea_malela_user
DB_PASSWORD=your-database-password
```

#### Cache & Session
```
CACHE_DRIVER=file
SESSION_DRIVER=file
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

### 5. Run Database Migrations

#### Option A: Through Render Shell
1. Go to your web service in Render
2. Click "Shell" tab
3. Run: `php artisan migrate --force`

#### Option B: Using Render Deploy Hooks
1. Go to web service → "Advanced"
2. Add "Deploy Hook"
3. Command: `php artisan migrate --force`

### 6. Build Assets

Assets should build automatically during deployment. If not:

1. Open Render Shell
2. Run: `npm run build`

### 7. Storage Link

Run this in Render Shell:
```bash
php artisan storage:link
```

### 8. Update APP_URL

After deployment, update `APP_URL` with your actual Render URL:
```
APP_URL=https://your-app-name.onrender.com
```

## Post-Deployment Checklist

- [ ] Database migrations completed
- [ ] Assets built successfully
- [ ] Storage link created
- [ ] Environment variables set correctly
- [ ] Application accessible at Render URL
- [ ] Database connection working
- [ ] Login functionality tested

## Custom Domain (Optional)

### Using Custom Domain
1. Go to web service → "Custom Domains"
2. Add your domain (e.g., deamalela.com)
3. Update DNS records:
   - Type: CNAME
   - Name: www
   - Value: your-app-name.onrender.com
4. Update `APP_URL` environment variable

### Using Render Domain
Render provides free domain: `https://your-app-name.onrender.com`

## Monitoring & Logs

### View Logs
1. Go to your web service
2. Click "Logs" tab
3. View real-time logs and deployment history

### Metrics
1. Go to "Metrics" tab
2. View CPU, memory, and response time metrics

### Alerts
1. Go to "Settings" → "Alerts"
2. Configure email/SMS alerts for:
   - Service down
   - High error rate
   - High response time

## Scaling

### Free Tier Limitations
- 512MB RAM
- 0.1 CPU
- Spin up time: ~30-60 seconds when inactive
- Spins down after 15 minutes of inactivity

### Paid Scaling
Upgrade in web service → "Settings":
- **Standard**: $7/month, 1GB RAM, 1 CPU
- **Pro**: $25/month, 2GB RAM, 2 CPUs
- **Custom**: Higher specs available

## Troubleshooting

### Build Fails
**Symptoms**: Build errors during deployment

**Solutions**:
- Check build logs in Render dashboard
- Ensure `composer.json` and `package.json` are correct
- Verify PHP version compatibility (Render uses PHP 8.2+)
- Check for missing dependencies

### Database Connection Issues
**Symptoms**: SQLSTATE connection errors

**Solutions**:
- Verify database credentials match Render's PostgreSQL
- Check if database service is running
- Ensure `DB_CONNECTION=pgsql` is set
- Test connection in Render Shell: `php artisan tinker`

### Assets Not Loading
**Symptoms**: 404 errors for CSS/JS files

**Solutions**:
- Run `php artisan storage:link` in Shell
- Ensure `npm run build` completed
- Check `public/build` directory exists
- Clear cache: `php artisan cache:clear`

### Application Not Starting
**Symptoms**: Service shows "Crashed" status

**Solutions**:
- Check logs for specific errors
- Verify all environment variables are set
- Ensure `APP_KEY` is correct
- Check if port conflicts (Render uses `$PORT`)

### Slow Performance
**Symptoms**: Slow response times

**Solutions**:
- This is normal on free tier (0.1 CPU)
- Consider upgrading to paid plan
- Optimize database queries
- Implement caching

### Migration Issues
**Symptoms**: Database schema errors

**Solutions**:
- Check migration files in `database/migrations`
- Run specific migration: `php artisan migrate:rollback`
- Fresh install: `php artisan migrate:fresh --seed`

## Cost Management

### Free Tier Optimization
- Service spins down after 15 minutes inactivity
- First request takes 30-60 seconds to wake up
- 750 hours/month = ~31 days continuous

### Reduce Costs
- Use render.yaml for efficient deployment
- Optimize assets to reduce build time
- Implement database query optimization
- Use caching to reduce database load

### Cost Breakdown (After Free Trial)
- Web Service: $7/month (standard)
- PostgreSQL: $7/month (basic)
- **Total**: ~$14/month

## Security Best Practices

1. **Never commit `.env` file**
2. **Use Render's secrets management**
3. **Enable HTTPS** (automatic on Render)
4. **Regularly update dependencies**
5. **Monitor logs for suspicious activity**
6. **Use strong database passwords**
7. **Implement rate limiting**
8. **Keep Laravel updated**

## CI/CD Integration

Render automatically deploys when you push to GitHub:
- Push to main branch → Production deployment
- Push to other branches → Preview deployments
- Pull requests → Preview deployments

### Disable Auto-Deploy
1. Go to web service → "Settings"
2. Disable "Auto-Deploy"
3. Deploy manually when needed

## Backup & Recovery

### Database Backups
Render automatically:
- Backs up PostgreSQL daily
- Keeps 7 days of backups
- Provides point-in-time recovery

### Manual Backup
In Render Shell:
```bash
php artisan db:backup
```

### Restore from Backup
1. Go to PostgreSQL service
2. Click "Backups"
3. Select backup to restore
4. Click "Restore"

## Performance Optimization

### Caching
Enable caching in environment:
```
CACHE_DRIVER=redis
```

Add Redis service in render.yaml if needed.

### Asset Optimization
- Minify CSS/JS files
- Use CDN for static assets
- Enable gzip compression
- Lazy load images

### Database Optimization
- Add indexes to frequently queried columns
- Use eager loading (with(), join())
- Implement pagination
- Use database caching

## Alternative Deployment Options

### If Render Free Trial Expires

**Option 1: Fly.io**
- Free tier: 3 VMs/regions
- Good for Laravel with Docker
- See guide for Fly.io setup

**Option 2: Zeabur**
- Free tier available
- Easy PHP/Laravel deployment
- Built-in database options

**Option 3: Self-hosted**
- Use VPS (DigitalOcean, Linode)
- $5-10/month
- Full control over environment

## Getting Help

### Render Documentation
- [docs.render.com](https://docs.render.com)
- [Render Community](https://community.render.com)

### Laravel Documentation
- [laravel.com/docs](https://laravel.com/docs)

### Support
- Render: support@render.com
- Laravel: laracasts.com/forum
