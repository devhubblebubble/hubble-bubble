FROM php:8.1-fpm

RUN apt-get update && apt-get install -y \
    nginx curl zip unzip git \
    libpng-dev libonig-dev libxml2-dev libfreetype6-dev libjpeg62-turbo-dev libzip-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo pdo_mysql mbstring xml gd zip bcmath

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app
COPY . .

RUN composer install --no-dev --optimize-autoloader
RUN cp .env.example .env && php artisan key:generate

EXPOSE 8080
CMD php artisan serve --host=0.0.0.0 --port=8080
