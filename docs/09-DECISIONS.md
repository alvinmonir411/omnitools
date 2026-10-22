# 09 - Architectural Decision Records (ADRs) & Implementation Log

## 1. Approved Architecture Decision Records

### ADR-001: Next.js App Router with Static Site Generation (SSG)
- **Status**: Approved & Implemented
- **Decision**: Use Next.js 14+ App Router with static generation (`output: 'export'` or statically pre-rendered routes). Every tool and category page is compiled to static HTML at build time.

---

### ADR-002: 100% Client-Side Tool Computation for Sensitive Payloads
- **Status**: Approved & Implemented
- **Decision**: All tool engines execute exclusively inside the user's browser runtime using JavaScript, the Web Crypto API, and HTML5 Canvas.

---

### ADR-003: Tailwind CSS with CSS Variable Design Tokens
- **Status**: Approved & Implemented
- **Decision**: Strict design tokens configured in `:root` and `tailwind.config.ts` (#2563EB primary, #0F172A text, #F8FAFC background, #FFFFFF surface, #16A34A success).

---

### ADR-004: Adsterra Zero-CLS Isolation
- **Status**: Approved & Implemented
- **Decision**: Every ad unit wrapped in fixed-aspect containers with dedicated `ADVERTISEMENT` labeling.

---

### ADR-005: Vitest & Automated Quality Gates
- **Status**: Approved & Implemented
- **Decision**: Use Vitest with `@testing-library/react` and `jsdom` for sub-second unit and component testing.

---

### ADR-006: Hierarchical Canonical URL Architecture
- **Status**: Approved by User & Implemented
- **Decision**: Use `/tools/[category]/[slug]` and `/categories/[category]`.

---

### ADR-007: Universal Bit-Math & Regex Compatibility
- **Status**: Approved & Implemented
- **Decision**: Use safe 48-bit math for UUID v7 timestamps and universal regex patterns without non-standard compilation flags.

---

### ADR-008: Deployment to GitHub & Vercel
- **Status**: Approved & Live
- **Decision**: GitHub repo at `alvinmonir411/omnitools`, connected and auto-deploying to Vercel production at `https://omnitools-lovat.vercel.app`.

---

### ADR-009: Portfolio Expansion to High-Yield US/UK Niche Tools
- **Status**: Approved & Implemented
- **Context**: Foundational developer tools (JSON, Base64, Hashes) have Keyword Difficulty 90+ where 15-year-old authority sites sit, and developers heavily use adblockers (>90%).
- **Decision**: Retain the 8 developer tools for platform authority and backlink generation, but pivot real traffic and monetization toward low-KD, high-search-intent US/UK niche tools:
  1. **Etsy Seller Fee & Profit Calculator**: Non-tech US/UK demographic (<5% adblockers), massive Pinterest/Reddit viral potential.
  2. **US 1099 Self-Employed Tax Calculator**: Sole proprietors/freelancers, high financial intent during quarterly deadlines.
  3. **HEIC to JPG/PNG Converter**: iPhone photo uploads to PC/forms, massive mobile organic search volume with 0% adblockers.
  4. **TikTok & Reels Viral Hook Generator**: Content creators/marketers, viral short-form video hooks.

---

### ADR-010: High-CPM Adsterra Monetization Engine
- **Status**: Approved & Implemented
- **Context**: Standard 728x90 and 300x250 banners yield low CPM ($0.10–$0.50).
- **Decision**: Integrate Adsterra's highest performing ad formats:
  1. **Social Bar (In-Page Push)**: Native notification widget with 10x higher CPM ($3.00–$15.00+ for US/UK).
  2. **Native Ad Banner**: Recommendation-card styled units beneath tool output cards.
  3. **Smart Direct Link Gateway with 24-Hour Cooldown**: Triggered on secondary export/download actions with rate-limiting stored in `localStorage`.

---

### ADR-011: Neon Serverless PostgreSQL Database Architecture
- **Status**: Approved & Implemented
- **Context**: Need persistent storage for shareable calculation links, user feedback, and tool analytics while maintaining zero server costs and infinite scaling.
- **Decision**: Integrate `@neondatabase/serverless` with connection pooling over WebSockets/HTTP. Keep user transformation data strictly client-side, while storing non-sensitive share links and feedback in Neon DB.

---

### ADR-012: Mandatory Next.js 16+ & React 19 Architecture Standard
- **Status**: Approved & Implemented (Permanent Requirement)
- **Context**: Framework standardization mandates Next.js 16 or newer stable releases (`>=16.0.0`). Next.js 14 and 15 are deprecated and prohibited from being target frameworks.
- **Decisions**:
  1. **Framework Release**: Upgraded to latest stable Next.js `16.4.2` with Turbopack production compilation.
  2. **React Ecosystem**: Upgraded to latest stable React `19.3.1`, React DOM `19.3.1`, and `@types/react` / `@types/react-dom` `19.3.0`.
  3. **Runtime Engine**: Enforce Node.js `>=22.0.0 LTS` runtime in `package.json` engines.
  4. **Async Request APIs**: Refactored dynamic route pages (`/tools/[category]/[slug]` and `/categories/[category]`) to resolve `params` as asynchronous `Promise` objects (`await params`).
  5. **ESLint 9 Flat Configuration**: Replaced deprecated `next lint` with direct ESLint CLI command (`eslint .`) using native `eslint.config.mjs` flat configuration with `eslint-config-next@16.4.2`.
  6. **Zero-Warning Performance Optimization**: Converted stateful effect synchronization in niche tools (`TikTokHookUI`, `UuidUI`) to pure `React.useMemo` memoization for React 19 compliance.
