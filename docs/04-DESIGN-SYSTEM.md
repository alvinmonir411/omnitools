# 04 - Design System & UI Specifications

## 1. Design Philosophy

OmniTools employs a clean, modern, high-contrast, distraction-free visual language engineered specifically for productivity. The design balances visual clarity, instant accessibility, and functional speed:
- **Mobile-First**: Layouts scale gracefully from 320px smartphones to 4K desktop screens.
- **Cognitive Ease**: Generous whitespace, unambiguous button roles, high contrast ratios (WCAG 2.1 AA+), and zero visual clutter.
- **Predictable Interactions**: Consistent focus rings, hover transitions, and keyboard shortcuts across all tools.

---

## 2. Core Color Tokens

The color system is defined via CSS custom variables (`:root` and `.dark`), mapped directly to Tailwind CSS utility classes.

### 2.1. Primary Color Tokens

| Token Name | Hex Code | Role / Usage |
| :--- | :--- | :--- |
| `--primary` | `#2563EB` (Blue 600) | Primary CTA buttons, active tabs, focus outlines, brand accents |
| `--primary-hover` | `#1D4ED8` (Blue 700) | Interactive hover state for primary elements |
| `--text` | `#0F172A` (Slate 900)| Primary body text, main headings, high-contrast labels |
| `--text-muted` | `#64748B` (Slate 500)| Helper text, timestamps, input placeholders, breadcrumbs |
| `--background` | `#F8FAFC` (Slate 50) | Global page background canvas |
| `--surface` | `#FFFFFF` (Pure White)| Tool cards, modal dialogs, navigation header, dropdown menus |
| `--surface-subtle` | `#F1F5F9` (Slate 100)| Secondary action bars, table headers, code editor backgrounds |
| `--border` | `#E2E8F0` (Slate 200)| Card borders, input outlines, table divider lines |
| `--success` | `#16A34A` (Green 600)| Success badges, copy-confirmation notifications, valid JSON |
| `--warning` | `#D97706` (Amber 600)| Informational warnings, rate limits, non-critical alerts |
| `--danger` | `#DC2626` (Red 600)  | Syntax error banners, reset/clear triggers, invalid inputs |

### 2.2. Dark Mode Tokens (Optional / Supported)

| Token Name | Hex Code | Role / Usage |
| :--- | :--- | :--- |
| `--background` | `#0B0F17` | Dark mode global page background |
| `--surface` | `#131B2E` | Dark mode cards and floating elements |
| `--surface-subtle` | `#1E293B` | Dark mode secondary tool canvases |
| `--text` | `#F8FAFC` | Dark mode primary readable text |
| `--text-muted` | `#94A3B8` | Dark mode secondary helper text |
| `--border` | `#1E293B` | Dark mode subtle borders |

---

## 3. Typography Scale

The font stack relies on modern, clean geometric sans-serif typography using Next.js optimized Google Fonts:
- **Primary Font Family**: `Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
- **Monospace Font Family**: `JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`

### Typography Hierarchy:

| Element | Class / Token | Size | Line Height | Weight |
| :--- | :--- | :--- | :--- | :--- |
| **Page H1** | `text-3xl md:text-4xl` | 32px / 36px | 1.2 | 700 (Bold) |
| **Section H2**| `text-2xl md:text-3xl` | 24px / 30px | 1.25 | 600 (Semibold) |
| **Card H3** | `text-lg md:text-xl` | 18px / 20px | 1.3 | 600 (Semibold) |
| **Body Large**| `text-base` | 16px | 1.5 | 400 (Regular) |
| **Body Small**| `text-sm` | 14px | 1.5 | 400 (Regular) |
| **Micro/Meta**| `text-xs` | 12px | 1.4 | 500 (Medium) |
| **Code/Input**| `font-mono text-sm` | 14px | 1.6 | 400 (Regular) |

---

## 4. Spacing, Grid & Layout Metrics

OmniTools strictly enforces an 8-point spacing grid system:

| Token | Pixels | Application |
| :--- | :--- | :--- |
| `space-1` | 4px | Micro padding, badge insets, icon spacing |
| `space-2` | 8px | Button inline gap, small component padding |
| `space-3` | 12px | Form control padding (`px-3 py-2`) |
| `space-4` | 16px | Card internal padding on mobile, standard gaps |
| `space-6` | 24px | Card padding on desktop, section item separation |
| `space-8` | 32px | Major section margins |
| `space-12`| 48px | Page block vertical padding (`py-12`) |
| `space-16`| 64px | Hero section vertical spacing |

### Responsive Breakpoints:
- `sm`: `640px` (Large phones / small tablets)
- `md`: `768px` (Tablets / small laptops)
- `lg`: `1024px` (Desktop workstations - reveals sidebar ad and multi-pane views)
- `xl`: `1280px` (High-resolution monitors)
- `2xl`: `1536px` (Ultra-wide displays - max-w-7xl container constraint)

---

## 5. Elevation, Borders & Shadows

To maintain a crisp, clean aesthetic without muddy drop shadows:
- **Border Radius**:
  - `rounded-md`: `6px` (Inputs, buttons, badges)
  - `rounded-lg`: `8px` (Cards, dialogs, code containers)
  - `rounded-xl`: `12px` (Outer tool wrappers, hero promo cards)
- **Shadow Scale**:
  - `shadow-sm`: `0 1px 2px 0 rgb(0 0 0 / 0.05)` (Default card elevation)
  - `shadow-md`: `0 4px 6px -1px rgb(0 0 0 / 0.07)` (Hover cards, active dropdowns)
  - `shadow-lg`: `0 10px 15px -3px rgb(0 0 0 / 0.08)` (Modal dialogs, popovers)

---

## 6. Interactive States & Accessibility Standards

### 6.1. Focus Indicators
- Every focusable control MUST show a prominent focus ring:
  ```css
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
  ```
- Focus rings must never be hidden (`outline: none` without replacement is strictly forbidden).

### 6.2. Component States
- **Hover**: Subtle background tint or 1px elevation increase (`hover:bg-primary-hover` or `hover:border-slate-300`).
- **Active / Pressed**: Subtle scale down (`active:scale-[0.98]`).
- **Disabled**: Reduced opacity (`opacity-50 cursor-not-allowed pointer-events-none`).
- **Loading**: Preserved dimensions with an accessible inline SVG spinner and `aria-busy="true"`.

---

## 7. Advertisements & Visual Coexistence

1. **Strict Separation**: Ad containers use `--surface-subtle` backgrounds with a 1px dashed or solid border (`border-slate-200`) and a clear uppercase `"ADVERTISEMENT"` banner.
2. **Never Overlap**: Tool controls (Copy, Format, Clear, Download) must never be occluded or placed adjacent to ad triggers.
3. **No Blinking or Pulsing**: Ads must not distract from input focus.
