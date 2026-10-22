# 02 - Technical Architecture

## 1. System Overview

**OmniTools** is architected as a static-first, highly performant web application built on **Next.js App Router**. The platform leverages **Static Site Generation (SSG)** to pre-render every tool and category page at build time, yielding instant time-to-first-byte (TTFB), zero database dependencies, near-zero hosting costs, and optimal SEO indexability.

```
┌────────────────────────────────────────────────────────────────────────┐
│                          User Browser Runtime                          │
│                                                                        │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │               Next.js App Router (Static Layouts)              │   │
│   │                                                                │   │
│   │  ┌───────────────┐ ┌───────────────────┐ ┌──────────────────┐  │   │
│   │  │ Global Header │ │ Tool Hero & Meta  │ │ Breadcrumbs & Nav│  │   │
│   │  └───────────────┘ └───────────────────┘ └──────────────────┘  │   │
│   │  ┌──────────────────────────────────────────────────────────┐  │   │
│   │  │ Client Tool Sandbox ("use client")                       │  │   │
│   │  │  - User Inputs (Text/File/Options)                       │  │   │
│   │  │  - Pure Client Engine (WASM / Web Crypto / Pure JS)       │  │   │
│   │  │  - Instant Live Outputs & Copy-to-Clipboard             │  │   │
│   │  └──────────────────────────────────────────────────────────┘  │   │
│   │  ┌────────────────────────┐    ┌───────────────────────────┐   │   │
│   │  │ Educational Content     │    │ Sandboxed Adsterra Units  │   │   │
│   │  │ (FAQs, Specs, Guides)  │    │ (CLS-guaranteed iframes)  │   │   │
│   │  └────────────────────────┘    └───────────────────────────┘   │   │
│   └────────────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Server Components (RSC) vs. Client Components Boundary

To achieve top-tier Lighthouse scores and SEO visibility, OmniTools enforces a strict boundary between Server and Client components:

| Component Type | Execution Environment | Responsibility | Examples |
| :--- | :--- | :--- | :--- |
| **Server Components (RSC)** | Build Time / Edge SSG | Static markup, SEO metadata, Schema.org JSON-LD, educational copy, FAQ accordions, breadcrumbs, footer | Page wrappers, `ToolHeader`, `ToolFaqSection`, `RelatedToolsGrid`, `SiteFooter` |
| **Client Components ("use client")** | Browser Runtime | State handling, keyboard events, file dropzones, clipboard writes, live computation | `ToolCanvasWrapper`, `JsonFormatterEditor`, `QrCodeCanvas`, `CopyButton` |

---

## 3. Tool Architecture & Contracts

Every tool in the OmniTools ecosystem implements a standard contract. This ensures complete separation of concern between the computational algorithm ("engine") and the presentation layer ("UI").

### 3.1. Tool Registry Definition (`src/types/tool.ts`)

```typescript
export type ToolCategory = 'developer' | 'text' | 'media' | 'productivity';

export interface ToolMetadata {
  id: string;                      // Unique identifier, e.g., 'json-formatter'
  slug: string;                    // URL path slug, e.g., 'json-formatter'
  name: string;                    // Display title, e.g., 'JSON Formatter & Validator'
  shortDescription: string;        // Meta description / search snippet
  category: ToolCategory;          // Assigned category
  iconName: string;                // Lucide icon identifier
  isFeatured?: boolean;            // Displayed on homepage hero
  keywords: string[];              // SEO indexing keywords
  schemaType: 'WebApplication' | 'SoftwareApplication';
}

export interface ToolFaqItem {
  question: string;
  answer: string;
}

export interface ToolPageContent {
  metadata: ToolMetadata;
  howToSteps: string[];
  features: string[];
  technicalDetails: string;
  faqs: ToolFaqItem[];
}
```

### 3.2. Pure Engine Interface

Each tool's calculation logic resides in `src/lib/tools/[tool-slug]/engine.ts`. The engine must:
1. Be a pure, deterministic function or class.
2. Have zero DOM or React dependencies.
3. Be 100% unit testable in Vitest without mocking browser globals (except Web Crypto or Canvas where polyfilled).
4. Return a structured result object:

```typescript
export interface ToolEngineResult<T> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    line?: number;
    column?: number;
  };
  metrics?: {
    processingTimeMs: number;
    inputSize: number;
    outputSize: number;
  };
}
```

---

## 4. Reusable UI Component Inventory

All interactive and layout elements are composed of modular, accessible primitives located in `src/components/ui/`:

| Component | Purpose & Accessibility |
| :--- | :--- |
| `Button` | Standardized primary, secondary, outline, ghost, and danger buttons with loading spinners and disabled states |
| `Input` | Text input with focus ring, error message, clear button, and accessible aria-describedby |
| `Textarea` | Multi-line code/text editor with line numbers, auto-resize option, and mono-font support |
| `Card` | Uniform content container with header, body, and footer slots |
| `CopyButton` | Accessible button with animated checkmark and ARIA live region feedback |
| `Dropzone` | Drag-and-drop file upload zone with file type and size validation |
| `Tabs` | WAI-ARIA tablist for switching between tool modes (e.g., Encode vs Decode, Tree vs Raw) |
| `Badge` | Small status indicator (e.g., "Client-Side", "Fast", "Popular", "v4") |
| `Alert` | Notice banner for warnings, validation errors, and success notifications |
| `Kbd` | Keyboard shortcut badge (e.g., `Ctrl` + `Enter` to run) |
| `Modal` | Accessible dialog with focus trap and escape-key dismissal |
| `Accordion` | Animated FAQ disclosure with schema markup integration |

---

## 5. Advertising Slot Architecture & CLS Prevention

Adsterra ads are managed through an isolated, modular component (`src/components/ads/AdSlot.tsx`).

### Core Architecture Principles:
1. **Zero CLS via Fixed Aspect Boxes**: Every ad position is rendered inside an explicit, CSS-constrained container with `min-height` and `min-width` matching the ad specifications (e.g., `728x90`, `300x250`, `320x50`).
2. **Lazy Loading**: Adsterra scripts execute with Next.js `next/script` using `strategy="lazyOnload"` or via an `IntersectionObserver` when scrolled into view.
3. **Environment & Toggle Isolation**: Ad scripts are controlled via environment variables (`NEXT_PUBLIC_ENABLE_ADS=true/false`). In development and automated test modes, clean visual wireframe placeholders are shown.
4. **Ad-Blocker Resilience**: When an ad-blocker prevents script execution, the container maintains its reserved space or collapses cleanly without triggering layout recalculations or uncaught JavaScript exceptions.

---

## 6. Directory Structure Blueprint

```text
src/
├── app/
│   ├── (marketing)/
│   │   ├── page.tsx                           # Homepage
│   │   ├── about/page.tsx                     # About OmniTools
│   │   ├── privacy-policy/page.tsx            # Privacy policy & client pledge
│   │   └── terms-of-service/page.tsx          # Terms of service
│   ├── categories/
│   │   └── [category]/page.tsx                # Category index (e.g., /categories/developer)
│   ├── tools/
│   │   ├── layout.tsx                         # Tool-specific layout (with sidebar ad)
│   │   └── [category]/
│   │       └── [slug]/page.tsx                # Dynamic or statically generated tool page
│   ├── sitemap.ts                             # Dynamic XML sitemap generator
│   ├── robots.ts                              # Robots.txt generator
│   ├── layout.tsx                             # Root layout (Header, Nav, Footer, Analytics/Ad init)
│   ├── not-found.tsx                          # Accessible 404 page
│   └── error.tsx                              # Global error boundary
├── components/
│   ├── ads/
│   │   ├── AdSlot.tsx                         # Core wrapper with CLS protection
│   │   ├── LeaderboardAd.tsx                  # 728x90 / 320x50 responsive slot
│   │   └── SidebarAd.tsx                      # 300x250 desktop slot
│   ├── common/
│   │   ├── Breadcrumbs.tsx                    # Accessible navigation crumbs + JSON-LD
│   │   ├── CookieBanner.tsx                   # GDPR/CCPA consent banner
│   │   ├── JsonLd.tsx                         # Schema.org structured data injector
│   │   └── ThemeToggle.tsx                    # Optional dark/light toggle
│   ├── layout/
│   │   ├── Header.tsx                         # Sticky brand header & search trigger
│   │   ├── Footer.tsx                         # Semantic footer with category links
│   │   ├── MobileNav.tsx                      # Responsive mobile drawer
│   │   └── QuickSearchModal.tsx               # Client-side fuzzy tool search (Ctrl+K)
│   ├── tools/
│   │   ├── ToolHeader.tsx                     # Tool title, badge, share, clear actions
│   │   ├── ToolFaqSection.tsx                 # Accordion-driven FAQs
│   │   ├── ToolGuideSection.tsx               # "How to use" guide with step cards
│   │   └── [tool-name]/                       # Individual tool UI implementations
│   └── ui/                                    # Reusable design system primitives
├── config/
│   ├── ads.ts                                 # Adsterra slot IDs and dimensions
│   ├── navigation.ts                          # Header/footer category menus
│   ├── site.ts                                # Brand title, URL, social links, author
│   └── tools.ts                               # Master registry of all available tools
├── hooks/
│   ├── useClipboard.ts                        # Safe clipboard write with fallback
│   ├── useDebounce.ts                         # Input debouncing hook
│   └── useLocalStorage.ts                     # Local storage wrapper with SSR guards
├── lib/
│   ├── ads/adsterra.ts                        # Adsterra script initializer
│   ├── seo/metadata.ts                        # OpenGraph & Twitter metadata builder
│   ├── tools/                                 # Pure computational tool engines
│   └── utils/cn.ts                            # Tailwind classnames merger
├── styles/
│   └── globals.css                            # CSS variables and Tailwind imports
└── types/
    ├── ads.ts                                 # Ad slot typing
    └── tool.ts                                # Tool definition interfaces
```
