# Test assignment for Variant

**Репозиторий:** [https://github.com/rchuvilev/test-assignment-variant](https://github.com/rchuvilev/test-assignment-variant)

**Страница:** [https://rchuvilev.github.io/test-assignment-variant](https://rchuvilev.github.io/test-assignment-variant)

**Readme**: [https://rchuvilev.github.io/test-assignment-variant/readme.html](https://rchuvilev.github.io/test-assignment-variant/readme.html)

**Структура проекта**: 

- _apps/alt-shift-app_ - Frontend
- _apps/spin-api_ - Backend
- _packages/ui-kit_ - Shared компоненты UI (задел на будущее)

Поработал над системой компонентов и глобальных стилей.

В логике постарался соблюсти feature-slice подход к структуре и использованию.

## Технологический стек

### Frontend: React + TypeScript + Vite

**Vite**, потому что он удобен, быстр, современен и, как запомнил из разговора, используется в проектах Variant.

**React+TS** как требуемый стек по заданию, в виде SPA, а не SSR, так как там один сервис по сути. SEO оптимизации
можно впилить в html-темплейт, в случае очень необходимого сочетания статичного Semantic HTML с динамичными React-компонентами
можно сделать workaround с React.Portal-ами.

В виде **монорепо на turbopack** (также используется в проектах Variant), так как хотел разделить фронт и бекенд код,
плюс, добавить, например, отдельных микрофронтендов / переиспользовать компоненты как
отдельный ui-kit какой-нибудь.

Также бонусом turbopack является наиболее распространённые пресеты TypeScript + ESLint + Prettier, которые я собираюсь использовать.
Компенсация оверхеда монорепозитория - дальнейшие масштабируемость и удобство разработки.

### Backend: serverless функция на [Fermyon](https://www.fermyon.com/)

Требование - хранение данных на фронте + мы обсуждали на собесе идеи по хранению sensitive-данных в браузере.
Хотел закомпилировать ключ в WASM модуль, чтобы отдавал для нашего домена, но всё равно ключ должен попасть в браузерный запрос, так что залил как cloud функцию.

### Runtime: [Bun](https://bun.sh/)

Запускаться проект будет в Bun, потому что он быстр в установке зависимостей, разработке и удобен для монорепозиториев.
Ещё он имеет множество инструментов "из коробки", например, я собираюсь использовать как минимум поддержку WASM и встроенную
среду для unit-тестирования.

## Анализ

### Груминг и декомпозиция

#### Логика

Несколько раз переделывал (этого можно было избежать при согласовании с командой, но раз уж это моё тестовое...).

Идея была достичь наилучшего UX, чем я усложнил себе жизнь. Однако, достиг следующие фичи-проблемы-решения:

1) Я решил предоставить пользователю _возможность редактировать заявки_ (после оплаты подписки), поэтому храню стейт полей каждой заявки.
2) Я хотел _возможности видеть валидность в процессе заполнения поля_, не на onBlur (=> бесконтрольная нативная форма: любые хуки передергивают стейт, вызывая перерендер).

**Минусы**: немного велосипеда.

**Плюсы**: добился желаемого UX, организовал самописное в удобный класс / компоненты / хуки.


#### Frontend

1. **2 Скрина**: Дашборд, Форма
2. **4 Блока:**: Хедер, Письмо, Форма, CTA-Блок.
![analysis.blocks.png](https://github.com/rchuvilev/test-assignment-variant/blob/main/.readme/analysis.blocks.png?raw=true)
3. **5 Компонентов**: Карточка, счётчик, кнопка, типографика.
+ 3 основы в ui-ките: Базовая кнопка, Карусель, Иконки

#### Backend
Простая серверлесс-функция для запроса к OpenAI. Сейчас используется фоллбэк на основе предоставленного темплейта, судя по ошибке, ключ просрочился.

### Checks

[![Web vitals](https://github.com/rchuvilev/test-assignment-variant/blob/main/.readme/web-vitals.png?raw=true)](https://pagespeed.web.dev/analysis/https-rchuvilev-github-io-test-assignment-variant/frnu8gwxmz?form_factor=desktop)

[Head order analysis](https://rviscomi.github.io/capo.js/user/demo/?url=https%3A%2F%2Frchuvilev.github.io%2Ftest-assignment-variant%2F)
