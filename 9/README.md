1.  ПЕРЕХОДЫ И АНИМАЦИИ: transition И animation
📌 transition - плавные переходы
css
/* Базовый синтаксис */
.element {
    transition: свойство время функция задержка;
}

/* Пример */
.button {
    background: blue;
    transition: background 0.3s ease, transform 0.2s ease;
}

.button:hover {
    background: red;
    transform: scale(1.1);
}
Особенности:

✅ Для простых изменений (hover, focus)

✅ Анимирует от А до Б

✅ Срабатывает при изменении свойства

❌ Нельзя повторять бесконечно

Функции времени:

Функция	Описание
ease	Плавное начало и конец
linear	Равномерно
ease-in	Медленно → быстро
ease-out	Быстро → медленно
ease-in-out	Медленно → быстро → медленно
📌 animation - сложные анимации
css
/* 1. Определяем ключевые кадры */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: scale(0.8);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
}

/* 2. Применяем */
.card {
    animation: fadeIn 0.5s ease forwards;
}

.loading {
    animation: pulse 1s ease-in-out infinite;
}
Особенности:

✅ Сложные, многошаговые анимации

✅ Можно повторять бесконечно

✅ Не зависит от действий пользователя

✅ Использует @keyframes

Свойства animation:

css
.card {
    animation-name: fadeIn;
    animation-duration: 0.5s;
    animation-timing-function: ease;
    animation-delay: 0s;
    animation-iteration-count: 1;      /* 1, infinite */
    animation-direction: normal;       /* normal, reverse, alternate */
    animation-fill-mode: forwards;     /* none, forwards, backwards */
}
📌 Отличия transition и animation
transition	animation
Сложность	Простой	Сложный
Ключевые кадры	❌ Нет	✅ Да (@keyframes)
Управление	При изменении свойств	Независимое
Повторение	Один раз	Можно бесконечно
Пример	Ховер кнопки	Загрузка, появление
📌 Когда использовать
transition:

css
/* ✅ Наведение на кнопки */
.button {
    transition: all 0.3s ease;
}
.button:hover {
    background: #45a049;
    transform: translateY(-2px);
}

/* ✅ Плавное изменение цвета */
.input {
    transition: border-color 0.3s ease;
}
.input:focus {
    border-color: #667eea;
}
animation:

css
/* ✅ Появление элементов */
.card {
    animation: fadeIn 0.5s ease forwards;
}

/* ✅ Бесконечная анимация */
.loader {
    animation: spin 1s linear infinite;
}

/* ✅ Многошаговая анимация */
@keyframes slideIn {
    0% { opacity: 0; transform: translateX(-50px); }
    50% { opacity: 0.5; transform: translateX(10px); }
    100% { opacity: 1; transform: translateX(0); }
}

2. ФАЙЛ PACKAGE.JSON
📌 Что такое package.json
package.json - это главный файл Node.js проекта, который содержит:

Информацию о проекте

Список зависимостей

Команды для запуска

json
{
  "name": "my-project",
  "version": "1.0.0",
  "description": "Мой проект",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
  "dependencies": {
    "express": "^4.18.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.0"
  },
  "author": "Иван",
  "license": "MIT"
}
📌 Для чего используется
Назначение	Описание
Управление зависимостями	Список нужных пакетов
Запуск скриптов	Команды для запуска проекта
Информация о проекте	Название, версия, автор
Установка пакетов	npm install читает этот файл
📌 Ключевые поля
json
{
  "name": "project-name",           // Название проекта
  "version": "1.0.0",               // Версия (semver)
  "description": "Описание",        // Краткое описание
  "main": "index.js",               // Точка входа
  "scripts": {                      // Команды для запуска
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
  "dependencies": {                 // Основные зависимости
    "express": "^4.18.0"
  },
  "devDependencies": {              // Зависимости для разработки
    "nodemon": "^2.0.0"
  },
  "author": "Иван",                 // Автор
  "license": "MIT"                  // Лицензия
}
📌 Скрипты (scripts)
json
{
  "scripts": {
    "start": "node index.js",           // npm start
    "dev": "nodemon index.js",          // npm run dev
    "test": "jest",                     // npm test
    "build": "webpack --mode production", // npm run build
    "lint": "eslint src/**/*.js"        // npm run lint
  }
}
Запуск:

bash
npm start          # Запускает "start"
npm run dev        # Запускает "dev"
npm run build      # Запускает "build"
📌 Зависимости
json
{
  "dependencies": {
    "express": "^4.18.0",      // ^ - обновлять минорные версии
    "react": "~18.2.0",        // ~ - обновлять патчи
    "axios": "1.3.0",          // Только эта версия
    "lodash": "*"              // Последняя версия
  }
}
Тип	Когда нужны	Примеры
dependencies	Для работы приложения	React, Express, Axios
devDependencies	Только для разработки	Nodemon, Webpack, ESLint
📌 Основные команды
bash
# Создать package.json
npm init -y

# Установить все зависимости
npm install

# Установить пакет (сохранить в dependencies)
npm install express

# Установить пакет (сохранить в devDependencies)
npm install nodemon --save-dev

# Удалить пакет
npm uninstall express

# Обновить пакеты
npm update
🎯 Шпаргалка
Transition vs Animation
transition	animation
Простота	✅ Простой	❌ Сложный
Ключевые кадры	❌	✅
Повторение	❌	✅
Для hover	✅	❌
Для появления	❌	✅
package.json
Команда	Что делает
npm init -y	Создать package.json
npm install	Установить все зависимости
npm install express	Установить пакет
npm run dev	Запустить скрипт