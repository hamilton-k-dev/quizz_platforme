# QuizMaster

A full-stack quiz management platform built with Next.js 16, better-auth, Prisma 7, and Neon PostgreSQL. Includes an admin dashboard for managing quizzes, questions, students, and analytics, plus a student-facing interface for taking timed quizzes.

---

## Features

**Admin dashboard**
- Create and manage quizzes (publish / draft)
- Build an MCQ question bank with difficulty and subject filters
- View all student attempts with per-question answer review
- Results overview with grade badges (A–F) and pass/fail filter
- Student profiles with performance metrics
- Analytics charts: average scores, pass/fail donut, score trend, difficulty breakdown

**Student interface**
- Browse available quizzes with search and filters
- Interactive quiz player with countdown timer and navigation dots
- Score results + answer review after submission
- Personal results history and leaderboard

**Authentication**
- Email + password sign-in and registration
- Password reset via email (Resend)
- Route protection via `src/proxy.ts` (Next.js 16 proxy convention)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2 (App Router, Turbopack) |
| UI | React 19, Tailwind CSS v4 |
| Auth | better-auth v1 (email+password only) |
| ORM | Prisma 7 |
| Database | Neon (serverless PostgreSQL) |
| Email | Resend |
| Charts | recharts |
| Forms | react-hook-form + zod |
| Notifications | sonner |

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Copy `.env.example` and fill in all values:

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_APP_URL` | Public base URL (e.g. `http://localhost:3000`) |
| `BETTER_AUTH_URL` | Same as `NEXT_PUBLIC_APP_URL` |
| `BETTER_AUTH_SECRET` | Random secret — `openssl rand -base64 32` |
| `BETTER_AUTH_TRUSTED_ORIGINS` | Comma-separated trusted origins |
| `DATABASE_URL` | Pooled Neon PostgreSQL URL (runtime) |
| `DIRECT_URL` | Direct Neon PostgreSQL URL (migrations) |
| `RESEND_API_KEY` | Resend API key for password-reset emails |
| `EMAIL_FROM` | From address (e.g. `noreply@yourdomain.com`) |

### 3. Run database migrations

```bash
npm run db:migrate
```

### 4. Seed demo accounts

```bash
npm run db:seed
```

This creates the following accounts (idempotent — safe to re-run):

| Role | Email | Password |
|---|---|---|
| Admin | `admin@quizmaster.dev` | `Admin1234` |
| Student (×12) | `alice@school.edu` … `laura@school.edu` | `Student123` |

### 5. Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
src/
├── app/
│   ├── (auth)/              # Login, register, reset-password
│   ├── (protected)/         # Admin dashboard pages
│   │   ├── dashboard/
│   │   ├── quizzes/
│   │   ├── questions/
│   │   ├── attempts/
│   │   ├── results/
│   │   ├── students/
│   │   ├── analytics/
│   │   └── docs/            # In-app documentation
│   ├── student/             # Student-facing pages
│   │   ├── my-quizzes/
│   │   ├── results/
│   │   ├── leaderboard/
│   │   └── take-quiz/[id]/  # Interactive quiz player
│   └── api/auth/[...all]/   # better-auth handler
├── components/
│   ├── DashboardLayout.tsx
│   ├── StudentLayout.tsx
│   ├── Sidebar.tsx
│   ├── TopNavbar.tsx
│   └── StatCard.tsx
├── lib/
│   ├── auth.ts              # better-auth server config
│   ├── auth-client.ts       # better-auth client
│   ├── db.ts                # Prisma singleton (Neon adapter)
│   └── validations/auth.ts  # Zod schemas
└── proxy.ts                 # Route guard (Next.js 16 convention)

prisma/
├── schema.prisma            # User, Session, Account, Verification
├── seed.ts                  # Demo account seeder
└── migrations/

prisma.config.ts             # Prisma 7 config (datasource URL + seed)
```

---

## NPM Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start dev server (Turbopack) |
| `npm run build` | Production build with type-checking |
| `npm run db:migrate` | Run Prisma migrations |
| `npm run db:seed` | Seed database with demo accounts |
| `npm run db:studio` | Open Prisma Studio |

---

## Important: Next.js 16 & Prisma 7 Breaking Changes

This project targets Next.js **16.2** and Prisma **7.8** which have breaking changes from older versions:

- **Next.js 16**: `middleware.ts` is deprecated — use `src/proxy.ts` and export `proxy()` instead of `middleware()`. Dynamic route `params` are `Promise<{...}>` in server components — must `await params`.
- **Prisma 7**: `url` / `directUrl` removed from `datasource` block in `schema.prisma`. Connection URLs now live in `prisma.config.ts` (`datasource.url`) and are passed to `PrismaClient` via the Neon adapter constructor.

---

## Deployment

Deploy to [Vercel](https://vercel.com) or any platform that supports Node.js. Set all environment variables from `.env.example` in your hosting provider's dashboard.

> Make sure `DATABASE_URL` uses the **pooled** Neon connection string and `DIRECT_URL` uses the **direct (non-pooled)** connection string for Prisma migrations.
