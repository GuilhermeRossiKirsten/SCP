# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

**Development:**
```bash
npm run dev          # Start Docker (PostgreSQL), wait for DB, run migrations, then Next.js dev server
npm run services:up  # Start PostgreSQL container only
npm run services:stop
npm run services:down
```

**Testing:**
```bash
npm test             # Start services + Next.js dev server, then run full integration test suite
npm run test:watch   # Jest watch mode (requires services already running)
```
Tests run with `--runInBand` (serial). Each test file typically calls `orchestrator.clearDatabase()` and `orchestrator.runPendingMigrations()` in `beforeAll`, so they are order-independent but must run against a live Next.js server on port 3000 and a live PostgreSQL instance.

To run a single test file:
```bash
npx jest tests/integration/api/v1/users/post.test.js --runInBand --verbose
```

**Database migrations:**
```bash
npm run migrations:up                          # Apply pending migrations against .env.development
npm run migrations:create -- <migration-name>  # Scaffold a new migration file in infra/migrations/
```

**Linting:**
```bash
npm run lint:prettier:check   # Check formatting
npm run lint:prettier:fix     # Fix formatting
npm run lint:eslint:check     # Run ESLint with auto-fix
```

**Commits:**
```bash
npm run commit   # Interactive Commitizen prompt — use this instead of plain git commit
```
Commit messages must follow Conventional Commits (`feat:`, `fix:`, `chore:`, etc.) enforced by CommitLint via Husky pre-commit hook.

## Architecture

### Layers and their contracts

**`app/api/`** — Next.js Route Handlers. Each file handles HTTP method routing, calls into the models layer, and maps errors to HTTP responses. Error handling follows the pattern: catch custom error classes from `infra/errors.js`, call `.toJSON()`, and return `NextResponse.json(error.toJSON(), { status: error.statusCode })`.

**`models/`** — Business logic. Pure JS modules that interact with the database. Never import from `app/`. Each model receives plain arguments and returns plain objects. Key modules:
- `user.js` — CRUD with case-insensitive uniqueness (uses `LOWER()` in queries)
- `authentication.js` — validates credentials, returns session
- `password.js` — bcrypt wrapping; rounds are `14` in production and `1` in development (env-aware)
- `session.js` — creates 48-byte hex tokens with 30-day expiration stored in the DB
- `migrator.js` — wraps `node-pg-migrate` for programmatic use

**`infra/`** — Infrastructure primitives.
- `database.js` — opens a new `pg.Client` per query (no persistent pool); SSL enabled only when `NODE_ENV === "production"`
- `errors.js` — all custom error classes (`ValidationError`, `NotFoundError`, `UnauthorizedError`, `RateLimitError`, `BadGatewayError`, `InternalServerError`). Each has a `statusCode` field and a `toJSON()` method. Add new error types here.
- `compose.yaml` — PostgreSQL 16 Docker service
- `migrations/` — versioned migration files managed by `node-pg-migrate`

**`components/`** — React `.tsx` components (UI only, no business logic). Interactive effects (mouse cursor, particles, parallax, Konami code, system invasion) are isolated in their own components.

**`lib/markdown.ts`** — Custom markdown-to-HTML parser (no external markdown library). Handles frontmatter extraction, syntax highlighting via Prism.js, tables, images, and code blocks with 20+ languages. C++ gets extra highlighting for `std::`, templates, and STL types.

**`content/articles/`** — Markdown files with YAML frontmatter (`date`, `author`, `tags`). Article metadata is parsed and used for client-side filtering on the articles page.

### Database conventions

- Primary keys: `UUID` generated with `gen_random_uuid()`
- Timestamps: `TIMESTAMPTZ` in UTC using `timezone('utc', now())`
- Uniqueness: enforced with `LOWER()` for case-insensitive comparison (username, email)
- Sessions table references `users(id)` via `user_id`

### Test conventions

Tests live in `tests/integration/api/v1/` and are HTTP-level integration tests against the running Next.js app. The `orchestrator.js` module provides:
- `waitForAllServices()` — polls `/api/v1/status` until 200
- `clearDatabase()` — drops and recreates the `public` schema
- `runPendingMigrations()` — runs all pending migrations
- `createUser(overrides?)` — calls `/api/faker` for realistic data, then creates a user via the model

Always call `clearDatabase` + `runPendingMigrations` in `beforeAll` for each test file.

### Environment

`.env.development` is committed and holds local Docker credentials — this is intentional for the development workflow. Production credentials are managed separately (Vercel environment variables). SSL and bcrypt rounds are controlled by `NODE_ENV`.

### Frontend notes

- Tailwind CSS v4 (PostCSS plugin, not config file)
- Smooth scroll is implemented with Lenis (initialized in `app/page.tsx`)
- SWR is used for client-side data fetching (e.g., GitHub repos, Last.fm)
- Framer Motion handles section animations
- Fonts loaded via `next/font/google`: Roboto, Oswald, Alex Brush, Libre Baskerville
