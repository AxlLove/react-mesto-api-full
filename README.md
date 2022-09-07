# Проект: «Mesto» (React) + API

<div align="center">

<a href="https://axlstar.mesto.nomoredomains.xyz"><img src="https://github.com/AxlLove/Axllove/blob/master/src/mesto.PNG" alt="Место"></a>
<div align="center">https://axlstar.mesto.nomoredomains.xyz</div>
</div>

Данная работа реализована, для подтверждения и закрепления полученных знаний, в ходе учебного процесса на платформе [Яндекс.Практикума](https://practicum.yandex.ru/ "Сервис онлайн-образования от Яндекса"). В ней я практиковался в создании одностраничных приложений на фреймворке «React».

Здесь была существлена существенная доработка проекта mesto https://github.com/AxlLove/mesto

Была переписана функциональность на React.js, добавлен новый функционал. Был написан свой API для сохранения данных о пользователях, сохранения карточек в БД.

Проект был задеплоен на удаленный сервер.

## **Реализованный функционал на React:**
- Интерактивное редактирование имени и специализации профиля автора блога, во всплывающем Popup-окне
- Добавление пользователями новых фотографий различных мест с описаниями
- Выборочное удаление ранее добавленных карточек
- Возможность ставить/снимать отметку "Нравится" у понравившихся фотографий
- Счетчик лайкнувших карточку
- Увеличение фотографии по клику на карточке
- Регистрация/авторизация пользователя
- Защита роутов

## **Реализованный функционал Back-end:**
- Регистрация/авторизация/редактирование пользователей (с валидацией всех полей)
- Добавление/удаление лайка 
- Сохранение карточки в БД
- Логирование работы сервера

### Роуты:

### возвращает информацию о текущем пользователе
GET /users/me

### возвращает информацию о всех пользователях
GET /users/me

### возвращает информацию о  пользователе по id
GET /users/:userId

### обновляет информацию о пользователе (Имя описание)
PATCH /users/me

### обновляет информацию о аватаре (url)
PATCH /users/me/avatar


### возвращает все карточки
GET /cards

### добавляет карточку (Имя, url)
POST /cards

### удаляет сохранённый карточку по id
DELETE /cards/_id

### Cтавит лайк карточке (id)
PUT /cards/:cardId/likes

### Удаляет лайк карточке (id)
DELETE /cards/:cardId/likes

### Регистрация пользователя
POST /signup

### Авторизация пользователя
POST /signin

### Запуск

Используйте 'npm start' для запуска приложения

## Используемые навыки и технологии
* React
* HTML 5
* CSS 3
* FlexBox
* Адаптивная, кроссбраузерная верстка и файловая структура по методологии "БЭМ"
* node.js
* express.js
* mongoDB
* PM2
* nginx
* JWT
* CORS



### Ссылка на сервер и публичный ip

https://axlstar.mesto.nomoredomains.xyz - frontend
https://api.axlstar.mesto.nomoreparties.sbs - backend

 