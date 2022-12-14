# Личный проект «Шесть городов (простой)»

* Студент: [Dmitry Pulsha](https://up.htmlacademy.ru/nodejs-api/2/user/1599147).
* Наставник: [Михаил Кислый](https://up.htmlacademy.ru/nodejs-api/2/user/1118577).

---

# Информация по проекту

## Структура проекта

### /src

Каталог с исходным кодом проекта.

### /markup

Каталог с примером разметки клиентской части.

### /mocks

Каталог тестовыми данными для генерации случайных предложений.
mock-server-data.json - файл с данными для сервера генерации данных

### /dist

Каталог для результатов сборки прокета
Создается после сборки проекта.

### /static

Каталог для размещения статических изображений

## База данных
### MongoDB

Используется MongoDB
Развертывание осуществляется с применением Docker
[docker-compose.yml](/docker-compose.yml) - файл конфигурации для запуска MongoDB

## Сценарии сборки

Основные сценарии, доступные для проекта.

### Очистка каталога сборки проекта

```bash
npm run clean
```
Выполняет очистку каталога `/dist` 

### Компиляция проекта

```bash
npm run compile
```
Копиляция осуществляется на основе настроек, указанных в файле `tsconfig.json`
результат компиляции размещается в каталоге /dist

### Сборка проекта

```bash
npm run build
```

Выполняется очистка и компиляция проекта : `npm run clean && npm run compile`

### Проверка линтером

```bash
npm run lint
```

Запуск проверки проекта с помощью `ESLint`.

## Сценарии запуска
### Подготовка к работе:
Перед запуском проекта должны быть: 
1) настроены переменные окружения (файл `.env` в корне проекта, см. раздел ниже)
2) Созданы и заполнены данными таблицы Cities и Features (в данной реализации таблицы заполняются при загрузке тестовых данных)

### Запуск проекта

предварительно должны быть установлены все npm-пакеты `npm i`, установлена, настроена база данных, установлены переменные окружения

```bash
npm start
```

Сценарий осуществляет сборку и запуск проекта  из каталога сборки `npm run build && node ./dist/main.js`.

## Запуск сервера в режиме разработки

```bash
npm run start:dev
```

Сценарий запускает проект в режиме разработки, используя исходный код проекта.
Запуск осуществляется с помощью пакета [nodemon](https://www.npmjs.com/package/nodemon).
Конфигурационный файл: `nodemon.json`.
При сохранении исходных файлов, проект перезапускается.

## Подготовка тестовых данных
### Запуск сервера с тестовыми данными (обязателен для генерации данных)

```bash
npm run mock:server
```
Данные для сервера расположены в файле `/mocks/mock-server-data.json`, команда запуска: `json-server ./mocks/mock-server-data.json --port 3123`
Генерация тестовых данных осуществляется при помощи CLI-интерфейса

## Command Line Interface (CLI)

```bash
./dist/cli.js
```
 Запуск CLI-интерфейса. при запуске без параметров запускается с командой `--help`
 Предварительно для `./dist/cli.js` должны быть предоставлены права на запуск. Например, `chmod u+x ./dist/cli.js`

## Переменные окружения

Для запуска проекта необходимо задать необходимые переменные окружения.
Переменные окружения задаются в файле `.env` в корневом каталоге проекта.
Пример заполнения приведен в файле `.env.example`.

**Важно:** в случае отсутствия значений у переменных окружения, приложение выдаст ошибку и завершит работу. 

### REST_HOST=localhost

Имя хоста, на котором запускается проект.

Тип поля - `строка`

Значение по умолчанию - `localhost`

### REST_PORT=4390

Порт, на котором запускается проект

Тип поля - `число`

значение по умолчанию - `4390`

### REST_DATABASE_URL=127.0.0.1 

IP-адрес сервера с базой данных (MongoDB)

Тип данных - `строка`, формат - `ipaddress`

Значение по умолчанию - `127.0.0.1`

### REST_DATABASE_PORT=null

Порт для подключения к БД.

Тип поля - `число`

значение по умолчанию - `отсутствует`

### REST_DATABASE_NAME=test

Имя базы данных проекта

Тип поля - `строка`

значение по умолчанию - `test`

### REST_DATABASE_USER=null

Имя пользователя с правами администратора БД.

Тип данных - `строка`

Значение по умолчанию - `отсутствует`

### REST_DATABASE_PWD=null

Пароль пользователя с правами администратора БД.

Тип данных - `строка`

Значение по умолчанию - `отсутствует`

### REST_UPLOAD_DIRECTORY=upload-img

Директория для загрузки файлов от Пользователя

Тип данных - `строка`

Значение по умолчанию - `upload-img`

### REST_STATIC_DIRECTORY=static

Путь к директории со статичными ресурсами.

Тип данных - `строка`

Значение по умолчанию - `static`

### SALT=null

Строка для кодирования пароля (соль)

Тип данных - `строка`

Значение по умолчанию - `отсутствует`

### REST_JWT_SECRET=null

Ключ для подписи JWT

Тип данных - `строка`

Значение по умолчанию - `отсутствует`---

<a href="https://htmlacademy.ru/profession/fullstack"><img align="left" width="50" height="50" title="HTML Academy" src="https://up.htmlacademy.ru/static/img/intensive/nodejs/logo-for-github-2.png"></a>

Репозиторий создан для обучения на профессиональном онлайн‑курсе «[Node.js. Профессиональная разработка REST API](https://htmlacademy.ru/profession/fullstack)» от [HTML Academy](https://htmlacademy.ru).
