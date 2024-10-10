# DataLouna Test

This repository contains the code for the Datalouna Test project.

## Эндпоины из задания

1. GET /items
2. POST /market
BODY {skinName: string}
skinName можно взять любой из роута 1, к примеру "1st Lieutenant Farlow | SWAT"

## Запуск через Docker Compose

1. npm run docker:build

2. docker-compose up -d

Swagger документация будет доступна по адресу http://localhost:3100/api

## Запуск без docker


1. Нужно создать `.env` по аналогии с `.deploy.env`.

2. npm ci

3. npm run start:dev

## Стэк

- Nest.js
- Docker
- PostgreSQL
- PrismaORM
- Cache Manager
- Swagger
