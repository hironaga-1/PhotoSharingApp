FROM php:8.1.16-fpm

# Viteのサーバーにローカルからアクセスするために開ける
EXPOSE 5173

ENV COMPOSER_ALLOW_SUPERUSER=1 \
    COMPOSER_HOME=/composer

# COPY php.ini
COPY ./php.ini /usr/local/etc/php/php.ini

# Composer install
COPY --from=composer:2.5.4 /usr/bin/composer /usr/bin/composer

# install Node.js
COPY --from=node:18.14.2 /usr/local/bin /usr/local/bin
COPY --from=node:18.14.2 /usr/local/lib /usr/local/lib

RUN apt-get update && \
    apt-get -y install --no-install-recommends git unzip libzip-dev libicu-dev libonig-dev && \
    apt-get -y install curl iputils-ping procps vim tree && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* && \
    docker-php-ext-install intl pdo_mysql zip bcmath
    
WORKDIR /data