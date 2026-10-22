# 03 - Technology Stack & Architecture Specifications

## 1. Core Framework & Modern Runtime

| Technology | Version / Specification | Role & Architecture Rationale |
| :--- | :--- | :--- |
| **Next.js** | `^16.4.2` (App Router, mandatory 16+) | Static Site Generation (SSG) for tool pages, dynamic API route handlers for database transactions, asynchronous request APIs (`params`), zero-runtime overhead |
| **React & React DOM** | `^19.3.1` | Modern declarative component architecture, hooks, concurrent hydration, React 19 optimizations |
| **TypeScript** | `^5.6.3` | Strict type safety (`strict: true`), eliminating runtime null/undefined errors |
| **Node.js** | `>= 22.0.0 LTS` | Serverless edge execution and local runtime environment (Node.js 22+ mandatory LTS requirement) |

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
| **React Testing Library (`^16.3.x`)** | Component interaction, keyboard navigation, and accessibility audits compatible with React 19. |
| **Playwright** | Cross-browser End-to-End automation testing. |
| **ESLint (`^9.x`)** | Static code analysis via standard ESLint CLI (`eslint .`) with `eslint-config-next` (`16.4.x`). |
