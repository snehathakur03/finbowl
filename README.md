# Fin Bowl System

A React + Vite front-end for managing loan applicants and disbursements — built as part of a React assignment.

## Features

- **Applicant Details Page** — tabbed view of an applicant's loan details, broker info, commission, documents, disbursements, notes, and activity log.
- **Disbursement Page** — table of disbursements with metrics summary, filters, pagination, loading skeleton, and error state handling.
- Reusable common components (Button, Badge, StatusBadge, Avatar, Toggle, SectionCard, DetailTable, etc.) shared across pages.
- App layout with sidebar and top bar navigation.

## Tech Stack

- [React 19](https://react.dev/)
- [Vite](https://vitejs.dev/) (with Rolldown)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Oxlint](https://oxc.rs/) for linting

## Project Structure

```
src/
  components/
    applicant/       # Applicant details page and its sections
    disbursement/     # Disbursement list page, table, filters, pagination
    layout/            # Sidebar, top bar, app shell
    common/           # Shared UI primitives
  data/               # Mock data used during development
  hooks/              # Custom hooks (e.g. useDisbursements)
```

## Getting Started

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Lint the code:

```bash
npm run lint
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Notes

Data is currently sourced from local mock files (`src/data/mockApplicant.js`, `src/data/mockDisbursements.js`). Swapping in a live API means replacing the mock imports in `useDisbursements` (and the applicant page) with real `fetch` calls, while keeping the existing loading/error/empty states already built into the disbursement page (`TableSkeleton`, `ErrorState`, `EmptyState`).
