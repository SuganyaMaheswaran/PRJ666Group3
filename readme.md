# SettleCAN

**Your all-in-one settlement companion for newcomers to Canada.**
SettleCAN helps international students, immigrants, and newcomers navigate their Canadian settlement journey with personalized task checklists, deadline tracking, curated official guidance, and a supportive community — replacing scattered government pages and spreadsheets with one organized dashboard.

[![CI](https://github.com/SuganyaMaheswaran/PRJ666Group3/actions/workflows/ci.yml/badge.svg)](https://github.com/SuganyaMaheswaran/PRJ666Group3/actions/workflows/ci.yml)
[![Node](https://img.shields.io/badge/node-%3E%3D20-brightgreen)](https://nodejs.org/)

---

## Table of Contents

- [Project Overview & Motivation](#project-overview--motivation)
- [Key Features](#key-features)
- [Tech Stack & Architecture](#tech-stack--architecture)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Roadmap](#roadmap)
- [License & Acknowledgments](#license--acknowledgments)

---

## Project Overview & Motivation

Settling in a new country involves dozens of time-sensitive, high-stakes tasks — work permit renewals, health coverage enrollment, PR pathway paperwork, housing applications — spread across government portals, forums, and word-of-mouth advice. Missing a deadline can mean losing status or a permit.

**SettleCAN** centralizes that process. It gives newcomers a personalized checklist and timeline based on their immigration status (international student, permit holder, PR applicant, etc.), sends reminders before deadlines, and pairs official guidance with a peer community for the questions that official sources don't answer.

**Target audience:** International students, work-permit holders, and immigrants settling in Canada — plus, on the admin side, staff who curate the informational content and moderate the community.

**Core goals:**
- Reduce missed deadlines through proactive, personalized reminders.
- Consolidate fragmented government/settlement information into one trustworthy hub.
- Give newcomers a peer community for practical, lived-experience advice.

## Key Features

- **Personalized Task Checklists & Timelines** — Onboarding captures immigration status, arrival date, and permit/visa details, then generates a tailored checklist (`task_templates` + `user_tasks`) with due dates, calendar and timeline views, and progress tracking.
- **Document & Compliance Tracking with Reminders** — Tracks permit expiries and key compliance dates, and can trigger both in-app and email notifications (via Nodemailer/Gmail) so nothing slips past its deadline.
- **Curated Immigration Info Hub** — Structured guidance on work eligibility, health coverage, language testing, housing support, the PR pathway, and IRCC updates, kept current via an admin-managed content system.
- **Community Q&A & FAQ** — Authenticated users can post questions and browse a moderated FAQ, supplementing official information with peer knowledge.
- **In-App & Email Notifications** — Real-time notification center (mark as read / read-all) backed by Supabase, with optional email delivery for critical reminders.
- **Admin Content Management** — CRUD interface for publishing, updating, and archiving informational articles shown across the info hub.

## Tech Stack & Architecture

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, Vite, React Router 7, React-Bootstrap / Bootstrap 5, Sass (SCSS), Vitest + Testing Library |
| **Backend** | Node.js, Express 5, Supabase JS client (auth + Postgres), Nodemailer, Pino / pino-http (structured logging) |
| **Database & Auth** | Supabase (PostgreSQL) for data storage; Supabase Auth for signup/login/password reset, JWT bearer tokens |
| **DevOps / Tooling** | Docker (multi-stage builds, non-root containers), Docker Compose, Nginx (frontend static serving), GitHub Actions CI (lint, `npm audit`, Semgrep SAST, tests), Husky + lint-staged (pre-commit ESLint/Prettier), Jest + Supertest (backend tests) |

### Architecture Overview

SettleCAN is a two-tier client/server app:

- **`frontend/SettleCAN-Client`** — a React SPA (Vite-built) that talks to the API over `/api`, proxied to the backend in dev and configured via `VITE_API_URL` in production. Built into static assets and served by Nginx in Docker.
- **`backend`** — an Express REST API (`app.js` / `server.js`) organized by domain routers (`auth`, `profile`, `tasks`, `content`, `community`, `notifications`, `info`), with a `requireAuth` middleware that validates Supabase JWTs on protected routes. Supabase Postgres is the system of record (schema in `backend/db/init`); Supabase Auth issues and verifies user sessions; Nodemailer sends transactional reminder emails.
- Both services are independently containerized (`backend/Dockerfile`, `frontend/SettleCAN-Client/Dockerfile`) and wired together via `docker-compose.yml` for local/integration use.

```
┌────────────────────┐        /api (JWT bearer)       ┌──────────────────────┐
│  React SPA (Vite)   │ ───────────────────────────▶  │  Express REST API     │
│  served by Nginx     │ ◀───────────────────────────  │  (auth, tasks, etc.)  │
└────────────────────┘                                 └──────────┬────────────┘
                                                                     │
                                                     Supabase client │
                                                                     ▼
                                                        ┌─────────────────────┐
                                                        │ Supabase (Postgres  │
                                                        │  + Auth)            │
                                                        └─────────────────────┘
```

## Getting Started

### Prerequisites

- **Node.js v20+** and npm
- A **Supabase** project (URL + anon key) — used for both the database and authentication
- A **Gmail account with an App Password** (optional, only required for email reminders)
- **Docker & Docker Compose** (optional, for containerized runs)

### 1. Clone the repository

```bash
git clone https://github.com/SuganyaMaheswaran/PRJ666Group3.git
cd PRJ666Group3V1
```

### 2. Install dependencies

```bash
npm run install:all
```

This installs dependencies for both `backend` and `frontend/SettleCAN-Client`.

### 3. Configure environment variables

**Backend** — copy `backend/.env.example` to `backend/.env`:

```bash
cp backend/.env.example backend/.env
```

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
FRONTEND_URL=http://localhost:3000
PORT=5000

# Optional — required only for email reminders
GMAIL_USER=your-address@gmail.com
GMAIL_APP_PASSWORD=your-gmail-app-password
```

**Frontend** — copy `frontend/SettleCAN-Client/.env.example` to `.env` in the same folder:

```bash
cp frontend/SettleCAN-Client/.env.example frontend/SettleCAN-Client/.env
```

```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Set up the database

Apply the schema in `backend/db/init` (`setup.sql`, then `supabase_migration.sql`) to your Supabase project via the SQL editor or CLI.

### 5. Run the project

From the repo root, run both services together:

```bash
npm run dev
```

- Backend → http://localhost:5000
- Frontend → http://localhost:3000

Or run each independently:

```bash
npm run dev:backend
npm run dev:frontend
```

**Alternative — Docker Compose:**

```bash
docker compose up --build
```

- Backend → http://localhost:5000
- Frontend → http://localhost:8080

### Running tests

```bash
npm test          # frontend (Vitest)
npm run lint       # frontend lint
cd backend && npm test   # backend (Jest + Supertest)
```

## API Endpoints

All routes are prefixed with `/api`. Routes marked 🔒 require a `Authorization: Bearer <token>` header.

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/auth/register` | Create an account (email, password, immigration profile) |
| `POST` | `/auth/login` | Authenticate and receive a session token |
| `POST` | `/auth/forgot-password` | Send a password reset email |
| `POST` | `/auth/reset-password` | Complete a password reset |
| `POST` | `/auth/logout` | End the current session |
| `GET` | `/auth/me` | Get the current authenticated user |
| `GET` `/PATCH` 🔒 | `/profile` | Get or update the current user's profile |
| `GET` `/PUT` 🔒 | `/profile/:user_id` | Get or update a specific user's profile |
| `GET` 🔒 | `/tasks` | List the current user's tasks and checklist items |
| `POST` 🔒 | `/tasks` | Create a custom task |
| `PATCH` 🔒 | `/tasks/:id` | Update task status, due date, or notes |
| `DELETE` 🔒 | `/tasks/:id` | Remove a task |
| `GET` 🔒 | `/tasks/templates` | List reusable task templates by category |
| `POST` 🔒 | `/tasks/templates/:templateId/assign` | Assign a template task to the current user |
| `GET` | `/content` | List published informational articles |
| `GET` | `/content/:id` | Get a single article |
| `POST` `/PATCH` `/DELETE` 🔒 | `/content` | Create, update, or remove articles (admin) |
| `GET` 🔒 | `/community/posts` | List community Q&A posts |
| `POST` 🔒 | `/community/posts` | Submit a community question |
| `GET` | `/community/faq` | List moderated FAQ entries |
| `GET` 🔒 | `/notifications` | List the current user's notifications |
| `POST` 🔒 | `/notifications` | Create a notification (optionally emailed) |
| `PATCH` 🔒 | `/notifications/:id/read` \| `/read-all` | Mark notification(s) as read |
| `POST` 🔒 | `/notifications/send-email` | Send a one-off email reminder |
| `GET` | `/info/work-permit`, `/info/health`, `/info/language` | Curated informational content by topic |

## Roadmap

- [ ] Admin moderation queue for community Q&A (approve/answer flow)
- [ ] Push notifications alongside in-app and email reminders
- [ ] Multi-language support for the info hub and checklists
- [ ] Document upload and storage for permits/IDs
- [ ] Analytics dashboard for admins (content engagement, common questions)
- [ ] Automated task-template updates when IRCC policy changes

## License & Acknowledgments

This project does not yet have a `LICENSE` file — **MIT** is used above as a placeholder; confirm the intended license and add the corresponding `LICENSE` file before publishing.

Built as a capstone project for **PRJ666 (Seneca Polytechnic)** by:

- Suganya Maheswaran
- Rasa Reiszadeh
- Vivian
- Xenia
- TUWANN
- Qry

Thanks to the Supabase, React, and Express open-source communities whose tools made this project possible.
