# 03 - Technology Stack & Architecture Specifications

## 1. Core Framework & Modern Runtime

| Technology | Version / Specification | Role & Architecture Rationale |
| :--- | :--- | :--- |
| **Next.js** | `^14.2.x` (App Router, 15/16 ready) | Static Site Generation (SSG) for tool pages, dynamic API route handlers for database transactions, zero-runtime overhead |
| **React & React DOM** | `^18.3.x` | Modern declarative component architecture, hooks, and concurrent hydration |
| **TypeScript** | `^5.6.x` | Strict type safety (`strict: true`), eliminating runtime null/undefined errors |
| **Node.js** | `>= 20.x LTS` | Serverless edge execution and local development environment |

---

## 2. Database & Cloud Persistence: Neon Serverless PostgreSQL

To support high-scale global usage, user saved calculations, shareable report URLs, user feedback, and platform telemetry:

| Technology | Role & Integration |
| :--- | :--- |
| **Neon Serverless Postgres (`@neondatabase/serverless`)** | Serverless PostgreSQL with auto-scaling compute, zero connection limits, connection pooling over WebSockets/HTTPS, and sub-10ms response times. |
| **Privacy Separation Model** | Actual file bytes and sensitive transformation data remain 100% in-browser. The database strictly stores non-sensitive calculation presets (e.g., Etsy price breakdown snapshots), user feedback ratings, and aggregated tool hit counters. |

---

## 3. Styling & Design System

| Library | Role & Justification |
| :--- | :--- |
| **Tailwind CSS (`^3.4.x`)** | Zero runtime CSS with strict CSS variables matching approved brand tokens (#2563EB, #0F172A, #F8FAFC, #FFFFFF, #16A34A). |
| **`clsx` & `tailwind-merge`** | Dynamic class merging without CSS specificity collisions. |
| **Lucide React (`^0.453.x`)** | Tree-shakeable SVG icon set. |

---

## 4. Specialized Client Libraries

| Library | Role |
| :--- | :--- |
| **`qrcode` (`^1.5.4`)** | In-browser canvas and SVG QR code matrix generation. |
| **`heic2any`** | Client-side conversion of Apple iPhone HEIC/HEIF images to standard JPEG/PNG format. |
| **Web Crypto API** | Native hardware-accelerated SHA-1, SHA-256, SHA-512, and CSPRNG UUID generation. |

---

## 5. Testing & Quality Assurance

| Tool | Purpose |
| :--- | :--- |
| **Vitest (`^2.1.x`)** | Lightning-fast native ESM test runner for computational engines and utilities. |
| **React Testing Library (`^16.x`)** | Component interaction, keyboard navigation, and accessibility audits. |
| **Playwright** | Cross-browser End-to-End automation testing. |
| **ESLint (`^8.57.x`)** | Static code analysis with `eslint-config-next`. |
