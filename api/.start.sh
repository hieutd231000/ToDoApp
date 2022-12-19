!/bin/bash

composer install
php artisan passport:install
php artisan migrate
php artisan passport:keys
php artisan key:generate
echo "run..."