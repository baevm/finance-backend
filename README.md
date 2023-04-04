# Локальный запуск проекта

1. Склонировать проект

````
git clone https://github.com/dezzerlol/finance-backend
````

2. Перейти в папку проекта
````
cd finance-backend
````

3. Запустить проект через Docker
````
docker-compose up
````

4. Проект доступен на
````
http://localhost:5000
````

## Без использования Docker:
1. Создать базу данных PostgreSQL
````
name: finance-db
username: postgres
password: 123456
port: 5432
host: localhost
````
2. Собрать проект
````
yarn build
````
3. Запустить проект
````
yarn start:prod
````
