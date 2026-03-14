# Sanguihedral Project Context

## Overview
Sanguihedral is a Vampire: The Masquerade (V5) character sheet and dice roller application.
- **Backend:** Node.js Express API with MongoDB (Mongoose).
- **Frontend:** React (Vite) application.

## Directory Structure
- `BACKEND_sanguihedral/`: Express API source code.
- `FRONTEND_sanguihedral/`: React frontend source code.

## Testing Strategy
- **Backend:** Jest with `supertest` and `mongodb-memory-server`.
  - Tests are located in `BACKEND_sanguihedral/tests/`.
  - Configuration in `BACKEND_sanguihedral/jest.config.js` and `BACKEND_sanguihedral/tests/setup.js`.
- **Frontend:** Vitest (to be implemented) with React Testing Library.

## Coding Standards
- Use `eslint` for linting.
- Follow existing patterns in controllers, routes, and models.
- Ensure all new features or bug fixes are covered by tests.

## Known Issues & Debugging
- Backend tests should use an in-memory database. Ensure `app.js` does not connect to the live DB or start the server during tests.
