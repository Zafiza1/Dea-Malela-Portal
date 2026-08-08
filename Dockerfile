FROM php:8.2-apache

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    libapache2-mod-xsendfile \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo pdo_mysql pdo_pgsql mbstring exif pcntl bcmath gd

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy application files
COPY . /var/www/html

# Copy entrypoint script
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader

# Install Node.js and npm
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

# Install npm dependencies and build assets
RUN npm install && npm run build

# Copy environment file (Vercel will provide environment variables)
RUN cp .env.example .env || true

# Enable Apache modules
RUN a2enmod rewrite headers

# Configure Apache for Laravel
RUN echo "Listen 8080" > /etc/apache2/ports.conf && \
    cat > /etc/apache2/sites-available/000-default.conf <<EOF
<VirtualHost *:8080>
    ServerAdmin webmaster@localhost
    DocumentRoot /var/www/html/public
    
    <Directory /var/www/html/public>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
    
    ErrorLog \${APACHE_LOG_DIR}/error.log
    CustomLog \${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
EOF

# Set permissions
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html/storage \
    && chmod -R 755 /var/www/html/bootstrap/cache

# Expose port (Vercel expects port 8080)
EXPOSE 8080

# Use entrypoint script
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
