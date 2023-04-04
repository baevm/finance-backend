[Задание](https://github.com/dezzerlol/finance-backend/blob/master/MEGACOUNT%20%D0%A2%D0%B5%D1%81%D1%82%D0%BE%D0%B2%D1%8B%D0%B5%20%D0%B7%D0%B0%D0%B4%D0%B0%D0%BD%D0%B8%D1%8F%20%D0%BD%D0%B0%20%D0%B2%D0%B0%D0%BA%D0%B0%D0%BD%D1%81%D0%B8%D1%8E%20%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B8%D1%81%D1%82%D0%B0%20(%D0%A3%D1%87%D0%B5%D1%82%D0%BD%D0%B0%D1%8F%20%D0%BA%D0%BD%D0%B8%D0%B3%D0%B0%20%D1%84%D0%B8%D0%BD%D0%B0%D0%BD%D1%81%D0%BE%D0%B2).pdf)

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
