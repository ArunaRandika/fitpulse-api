# FitPulse API

Small Express + TypeScript API with health and exercise endpoints.

## Endpoints

- `GET /api/health`
- `GET /api/exercises`
- `GET /api/exercises?bodyPart=legs`
- `GET /api/exercises/search?q=cardio`
- `GET /api/exercises/:id`

## Exercise response shape

Each exercise includes:

- `id`
- `name`
- `bodyPart`
- `category`
- `instructions`

## Scripts

- `npm run dev` — run the API with `ts-node`
- `npm run build` — compile TypeScript to `dist/`
- `npm start` — run the compiled API

## Quick start

1. Install dependencies: `npm install`
2. Start in dev mode: `npm run dev`
3. Open `http://localhost:3000/api/exercises`
