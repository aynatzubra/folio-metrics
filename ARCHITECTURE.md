# 🏗 Folio-Metrics: Architecture Decisions

This document explains the **"Why"** behind the codebase. It outlines the structural decisions, trade-offs, and patterns used to build a production-ready, highly available portfolio.

## 1. Directory Structure (FSD-lite)
We use a lightweight **Feature-Sliced Design (FSD)** to prevent spaghetti code and enforce strict module boundaries.

* **🧱 Slices:** `app` (Routing), `widgets` (Complex UI), `features` (Interactions), `entities` (Business logic), `shared` (UI kit, libs).
* **🚪 Public API:** Every slice exports its public members via an `index.ts` barrel file.
> **Trade-off:** FSD requires more boilerplate, but it guarantees isolated, easily refactorable features (e.g., swapping out the analytics chart library won't break the app).

## 2. Data Flow (Dependency Inversion)
UI components are strictly decoupled from the database using the **Repository Pattern**.

* **Contract (`IMetricsRepository`):** Defines methods like `save()` and `getAll()`.
* **Implementations:** `PrismaMetricsRepository` (Server DB) and `HttpMetricsRepository` (Client API).
* **Business Logic (`MetricsService`):** Orchestrates data using injected repositories.
> **Why it matters:** UI components don't know if they are fetching from Supabase or LocalStorage. This makes testing trivial and allows seamless fallback mechanisms.

## 3. Hydration & Rendering Strategy
Next.js App Router relies on Server Components, which causes `#418 Hydration Errors` when rendering time-sensitive charts (Server UTC vs. Client Local Time).

* **Two-Pass Rendering:** Charts are wrapped in a mounting mechanism. The server renders a skeletal placeholder, and the client renders the ECharts canvas post-mount.
* **Reactive Updates:** Client mutations (recording a visit) trigger `router.refresh()`, forcing Server Components (like the Admin Table) to re-fetch without global state management (Redux/Zustand).

## 4. Resilience (Free-Tier Optimization)
To survive on a free Vercel + Supabase stack, the system defends itself:
* 🛡 **Rate Limiting:** In-memory `lru-cache` on the API route blocks simple DDoS scripts.
* 🧹 **Auto-Cleanup:** The repository retains only the last 100 records to prevent database overflow.
* 🐛 **Unified Logging:** A custom Logger Facade catches errors, suppressing noise in production `stdout` while staying ready for Sentry integration.