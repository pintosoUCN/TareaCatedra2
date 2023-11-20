## Backend
1. composer install
2. cp .env.example .env
3. php artisan key:generate
4. php artisan migrate
5. php artisan serve
6. Si da problema de caché:
    6.1. php artisan config:cache
    6.2. php artisan route:cache

## Frontend
1. npm install
2. ng serve --o