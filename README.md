# DataLouna Test

This repository contains the code for the Datalouna Test project.

## Запуск через Docker Compose

1. npm run docker:build

2. docker-compose up -d

Swagger документация будет доступна по адресу http://localhost:3100/api

## Запуск без docker


1. Нужно создать `.development.env` по аналогии с `.deploy.env`.

2. npm ci

3. npm run start:dev

## Стэк

- Nest.js
- Docker
- PostgreSQL
- PrismaORM
- Cache Manager
- Swagger

## Примечание

При запуске сервера сразу запустится подтягивание данных с сайта https://openrouter.ai/api/v1/models, если нужно проверить без этого подтягивания то нужно убрать вызов метода в конструкторе src/modules/models/services/cron.service.ts