# 03 - Technology Stack & Dependency Strategy

## 1. Core Framework & Runtime

| Technology | Version / Requirement | Role & Justification |
| :--- | :--- | :--- |
| **Node.js** | `>= 20.x LTS` | Stable execution environment with native `crypto` and `fetch` support |
| **Next.js** | `^14.2.x` (App Router) | Industry standard for Static Site Generation (SSG), automatic font optimization, built-in metadata API, zero runtime server overhead |
| **React & React DOM** | `^18.3.x` | Modern component model, concurrent rendering, and battle-tested ecosystem |
| **TypeScript** | `^5.4.x` | Strict type checking (`strict: true`), eliminating runtime null/undefined crashes |

---

## 2. Styling & Design System

| Library | Role & Justification |
| :--- | :--- |
| **Tailwind CSS (`^3.4.x`)** | Utility-first CSS engine with zero runtime overhead, purged production stylesheets, and first-class design token configuration via CSS variables |
| **PostCSS & Autoprefixer** | Cross-browser CSS vendor prefixing |
| **`clsx` & `tailwind-merge`** | Conditional class merging without CSS specificity collisions (`cn` utility) |
| **Lucide React (`^0.400.x`)** | Lightweight, tree-shakeable SVG icon library with consistent 24px stroke styling |

---

## 3. Data Validation & Client Utilities

| Library | Role & Justification |
| :--- | :--- |
| **Zod (`^3.23.x`)** | Declarative schema validation for user inputs, tool configuration files, and search queries |
| **`qrcode` (`^1.5.x`)** | Browser-compatible, lightweight canvas/SVG QR code generator with zero native binary bindings |
| **Web Crypto API** (Browser Native) | Zero-dependency cryptographic hashing (SHA-256, SHA-512) and UUID generation via standard W3C APIs |

---

## 4. Quality Assurance, Testing & Tooling

| Tool | Version / Purpose |
| :--- | :--- |
| **Vitest (`^1.6.x`)** | Lightning-fast Vite-powered unit test runner with native ESM and TypeScript support |
| **React Testing Library (`^15.x`)** | User-centric component testing simulating real browser interactions |
| **Playwright (`^1.45.x`)** | Cross-browser (Chromium, Firefox, WebKit) End-to-End automation testing for tool workflows and mobile responsiveness |
| **ESLint (`^8.57.x`)** | Static code analysis with `eslint-config-next` for Core Web Vitals checks |
| **Prettier (`^3.3.x`)** | Automated opinionated code formatting with `prettier-plugin-tailwindcss` |

---

## 5. Dependency Compatibility & Lockdown Protocol

To guarantee stability, reproducible builds, and security:
1. **Exact Pinning**: All dependencies in `package.json` are installed with locked versions, strictly tracking `package-lock.json`.
2. **Zero Backend Bloat**: No ORM (Prisma/Drizzle), no database drivers (PostgreSQL/MongoDB), no authentication libraries (NextAuth/Clerk), and no heavy server frameworks.
3. **Bundle Size Budgets**:
   - Total First Load JS target: `< 85 KB` gzipped for tool pages.
   - Heavy client libraries (e.g., CodeMirror or heavy formatters) must be dynamically loaded via `next/dynamic` with `ssr: false`.
