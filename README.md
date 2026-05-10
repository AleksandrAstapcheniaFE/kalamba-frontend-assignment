# Kalamba Games — Frontend Engineer Assignment

Implementation of the Conduit / RealWorld frontend assignment with a production-oriented React + TypeScript setup, modular feature structure, typed API layer, Docker support, and behaviour-focused tests.

---

## Stack

| Area | Choice |
| --- | --- |
| UI | React 17 + TypeScript |
| Bundler | Vite |
| Routing | React Router v5 |
| Server Cache | TanStack Query v4 |
| HTTP Client | Axios |
| Auth State | Zustand + persist middleware |
| Forms | React Hook Form + Zod |
| Testing | Vitest + Testing Library + jsdom |
| Styling | Original Conduit CSS |

---

## Architecture Notes

The original assignment ships with a deliberately minimal and flat structure.  
This implementation uses a Feature-Sliced–inspired architecture to improve scalability, separation of concerns, and maintainability.

### Directory Structure

| Path | Responsibility |
| --- | --- |
| `src/app` | Application bootstrap, providers, router, Axios client, auth interceptors |
| `src/pages` | Route entrypoints and page composition |
| `src/features/*` | Vertical feature slices (`auth`, `article`, `profile`, etc.) |
| `src/entities/*` | Shared domain entities, query keys, mappers, and types |
| `src/shared/*` | Shared utilities and reusable UI primitives |
| `src/widgets/*` | Application-level UI blocks (header, layout, navigation) |
| `docs/schema` | OpenAPI / Swagger contract reference |

### Design Decisions

- React Query is used for server-state synchronization and cache management.
- Query keys are centralized to avoid string-based cache invalidation.
- Feature modules encapsulate API, model, and UI concerns.
- Favorite mutations merge updates into cache collections to reduce unnecessary refetching and list flicker.
- Authentication state is persisted using Zustand middleware.
- API contracts are mapped into view-oriented models inside entity mappers.

---

## Repository Map

| Path | Role |
| --- | --- |
| `src/app` | Router configuration, providers, root API client, auth handling |
| `src/pages` | Route-level composition |
| `src/features/article` | Article feed, article details, editor, favorite mutations |
| `src/features/auth` | Login flow and authentication-related routes |
| `src/features/profile` | Profile view, tabs, authored/favorited article lists |
| `src/entities/article` | Article types, mappers, query keys, cache helpers |
| `docs/schema/swagger.json` | RealWorld OpenAPI schema |
| `docker-compose.yml` | Local backend + Postgres setup |
| `Dockerfile` | Production frontend image using nginx |

---

## Key Highlights


- Feature-Sliced Design architecture for scalable and maintainable structure
- Strict separation of UI, business logic, and data layers
- Centralized API layer with Axios interceptors and typed contracts
- React Query for server-state synchronization with cache optimization
- Optimistic updates for smoother UX and reduced refetching
- Persistent authentication state using Zustand middleware
- Form validation handled via React Hook Form + Zod schema integration

---

## Runbook

### Install dependencies

```bash
npm ci
```

### Start development server

```bash
npm run dev
```

### Build production bundle

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Run linter

```bash
npm run lint
```

### Run tests

```bash
npm run test
```

### Run tests once

```bash
npm run test -- --run
```

---

## Environment Variables

| Variable | Description | Default |
| --- | --- | --- |
| `VITE_API_URL` | Base API URL | `http://localhost:3000/api` |

---

## Backend Setup

The assignment backend can be started with Docker Compose.

### Start backend

```bash
docker-compose up
```

### Reset database

```bash
docker-compose run --rm api npm run db:reset
```

### Stop services

```bash
docker-compose down --remove-orphans
```

Backend API root:

```text
http://localhost:3000/
```

---

## Frontend Docker Build

### Build image

```bash
docker build -t kalamba-frontend-assignment .
```

### Run container

```bash
docker run --rm -p 8080:80 kalamba-frontend-assignment
```

Application URL:

```text
http://localhost:8080/
```

---

## Notes

- The project intentionally keeps the original Conduit UI and API contract.
- Production builds are generated into the `dist/` directory.
- Docker image serves the application through nginx.
- The project was implemented with a focus on scalable architecture rather than minimal assignment structure, introducing a Feature-Sliced Design approach and modern state management patterns.
