# Folio-Metrics v0.2.0

**Folio-Metrics** is a professional-grade open-source portfolio built with **Next.js 15**. This project is designed as an architecture showcase, moving beyond a simple CV to demonstrate production-ready engineering patterns, data persistence, and high-performance metrics.

**[Live Demo](https://arbuz.buzz) | [Admin Panel](https://arbuz.buzz/admin/login)** *(Credentials: `demo@example.com` / `demo123`)*

---

## ✨ Core Features

* **Hybrid Analytics Engine:** Powered by the **Repository Pattern**. The system automatically switches between `LocalStorage` (Demo mode) and `PostgreSQL/Supabase` (Production) without modifying business logic.
* **Concurrency Management:** Implements the **Web Locks API** to prevent data race conditions when multiple browser tabs are recording metrics simultaneously.
* **Smart Data Orchestration:** Features a service layer with **"Time-shifting"** logic — historical mock data is automatically rejuvenated to the current date, ensuring vibrant and relevant charts in the demo dashboard.
* **Privacy-First Tracking:** Custom-built `SectionObserver` for engagement metrics, avoiding intrusive third-party cookies.
* **Performance-Driven:** Achieves a **100/100 Lighthouse score** in Best Practices. Utilizes **Dynamic Imports** and lazy loading for heavy visualization libraries (ECharts).

---

## 📊 Architecture & Patterns

The project follows **Clean Architecture** and **Dependency Inversion** (DI) principles, strictly decoupling the UI from infrastructure details.

### How it works:
1.  **Interface (`IMetricsRepository`)**: Defines a strict contract for data persistence.
2.  **Strategy Injection**: The `AnalyticsProvider` detects the environment and injects the appropriate implementation:
    * `LocalStorageMetricsRepository`: For standalone browser-only operation.
    * `HttpMetricsRepository`: For client-to-server network communication in Production.
    * `NoopMetricsRepository`: Ensures hydration stability during SSR.
3.  **MetricsService**: Acts as an orchestrator, preparing and filtering data for the visualization processors.

---

## 🛠️ Tech Stack

* **Framework:** Next.js 15 (App Router), TypeScript.
* **Architecture:** Feature-Sliced Design (FSD).
* **Data Layer:** Prisma ORM, PostgreSQL (Supabase), Web Locks API.
* **Auth:** Auth.js v5 (Edge-compatible, JWT Strategy, DB-less sessions).
* **Visualization:** Apache ECharts.
* **i18n:** Full multi-language support via `next-intl`.

---

## 🚀 Getting Started

### "Zero-Config" Development
The project is designed to run out-of-the-box in demo mode without requiring a database setup.

1.  **Clone & Install:**
    ```sh
    git clone [https://github.com/devforthewin/folio-metrics.git](https://github.com/devforthewin/folio-metrics.git)
    cd folio-metrics
    pnpm install
    ```

2.  **Run Locally:**
    ```sh
    pnpm dev
    ```

### Production Mode
To enable the full PostgreSQL/Supabase suite, create a `.env` file based on `.env.example`:
```env
NEXT_PUBLIC_ANALYTICS_MODE=prod
DATABASE_URL="postgresql://user:password@host:port/db"