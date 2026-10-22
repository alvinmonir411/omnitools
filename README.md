# OmniTools - Free, Fast & 100% Private Web Utilities

[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14.2-black.svg)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC.svg)](https://tailwindcss.com/)
[![Tests](https://img.shields.io/badge/Vitest-35%20Passed-brightgreen.svg)](https://vitest.dev/)
[![Privacy](https://img.shields.io/badge/Privacy-100%25%20Client--Side-16A34A.svg)](#privacy-pledge)

**OmniTools** is a production-ready, SEO-optimized suite of browser-based utilities engineered for software engineers, writers, designers, and digital professionals.

All calculations, transformations, and formatting operations execute **100% client-side** inside the user's browser runtime. Sensitive payloads, confidential tokens, and proprietary code snippets **never leave the device**.

---

## Features & Included Tools

### 1. Developer Utilities
- **JSON Formatter & Validator**: Beautify, validate, sort object keys, minify, and pinpoint syntax errors with exact line and column numbers.
- **Base64 Encoder / Decoder**: Real-time text and file conversion with UTF-8 multibyte support, RFC 4648 §5 URL-safe mode, and instant image preview.
- **UUID / GUID Generator**: Bulk generation of cryptographically secure RFC 4122 v4 and modern RFC 9562 v7 (time-ordered) UUIDs.
- **Cryptographic Hash Generator**: Web Crypto API hardware-accelerated MD5, SHA-1, SHA-256, and SHA-512 checksum calculation and verification.

### 2. Text & Content Utilities
- **Word & Character Counter**: Real-time counts of words, characters (with and without spaces), sentences, paragraphs, reading and speaking times, keyword density analysis, and social media character benchmarks.
- **Text Case Converter**: UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, kebab-case, and CONSTANT_CASE with full comparison matrix.

### 3. Media & Graphics
- **Custom QR Code Generator**: Destination presets (URL, WiFi, Email, Text), adjustable error correction levels (L, M, Q, H), custom color styling, and high-resolution PNG & scalable vector SVG downloads.

### 4. Productivity & Math
- **Unix Timestamp & Epoch Converter**: Live ticking epoch clock, timestamp-to-date and date-to-timestamp conversions, ISO 8601, UTC, local time representations, and calendar details.

---

## Architectural Highlights

- **Static Site Generation (SSG)**: Zero-latency TTFB and optimal SEO performance via Next.js App Router static compilation.
- **Zero Cumulative Layout Shift (CLS)**: Guaranteed `< 0.05` CLS with strictly bounded advertising units and layout reservations.
- **Sub-88 kB Base Bundle**: Clean code architecture with dynamic imports and zero backend server dependencies.
- **Accessibility**: Full WCAG 2.1 AA compliance with visible focus indicators and ARIA live regions.
- **Strict Quality Gates**: 35 unit and component tests passing with Vitest, strict TypeScript typing (`strict: true`), and clean ESLint verification.

---

## Getting Started

### Prerequisites
- Node.js >= 18.x
- npm >= 9.x

### Installation

```bash
# Clone the repository
git clone https://github.com/alvinmonir411/omnitools.git
cd omnitools

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Verification & Testing

```bash
# Run unit & component test suite
npm run test

# Run TypeScript type check
npm run typecheck

# Run ESLint
npm run lint

# Compile production build
npm run build
```

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
