# 06 - Monetization & Privacy Policy Safeguards

## 1. Ethical Monetization Framework

OmniTools generates revenue through verified, legitimate advertising partnerships via **Adsterra**. The platform’s business model is founded on long-term user trust and policy compliance:

### 1.1. Core Monetization Rules
1. **Zero Deception**: Ad units are never disguised as navigation buttons, download links, or functional tool triggers.
2. **Clear Labeling**: Every ad unit carries an overt, subtle label (`ADVERTISEMENT` or `SPONSORED`) in uppercase 11px font.
3. **Buffer Zones**: Interactive tool actions (e.g., "Format JSON", "Copy to Clipboard", "Download QR Code") are physically separated from ad containers by at least `24px` of padding/margin to prevent accidental clicks.
4. **No Hostile Ad Formats**: Pop-unders, auto-redirect scripts, modal takeovers, and sound-playing video ads are strictly prohibited.
5. **Configurable Inventory**: Ad tags, zone keys, and publisher identifiers are centralized in `src/config/ads.ts` and loaded conditionally via environment variables.

---

## 2. Ad Placements & Viewport Specifications

| Slot Identifier | Desktop Dimensions | Mobile Dimensions | Page Placement | CLS Mitigation |
| :--- | :--- | :--- | :--- | :--- |
| `ad-leaderboard-top` | `728 x 90 px` | `320 x 50 px` | Below global header, above tool hero | Container rendered with CSS `min-h-[90px] md:min-h-[90px]` |
| `ad-sidebar-sticky` | `300 x 250 px` | Hidden on mobile | Right rail on `lg:` viewports (≥1024px) | Dedicated sticky sidebar container `w-[300px] min-h-[250px]` |
| `ad-content-bottom` | `728 x 90 px` | `300 x 250 px` | Between tool output card and "How to Use" guide | Isolated card box with minimum height reservation |

---

## 3. Ad Script Loading & Sandboxing

To safeguard the application from third-party script crashes, layout shifts, or performance penalties:
- Scripts are loaded asynchronously using Next.js `next/script` with `strategy="lazyOnload"`.
- Ad slots render an accessible fallback skeleton placeholder while the script connects to Adsterra ad servers.
- If an ad-blocker is present (e.g., uBlock Origin, Brave Shields), the container handles the script failure silently, maintaining the visual integrity of the layout without thrown exceptions or broken image icons.

```typescript
// Ad Configuration Contract (src/config/ads.ts)
export interface AdZoneConfig {
  slotId: string;
  enabled: boolean;
  zoneKey?: string;
  format: 'banner-728x90' | 'banner-300x250' | 'banner-320x50';
  minHeight: number;
  minWidth: number;
}

export const ADS_CONFIG = {
  enabled: process.env.NEXT_PUBLIC_ENABLE_ADS === 'true',
  zones: {
    leaderboard: {
      slotId: 'ad-leaderboard',
      enabled: true,
      minHeight: 90,
      minWidth: 728,
      format: 'banner-728x90',
    },
    sidebar: {
      slotId: 'ad-sidebar',
      enabled: true,
      minHeight: 250,
      minWidth: 300,
      format: 'banner-300x250',
    },
  },
} as const;
```

---

## 4. Privacy Architecture & Client-Side Pledge

OmniTools implements an absolute **Client-Side Privacy Pledge**:

### 4.1. The Zero-Retention Rule
- **No Ingestion**: User inputs, formatted code, decrypted tokens, passwords, text, and files NEVER leave the local browser environment.
- **No Database**: The platform does not operate a database, session store, or backend API for processing tool data.
- **No Analytics on Tool Contents**: Application telemetry tracks only page route views (e.g., `/tools/developer/json-formatter`) and anonymized performance timings. Input values are never logged, tracked, or serialized.

### 4.2. Local Storage Hygiene
- If a tool offers a "Save History" or "Draft" feature, this data is stored strictly in the client's `localStorage` on their machine.
- Every tool includes a "Clear All Data" button that wipes local state instantly.

---

## 5. Regulatory Compliance (GDPR, CCPA & ePrivacy)

1. **Cookie Consent Banner (`src/components/common/CookieBanner.tsx`)**:
   - Displays on first visit for visitors from regulatory jurisdictions (EU/UK/California).
   - Allows users to accept or decline non-essential cookies.
   - Adsterra ad slots respect user consent status prior to executing non-contextual advertising tags.
2. **Legal Transparency**:
   - Comprehensive `/privacy-policy` detailing third-party advertising cookies, client-side data isolation, and contact points.
   - Transparent `/terms-of-service` establishing free personal and commercial utility use.

---

## 6. Content Security Policy (CSP)

A strict Content Security Policy is configured in `next.config.mjs` via HTTP response headers:
- `default-src 'self'`: Restricts unauthorized external origins.
- `script-src 'self' 'unsafe-inline' https://*.adsterra.com`: Allows verified Adsterra CDN script domains while preventing arbitrary script injection.
- `connect-src 'self' https://*.adsterra.com`: Limits network outbound requests.
- `frame-src 'self' https://*.adsterra.com`: Restricts embedded iframes to approved ad networks.
- `img-src 'self' data: blob: https://*.adsterra.com`: Enables data URIs for client-generated images and QR codes.
