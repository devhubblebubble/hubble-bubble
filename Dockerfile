FROM php:8.1-fpm

RUN apt-get update && apt-get install -y \
    nginx curl zip unzip git \
    libpng-dev libonig-dev libxml2-dev libfreetype6-dev libjpeg62-turbo-dev libzip-dev \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo pdo_mysql mbstring xml gd zip bcmath

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app
COPY . .

RUN composer install --no-dev --optimize-autoloader
RUN npm install && npm run build

EXPOSE 8080
CMD echo "APP_KEY=$APP_KEY" > .env && \
    echo "APP_ENV=$APP_ENV" >> .env && \
    echo "APP_DEBUG=$APP_DEBUG" >> .env && \
    echo "APP_URL=$APP_URL" >> .env && \
    echo "DB_CONNECTION=$DB_CONNECTION" >> .env && \
    echo "DB_HOST=$DB_HOST" >> .env && \
    echo "DB_PORT=$DB_PORT" >> .env && \
    echo "DB_DATABASE=$DB_DATABASE" >> .env && \
    echo "DB_USERNAME=$DB_USERNAME" >> .env && \
    echo "DB_PASSWORD=$DB_PASSWORD" >> .env && \
    php artisan config:clear && \
    php artisan cache:clear && \
    php artisan view:clear && \
    php artisan storage:link && \
    php artisan serve --host=0.0.0.0 --port=8080
