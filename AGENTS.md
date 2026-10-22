# AGENTS.md - Operational Guide for Autonomous & Assisted Engineering

Welcome to the **OmniTools** platform repository. This document serves as the single operational constitution and engineering guidelines for any autonomous agent or software engineer working on this codebase.

---

## 1. Prime Directives & Mission

1. **Production-Ready & High Polish**: Every piece of code must be fully functional, type-safe, accessible, and performant. No unfinished stubs, no fake mockups, no placeholder implementations.
2. **Zero-Server Tool Privacy**: All tool operations (formatting, hashing, encoding, image manipulation, conversion) MUST execute client-side in the user's browser unless an external public API is explicitly documented and approved. User data must never leave the browser.
3. **Legitimate Monetization & Policy Compliance**: Ad placements must be clean, clearly labeled, non-intrusive, and strictly compliant with Adsterra and Google Webmaster policies. Never simulate clicks, never generate deceptive UI elements, and never create pop-up traps on functional buttons.
4. **SEO & Content Excellence**: Tools must be surrounded by genuine, high-value technical documentation, FAQs, and structured data (Schema.org). Do not spam thin or auto-generated low-quality pages.
5. **Architectural & Design Consistency**: Stick strictly to the approved design tokens, reusable UI primitives, and architecture standards defined in `docs/`.
6. **Mandatory Next.js 16+ & React 19 Standards**: Next.js 16 or newer stable versions (`>=16.0.0`) are permanently mandatory for this platform. Next.js 14 and 15 must never be used as target frameworks. All dynamic route parameters (`params` and `searchParams`) must be handled as asynchronous Promises. Node.js 22+ LTS is required. ESLint must be executed directly via ESLint CLI (`eslint .`) using modern flat config (`eslint.config.mjs`).

---

## 2. Repository Layout & Conventions

```text
├── docs/                     # Source of truth architectural specifications
├── public/                   # Static assets, icons, robots.txt, manifests
├── src/
│   ├── app/                  # Next.js App Router (pages, layouts, sitemap, opengraph)
│   │   ├── (marketing)/      # Home, categories, about, privacy, terms
│   │   ├── tools/            # Tool routes: /tools/[category]/[slug] or /tools/[slug]
│   │   ├── api/              # Minimal endpoints (sitemap ping, feedback if needed)
│   │   ├── layout.tsx        # Global root layout with theme, fonts, script tags
│   │   ├── not-found.tsx     # Custom 404
│   │   └── error.tsx         # Global error boundary
│   ├── components/
│   │   ├── ads/              # Sandboxed, CLS-safe Adsterra ad slot components
│   │   ├── common/           # Brand, Breadcrumbs, SEO Schema, Cookie Consent
│   │   ├── layout/           # Header, Footer, Sidebar, Navigation, MobileDrawer
│   │   ├── tools/            # Tool-specific UI modules (JsonFormatterUI, etc.)
│   │   └── ui/               # Headless/custom accessible primitives (Button, Input, Dropzone, Modal)
│   ├── config/               # Navigation menus, tool registry, ad configurations, site metadata
│   ├── hooks/                # Reusable React hooks (useClipboard, useLocalStorage, useWorker)
│   ├── lib/
│   │   ├── ads/              # Adsterra script loaders and ad slot definitions
│   │   ├── seo/              # Metadata generators, JSON-LD builders, canonical helpers
│   │   ├── tools/            # PURE tool logic and engines (zero UI dependencies)
│   │   └── utils/            # Shared string, math, formatting, and classname utilities (cn)
│   ├── styles/               # Global CSS, Tailwind base directives, typography
│   ├── types/                # TypeScript interfaces, Zod schemas, Tool contracts
│   └── workers/              # Dedicated Web Workers for CPU-intensive tasks
├── tests/
│   ├── e2e/                  # Playwright end-to-end tests for tools & navigation
│   └── unit/                 # Vitest test suites for pure tool engines and hooks
├── eslint.config.mjs         # Modern ESLint 9 flat configuration
├── .prettierrc               # Code formatting rules
├── next.config.mjs           # Next.js configuration (CSP, compression, image formats)
├── package.json              # Exact pinned dependencies
├── tailwind.config.ts        # Design tokens and Tailwind configuration
└── tsconfig.json             # TypeScript strict settings
```

---

## 3. Engineering Workflows & Quality Gates

Before declaring any milestone or task complete, agents MUST complete the following verification loop:

### Verification Checklist:
1. **Type Safety**: Run `npm run typecheck` (`tsc --noEmit`). Ensure zero TypeScript errors.
2. **Linting & Formatting**: Run `npm run lint` and verify Prettier formatting.
3. **Unit & Engine Tests**: Run `npm run test` (Vitest). All pure functions, transforms, and validators must pass.
4. **E2E Smoke Tests**: Run `npm run test:e2e` for critical path journeys (tool input -> transform -> copy/download output).
5. **Production Build**: Run `npm run build` to verify Next.js static site generation (SSG) compiles cleanly without server-side hydration mismatches.
6. **Documentation Sync**: Any newly added tool or modified configuration MUST be registered in `src/config/tools.ts` and documented in `docs/09-DECISIONS.md`.

---

## 4. Coding Standards

### TypeScript
- Strict mode is non-negotiable (`strict: true`, `noImplicitAny: true`).
- Avoid `any`. Use `unknown` with type guards or Zod validation schemas.
- Explicitly type props for all React components.

### Component Architecture
- Separate **UI Presentation** from **Tool Engine Logic**:
  - `src/lib/tools/[tool-name]/`: Contains the pure functions, transformations, and unit tests.
  - `src/components/tools/[tool-name]/`: Contains the interactive React component (state, event handlers, rendering).
- Use Client Components (`"use client"`) only where interactive browser state, canvas, or Web Workers are needed. Tool wrappers and explanatory content sections should remain React Server Components (RSC) for maximum SEO and minimal JS delivery.

### Accessibility (a11y)
- Every form control must have an associated `<label>` or `aria-label`.
- All interactive controls must support keyboard navigation (`Tab`, `Enter`, `Space`, `Escape`).
- Maintain focus ring visibility (`focus-visible:ring-2 focus-visible:ring-primary`).
- Provide ARIA live regions (`aria-live="polite"`) for tool output changes and copy-to-clipboard alerts.

### Performance & Core Web Vitals
- Zero Cumulative Layout Shift (CLS): Every ad unit, image, and dynamic element MUST have reserved height/width boundaries.
- Total JavaScript minimization: Dynamically import heavy libraries (e.g., CodeMirror, QR code generator, canvas utilities) only when the respective tool is loaded.
- Web Workers for heavy compute (e.g., large file hashing, image compression) to ensure the main UI thread never drops frames.

---

## 5. Monetization & Adsterra Guidelines

- **Configurability**: All ad units must reference `src/config/ads.ts`. Ad unit IDs, script sources, and active toggles are driven by environment variables or configuration constants.
- **Graceful Fallbacks**: If an ad blocker is detected or an ad fails to load, the ad container collapses smoothly or displays an unobtrusive platform notice/empty space without breaking layout.
- **Labeling**: Every ad container MUST clearly display a subtle, muted label: `"ADVERTISEMENT"` or `"SPONSORED"` in 11px uppercase font.
- **Clean Tool Experience**: Never place an ad banner where it interferes with primary tool buttons (e.g., "Copy", "Convert", "Download", "Reset"). Maintain a minimum spacing of 24px between any ad unit and interactive tool controls.

---

## 6. Change Control & Documentation Rules

- Never implement unplanned architectural deviations (e.g., introducing a database, backend API, new CSS framework) without documenting the rationale in `docs/09-DECISIONS.md`.
- Keep documentation up to date with the reality of the code. If code changes, documentation must be updated in the same commit or step.
