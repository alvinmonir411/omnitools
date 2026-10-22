# 07 - Phased Implementation Plan & Milestone Roadmap

## 1. Execution Principles

To maintain software quality and avoid regressions, development proceeds through sequential, self-contained milestones. Each milestone must satisfy its verification gate before the next milestone begins.

---

## 2. Milestone Roadmap

```
Milestone 0: Documentation & Architectural Approval (CURRENT)
      │
      ▼
Milestone 1: Project Scaffolding, TypeScript, Tailwind & Tooling
      │
      ▼
Milestone 2: Design System & Core Reusable UI Component Primitives
      │
      ▼
Milestone 3: Global Shell, Navigation, Layouts & Ad Slot Skeletons
      │
      ▼
Milestone 4: Tool Engine Foundation & MVP Batch 1 (4 Developer Tools)
      │
      ▼
Milestone 5: MVP Batch 2 (Text, Media & Productivity Tools)
      │
      ▼
Milestone 6: SEO Engine, Schema.org Generator & Educational Content Pages
      │
      ▼
Milestone 7: Adsterra Sandboxing, Cookie Consent & Privacy Legal Pages
      │
      ▼
Milestone 8: Test Automation (Unit + E2E), Core Web Vitals Audit & Deployment
```

---

## 3. Milestone Breakdown & Acceptance Criteria

### Milestone 0: Documentation & Architectural Approval (Current)
- **Objective**: Establish complete specifications, design rules, technology selections, and testing strategies before any application code is written.
- **Deliverables**:
  - `AGENTS.md`
  - `docs/01-PROJECT-OVERVIEW.md` through `docs/09-DECISIONS.md`
- **Acceptance Criteria**: All documents drafted, clear architectural consensus, zero unresolved fundamental blockers.

---

### Milestone 1: Project Scaffolding & Tooling Setup
- **Objective**: Initialize the repository with Next.js App Router, TypeScript, Tailwind CSS, Vitest, and Playwright.
- **Key Tasks**:
  - Initialize Next.js project with pinned dependencies in `package.json`.
  - Configure `tsconfig.json` with strict type checking.
  - Set up Tailwind CSS (`tailwind.config.ts`) with design tokens (#2563EB primary, #0F172A text, #F8FAFC background, #FFFFFF surface, #16A34A success).
  - Configure ESLint, Prettier, and Vitest test harness.
- **Acceptance Criteria**:
  - `npm run build` succeeds cleanly.
  - `npm run typecheck` exits with 0 errors.
  - `npm run test` executes Vitest smoke test.

---

### Milestone 2: Design System & Reusable UI Primitives
- **Objective**: Build accessible, themeable base components matching design specifications.
- **Key Tasks**:
  - Implement `Button`, `Input`, `Textarea`, `Card`, `Badge`, `Alert`, `Tabs`, `CopyButton`, `Dropzone`, `Modal`, `Kbd`.
  - Collocate unit tests for each component in `src/components/ui/__tests__/`.
- **Acceptance Criteria**:
  - All primitives render cleanly with active focus indicators and keyboard accessibility.
  - 100% test pass rate for UI components.

---

### Milestone 3: Global Layout, Navigation & Search
- **Objective**: Create the global application shell and navigation infrastructure.
- **Key Tasks**:
  - Build `Header` with brand logo, category dropdowns, and quick tool search shortcut (`Ctrl+K`).
  - Build semantic `Footer` with legal links and category index.
  - Build `AdSlot` wrapper with fixed dimensions to guarantee 0 CLS.
  - Implement responsive mobile navigation drawer.
- **Acceptance Criteria**:
  - Responsive layouts verify properly from 320px mobile to 1920px desktop.
  - Zero layout shift when toggling ad placeholder containers.

---

### Milestone 4: MVP Tool Batch 1 - Developer & Security Utilities
- **Objective**: Implement pure engine logic and user interfaces for 4 core developer tools.
- **Tools**:
  1. **JSON Formatter & Validator**: Beautify, minify, syntax error highlighting, tree/raw toggle.
  2. **Base64 Encoder / Decoder**: Text & file conversion, URL-safe mode.
  3. **UUID / GUID Generator**: v4/v7 bulk generation, custom formatting options.
  4. **Cryptographic Hash Generator**: MD5, SHA-1, SHA-256, SHA-512 via Web Crypto API.
- **Acceptance Criteria**:
  - 100% client-side execution (zero network requests on transform).
  - Vitest unit tests covering valid, invalid, and edge-case inputs for all 4 engines.

---

### Milestone 5: MVP Tool Batch 2 - Text, Media & Productivity Utilities
- **Objective**: Implement the remaining 4 MVP tools.
- **Tools**:
  1. **Word & Character Counter**: Real-time word, character, sentence count, reading time.
  2. **Text Case Converter**: UPPERCASE, lowercase, Title Case, camelCase, snake_case, kebab-case.
  3. **QR Code Generator**: Custom text/URL, colors, error correction levels, PNG/SVG download.
  4. **Unix Timestamp Converter**: Epoch seconds/millis to human dates and vice versa.
- **Acceptance Criteria**:
  - Real-time updates with debounced recalculation.
  - Unit tests verifying edge-case string conversions, multi-byte unicode, and timezones.

---

### Milestone 6: SEO Automation, Structured Data & Rich Content
- **Objective**: Equip all 8 tools with search engine metadata and educational content.
- **Key Tasks**:
  - Implement `generateMetadata` with canonical links, OpenGraph, and Twitter tags.
  - Inject Schema.org `WebApplication`, `BreadcrumbList`, and `FAQPage` JSON-LD.
  - Author comprehensive "How to Use", "Key Features", and FAQ accordion copy for each tool.
  - Generate dynamic `sitemap.xml` and `robots.txt`.
- **Acceptance Criteria**:
  - Google Rich Results Test validation passes with 0 errors.
  - Sitemap generates valid XML referencing all active tool and category routes.

---

### Milestone 7: Adsterra Monetization & Privacy Safeguards
- **Objective**: Safely integrate Adsterra tags, cookie consent, and privacy policies.
- **Key Tasks**:
  - Implement lazy-loaded Adsterra ad slot components with environment variable toggles.
  - Implement GDPR/CCPA `CookieBanner`.
  - Author complete `/privacy-policy` and `/terms-of-service` pages.
  - Configure strict Content Security Policy (CSP) in `next.config.mjs`.
- **Acceptance Criteria**:
  - Ad placements do not interfere with tool buttons or generate CLS.
  - Cookie banner properly stores consent choice in `localStorage`.

---

### Milestone 8: Full Testing Suite, Audits & Production Deployment
- **Objective**: Final cross-browser validation, performance profiling, and production release.
- **Key Tasks**:
  - Run comprehensive Playwright E2E test suite across Chromium, Firefox, and WebKit.
  - Run Lighthouse CI audit (target score ≥ 95 on performance, accessibility, SEO).
  - Verify static export build (`npm run build`).
  - Deploy to production CDN (Vercel / Cloudflare Pages).
- **Acceptance Criteria**:
  - Zero TypeScript errors, zero lint warnings, zero failing tests.
  - All 8 tools operational in production environment.
