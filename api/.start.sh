!/bin/bash

composer install
php artisan migrate
php artisan key:generate
echo "run..."