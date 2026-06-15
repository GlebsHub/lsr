# Каталог квартир

Тестовое SPA для фильтрации и просмотра квартир. Данные приходят из мок-API (MSW), отдельный бэкенд не нужен.

## Демо

[Открыть на GitHub Pages](https://glebshub.github.io/lsr/)

## Стек

- React 19 + TypeScript
- Vite
- TanStack Query — загрузка и кэширование списка
- Zustand — состояние фильтров и модального окна
- MSW — имитация `GET /api/apartments`
- Sass + BEM
- rc-slider — слайдеры в фильтрах

## Быстрый старт

```bash
npm install
npm run dev
```

## Скрипты

| Команда | Описание |
|---------|----------|
| `npm run dev` | Режим разработки |
| `npm run build` | Production-сборка |
| `npm run preview` | Просмотр собранного приложения |
| `npm run lint` | Проверка ESLint |

## Функциональность

- Фильтры: комнаты, площадь, этаж, планировка, статус сдачи
- Список карточек с основными полями квартиры
- Модальное окно с деталями и галереей
- Адаптивная вёрстка от 375px

Фильтры применяются с небольшой задержкой (debounce), список обновляется автоматически.

## API (MSW)

`GET /api/apartments`

| Параметр | Описание |
|----------|----------|
| `rooms` | Список комнат через запятую, например `1,2,4` (4 = 4+) |
| `areaMin`, `areaMax` | Диапазон площади, м² |
| `floorMin`, `floorMax` | Диапазон этажа |
| `layoutType` | `studio` \| `euro` \| `free` |
| `deliveryStatus` | `delivered` \| `not_delivered` |

Ответ:

```json
{
  "data": [/* Apartment[] */],
  "total": 12
}
```

В моке 25 квартир с разными параметрами.

## Деплой (GitHub Pages)

Деплой настроен через GitHub Actions (`.github/workflows/deploy.yml`). При пуше в `main` проект автоматически собирается и публикуется.

### Первый запуск

1. Создайте репозиторий [lsr](https://github.com/new) на GitHub (без README, .gitignore и лицензии).
2. В корне проекта:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<username>/lsr.git
git push -u origin main
```

3. В репозитории: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

После успешного workflow демо будет доступно по адресу `https://<username>.github.io/lsr/`.

MSW работает и в production-сборке — демо не требует реального бэкенда.
