# FIFA 2026 Referee Management API

## Description
Backend API built with Node.js, Express, PostgreSQL, and Sequelize for managing referees, matches, and assignments.

## Setup
1. Clone repository.
2. Run `npm install`.
3. Create a PostgreSQL database and update `.env` with credentials.
4. Run `npm start` (or `npm run dev` for nodemon).

## Endpoints
- `/api/arbitres` – CRUD referees.
- `/api/matchs` – CRUD matches.
- `/api/affectations` – CRUD assignments.
- `/api/arbitres/:id/matchs` – get matches for a referee.
- `/api/matchs/:id/arbitres` – get referees for a match.
- Bonus: search/filter endpoints.

## Testing
Use Postman collection (included in repository as `RefTech-API.postman_collection.json`).

## Technologies
Node.js, Express, PostgreSQL, Sequelize.