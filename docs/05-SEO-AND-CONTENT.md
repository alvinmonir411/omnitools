# 05 - SEO Strategy & Content Architecture

## 1. Technical SEO Foundation

Organic search traffic is the lifeblood of OmniTools. The platform is engineered to satisfy modern Google Search algorithms and Core Web Vitals requirements by pairing instant, interactive tools with rich, helpful, original content.

### 1.1. Dynamic Metadata API
Every tool page implements Next.js App Router `generateMetadata`:

```typescript
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const tool = getToolBySlug(params.slug);
  if (!tool) return {};

  const title = `${tool.name} - Free, Fast & Private Online Utility | OmniTools`;
  const description = tool.shortDescription;
  const canonicalUrl = `https://omnitools.app/tools/${tool.category}/${tool.slug}`;

  return {
    title,
    description,
    keywords: tool.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'OmniTools',
      type: 'website',
      images: [
        {
          url: `/og/${tool.slug}.png`,
          width: 1200,
          height: 630,
          alt: `${tool.name} preview`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`/og/${tool.slug}.png`],
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  };
}
```

---

## 2. Structured Data (Schema.org JSON-LD)

Every tool page injects comprehensive, validated Schema.org JSON-LD:

### 2.1. WebApplication / SoftwareApplication Schema
```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "JSON Formatter & Validator",
  "url": "https://omnitools.app/tools/developer/json-formatter",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires JavaScript. Requires HTML5.",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Format, validate, beautify, and inspect JSON in real time with client-side privacy."
}
```

### 2.2. BreadcrumbList Schema
Enables rich breadcrumbs directly in Google Search SERPs:
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://omnitools.app"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Developer Tools",
      "item": "https://omnitools.app/categories/developer"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "JSON Formatter",
      "item": "https://omnitools.app/tools/developer/json-formatter"
    }
  ]
}
```

### 2.3. FAQPage Schema
Enables expandable FAQ snippets in Google search results by encoding the on-page FAQs in JSON-LD.

---

## 3. High-Value Page Content Structure

To prevent search engines from classifying pages as "thin utilities", every tool page is structured into six (6) distinct, content-rich sections:

```
┌─────────────────────────────────────────────────────────────────┐
│ Section 1: Hero & Tool Workspace (Interactive Client Canvas)   │
│  - Exactly ONE <h1> with targeted primary keyword               │
│  - Quick value badge ("Client-Side", "Zero Server Upload")     │
│  - The actual, instant tool UI                                  │
├─────────────────────────────────────────────────────────────────┤
│ Section 2: "How to Use" Step-by-Step Guide                     │
│  - 3 to 4 sequential numbered cards                             │
│  - Clear actionable instructions                                │
├─────────────────────────────────────────────────────────────────┤
│ Section 3: Core Features & Capabilities (Grid)                  │
│  - 4 to 6 feature callouts highlighting technical strengths     │
├─────────────────────────────────────────────────────────────────┤
│ Section 4: Technical Deep Dive & Specifications                 │
│  - Educational background (e.g., how Base64 works, RFC 8259)    │
│  - Common use cases, caveats, and industry standards            │
├─────────────────────────────────────────────────────────────────┤
│ Section 5: Frequently Asked Questions (FAQ) Accordion           │
│  - 4 to 6 practical questions addressing user concerns          │
│  - Direct privacy guarantees (e.g., "Is my data stored?")        │
├─────────────────────────────────────────────────────────────────┤
│ Section 6: Related Tools Grid                                   │
│  - Internal contextual links to sister tools in the category    │
└─────────────────────────────────────────────────────────────────┘
```

---

## 4. Robots.txt, Sitemap & Canonical Strategy

- **Dynamic Sitemap (`src/app/sitemap.ts`)**: Automatically aggregates all tools from the master configuration (`src/config/tools.ts`), outputting `priority: 1.0` for home, `0.9` for tool pages, and `0.8` for category hubs.
- **Dynamic Robots (`src/app/robots.ts`)**: Allows all major search bots (`*`, Googlebot, Bingbot) while forbidding any internal debug or draft routes.
- **Canonical Tags**: Self-referencing canonical URLs with clean, lowercase trailing-slash-free paths to prevent duplicate content indexing.

---

## 5. Core Web Vitals Targets

Search rank is directly coupled with Core Web Vitals performance:
- **LCP (Largest Contentful Paint)**: `< 1.2s` (Achieved via static HTML generation and pre-rendered tool shells).
- **INP (Interaction to Next Paint)**: `< 100ms` (Achieved through lightweight event listeners and offloading CPU-heavy algorithms to Web Workers).
- **CLS (Cumulative Layout Shift)**: `< 0.05` (Achieved through strict fixed-aspect ratio ad slots and reserved image dimensions).
