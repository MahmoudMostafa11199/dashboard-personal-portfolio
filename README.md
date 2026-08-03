# Personal Portfolio Dashboard

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-Firestore%20%26%20Auth-FFCA28?logo=firebase&logoColor=black)
![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?logo=vercel&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)

A full-featured personal dashboard for managing and showcasing my professional
profile — projects, skills, work experience, certifications, and team
collaborators — all backed by Firebase and deployed on Vercel.

## Tech Stack

- **Frontend:** React, TypeScript, React Router
- **Styling:** Tailwind CSS (with container queries for nested-layout responsiveness)
- **State/Data:** TanStack Query (React Query), React Hook Form
- **Backend/Database:** Firebase Authentication, Firestore
- **Media:** ImageKit (image hosting, upload, and on-the-fly transformations)
- **Deployment:** Vercel

## Features

- **Dashboard Home** — at-a-glance overview with stats cards, recent
  activity feed, in-progress project breakdown, and a skills category chart
- **Projects** — full CRUD with status tracking, completion percentage,
  assignees, tech stack tags, live/GitHub links, and image uploads
- **Skills** — categorized skill management with search and filtering
- **Experiences** — a timeline of work and training history, linked to
  specific skills used
- **Certifications** — credential tracking with issuer search, image
  uploads, and verification links
- **Team Members** — manage collaborators who can be assigned to projects
- **Settings** — profile photo, password changes, and account management
- **Responsive design** — fully responsive across mobile, tablet, and
  desktop, including a collapsible sidebar drawer on smaller screens

## Getting Started

### Prerequisites

- Node.js 18+
- A Firebase project (Firestore + Authentication enabled)
- An ImageKit account

### Installation

```bash
git clone https://github.com/MahmoudMostafa11199/dashboard-personal-portfolio.git
cd dashboard-personal-portfolio
npm install
```

### Environment Variables

Create a `.env` file in the project root with your Firebase and ImageKit
credentials:

```bash
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

VITE_IMAGEKIT_PUBLIC_KEY=
VITE_IMAGEKIT_URL_ENDPOINT=
IMAGEKIT_PRIVATE_KEY=
```

> Note: if deploying to Vercel, add these same variables under
> **Project Settings → Environment Variables**, since your local `.env`
> file is not included in the deployment.

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

## Project Structure

```bash
├── api/                # Vercel serverless functions (e.g. ImageKit auth)
├── public/              # Static assets
└── src/
    ├── context/          # React context providers (e.g. Sidebar state)
    ├── features/         # Feature-based modules (projects, skills,
    │                        experiences, certifications, members,
    │                        dashboard, settings, authentication)
    ├── hooks/            # Shared custom hooks
    ├── layout/           # App shell — Header, Sidebar, Footer, DashboardLayout
    ├── pages/            # Route-level page components
    ├── routes/           # Route definitions / router setup
    ├── seeds/            # One-off Firestore seed scripts
    ├── services/         # Firebase/Firestore API functions per feature
    ├── styles/           # Global styles
    ├── ui/               # Shared/reusable UI components (Modal, FormRow,
    │                        EmptyState, SearchableSelect, PageHeader, etc.)
    ├── utils/            # Constants and helper functions
    ├── App.tsx
    └── main.tsx
```

## Deployment

This project is deployed on Vercel. A `vercel.json` rewrite is included to
ensure client-side routes resolve correctly on direct navigation/refresh
(without interfering with the `/api` serverless functions used for
ImageKit authentication).

## License

This project is proprietary. See [LICENSE](./LICENSE) for details.
