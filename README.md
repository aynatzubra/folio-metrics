# Folio-Metrics v0.2.0

Welcome to Folio-Metrics, a full-stack open-source project that serves as a live, interactive resume and showcases a modern approach to web development.

This project is more than just a static portfolio; it's a dynamic application with real-time visitor analytics, built with performance and professional practices in mind.

**[Live Demo](https://arbuz.buzz) | [Admin Panel Demo](https://arbuz.buzz/admin/login)**  
_(Note: Use `demo@example.com` / `demo123` for the admin panel)_

## ✨ Core Features

- **Interactive Resume:** A clean, modern presentation of a professional profile.
- **Live Visitor Analytics:** A custom-built tracking system that records visits, location, session duration, and most viewed sections.
- **Admin Dashboard:** A secure, login-protected panel (`next-auth`) to visualize all collected analytics.
- **Internationalization (i18n):** Supports multiple languages with locale-aware routing (`next-intl`).

## 📊 What's new in v0.2.0 — Analytics Dashboard

Version **v0.2.0** focuses on making the admin panel feel like a real product analytics tool, not just a raw list of records.

### Admin Analytics Dashboard

- **Traffic Overview section**
    - Line chart for **daily visits** with a smooth area graph.
    - Horizontal bar chart for **top sections** (which part of the CV is viewed most).
    - Range switcher for **7 / 14 / 30 days** with server-side filtering:
        - `/api/admin/stats/daily?days=7|14|30`
        - `/api/admin/stats/sections?days=7|14|30`

- **Recent Visits table**
    - "Last 50 Visits" with:
        - section name (`hero`, `skills`, `education`, ...),
        - pseudo-geo location (city + country),
        - time on section,
        - visit timestamp.
    - Client-side pagination (**10 rows per page**) with sticky header and internal scroll:
        - the table header stays visible,
        - only the table body scrolls.

- **Demo mode banner**
    - Admin header clearly shows when the panel is opened in **Demo** mode (public demo credentials).
    - This highlights that the admin panel is part of the product, not just a technical screen.

- **Lazy-loaded charts**
    - ECharts and analytics charts are loaded **lazily** via `next/dynamic` inside a client boundary.
    - Initial dashboard render stays fast; the heavy chart bundle is loaded only when needed.

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Database:** MariaDB with Prisma ORM
- **Authentication:** NextAuth.js (Auth.js v5)
- **UI:** Headless UI, FontAwesome
- **Data Fetching:** SWR

## 🗺️ Roadmap

🚀 **v0.3.0 — Optimization & SEO**

- Implement data caching strategies for the analytics API.
- Add lazy loading for heavy components in the admin dashboard (charts are already lazy).
- Generate `sitemap.xml` and `robots.txt` for better search engine visibility.
- Implement dynamic meta-tags for improved SEO.
- Add theme (light/dark).

🏆 **v1.0.0 — Production Ready**

- Full test suite (Unit, Integration, E2E).
- CI/CD pipeline with GitHub Actions for automated testing and deployment.
- (Optional) Headless CMS for landing page content.
- Personal accounts with individual dashboards and personal statistics.

## 🚀 Getting Started

Follow these steps to get a local copy up and running.

### Prerequisites

- Node.js (v20.x or later)
- pnpm
- A running MariaDB instance

### Installation

1. Clone the repo:
    ```sh
    git clone https://github.com/devforthewin/folio-metrics.git
    ```
2. Navigate to the project directory:
    ```sh
    cd folio-metrics
    ```
3. Install dependencies:
    ```sh
    pnpm install
    ```
4. Set up your environment variables by copying `.env.example` to `.env` and filling in your database URL and `NEXTAUTH_SECRET`:
    ```sh
    cp .env.example .env
    ```
5. Apply database migrations:
    ```sh
    pnpm prisma migrate dev
    ```
6. Seed the database with demo data:
    ```sh
    pnpm prisma db seed
    ```
7. Run the development server:
    ```sh
    pnpm dev
    ```

Open [http://localhost:3000](http://localhost:3000) to view the project.