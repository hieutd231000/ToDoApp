# Run API with Docker
## Prerequisites
- Docker
- The `.env` file must be the same as the `.env.example` file
## Build
`docker-compose build app`

`docker-compose up -d`

`docker-compose exec app /bin/bash -c "/.start.sh"`
## Run
`docker-compose up -d`

`docker-compose exec app php artisan migrate`

GET: localhost:8000/api/test