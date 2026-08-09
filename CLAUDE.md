# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Personal portfolio website (jrueda.dev) built with Vite + React + TypeScript + shadcn-ui + Tailwind CSS. Originally scaffolded/synced via Lovable (see `lovable-tagger` dev dependency and `README.md`). Content (profile, projects, skills, experiences, certifications) is stored in Appwrite and fetched at runtime rather than hardcoded, except UI copy which is handled via i18next (`src/i18n/config.ts`, es/en).

## Commands

- `npm run dev` — start Vite dev server on port 3000
- `npm run build` — production build
- `npm run build:dev` — build in development mode (unminified, for debugging build issues)
- `npm run preview` — preview a production build locally
- `npm run lint` — run ESLint over the project

There is no test suite configured in this repo.

## Architecture

- **Routing**: `src/App.tsx` defines routes with `react-router-dom` (`/`, `/projects`, `/projects/:id`, `/contact`, catch-all `NotFound`). Wrapped in `Sentry.ErrorBoundary` → `ThemeProvider` → `QueryClientProvider` → `TooltipProvider`.
- **Data layer**: All dynamic content comes from Appwrite via `src/lib/appwrite.ts` (client/database/storage setup, reads config from `VITE_APPWRITE_*` env vars) and is consumed through React Query hooks in `src/hooks/` (`useProjects`, `useProfile`, `useSkills`, `useCertifications`, `useExperiences`, `useCategories`, `useSections`). Each hook wraps `databases.listDocuments`/`getDocument` with a `useQuery` and a `staleTime`. Follow this pattern (typed interface + hook file) when adding new Appwrite-backed data.
- **Sections vs pages**: `src/components/` holds the landing-page sections (`Hero`, `About`, `Experience`, `Skills`, `Certifications`, `Projects`, `Header`, `Footer`, `Logo`) rendered together on `Index.tsx`. `src/pages/` holds route-level pages (`Projects.tsx` list, `ProjectDetail.tsx`, `Contact.tsx`, `NotFound.tsx`). `src/components/ui/` is the shadcn-ui component library — treat as generated/vendor code, edit sparingly.
- **Theming**: `src/context/ThemeContext.tsx` provides light/dark theme state consumed across the app (including the standalone architecture-diagram HTML viewers at the repo root, which sync theme via this context/localStorage).
- **i18n**: `src/i18n/config.ts` defines all UI copy inline (es/en resources) using `i18next`/`react-i18next`. Add new UI strings here rather than hardcoding text in components.
- **Contact form backend**: `functions/send-contact-email/` is a separate Appwrite Function (Node) with its own `package.json`, deployed independently from the Vite app — see `appwrite.config.json` for its Appwrite project/function config and `appwrite.sh` for deployment scripting.
- **Path alias**: `@/*` maps to `src/*` (configured in `vite.config.ts` and `tsconfig`).
- **Error/perf monitoring**: Sentry is initialized in `src/lib/sentry.ts` (production-only) and wraps the app in `App.tsx`; failed React Query queries are also explicitly reported to Sentry.
- **Deployment**: Deployed on Vercel; `vercel.json` rewrites all paths to `index.html` for client-side routing.
- **Standalone architecture diagrams**: The `alms-*-architecture.html` files at the repo root are self-contained diagram viewers (not part of the Vite build) that sync with the site's theme.

## Verifying UI changes

Use the `playwright` Python CLI (installed at `~/.local/bin/playwright`, Python package at `~/.local/lib/python3.12/site-packages/playwright`) to visually verify frontend changes instead of `mcp__claude-in-chrome__*` tools, which have proven unreliable in this environment (intermittent "Cannot access a chrome-extension://" errors blocking screenshots/clicks). Write a small script with `sync_playwright()`, `page.goto(...)`, optionally `page.evaluate("document.documentElement.classList.add('light')")` to force the light theme (the app defaults to dark), then `page.screenshot(path=...)` and read the image back with the Read tool. The dev server must be running (`npm run dev`, port 3000) before navigating.

## Conventions

- ESLint has `@typescript-eslint/no-unused-vars` turned off and allows constant exports in fast-refresh files — don't reintroduce these as blocking rules.
- Env vars are Vite-style (`VITE_*`) and read via `import.meta.env`.
