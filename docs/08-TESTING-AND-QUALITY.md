# 08 - Testing Strategy & Quality Assurance

## 1. Testing Taxonomy

OmniTools implements a multi-tiered testing strategy to guarantee that tools produce mathematically exact, secure results while maintaining instant responsiveness.

```
                  ┌──────────────────────┐
                  │   E2E (Playwright)   │  Critical path user journeys,
                  │   Cross-browser      │  ad rendering, copy/download
                  └──────────┬───────────┘
                             │
               ┌─────────────┴─────────────┐
               │ Component Tests (RTL)     │  Accessible states, focus,
               │ React Testing Library     │  error notices, keyboard
               └─────────────┬─────────────┘
                             │
         ┌───────────────────┴───────────────────┐
         │ Unit Tests (Vitest)                   │  Deterministic tool
         │ 100% Coverage of Pure Tool Engines    │  algorithms, parsers, math
         └───────────────────────────────────────┘
```

---

## 2. Unit Testing Layer (Vitest)

All computational logic in `src/lib/tools/` must achieve 100% test coverage before UI integration.

### Test Requirements for Tool Engines:
- **Valid Inputs**: Standard operational cases with expected results.
- **Edge Cases**: Empty strings, unicode/emojis, massive inputs (>10MB), malformed JSON, boundary timestamps (year 1970, year 2038, leap years), negative numbers, and URL-encoded entities.
- **Error Handling**: Graceful error objects containing descriptive user messages, line numbers, and column offsets without throwing unhandled exceptions.

```typescript
// Example Vitest suite for JSON Formatter Engine
import { describe, it, expect } from 'vitest';
import { formatJson } from './engine';

describe('JSON Formatter Engine', () => {
  it('should format standard JSON with 2-space indentation', () => {
    const input = '{"name":"OmniTools","active":true}';
    const result = formatJson(input, { indent: 2, sortKeys: false });
    expect(result.success).toBe(true);
    expect(result.data).toBe('{\n  "name": "OmniTools",\n  "active": true\n}');
  });

  it('should return line and column on syntax errors', () => {
    const input = '{\n  "name": "OmniTools",,\n}';
    const result = formatJson(input, { indent: 2 });
    expect(result.success).toBe(false);
    expect(result.error?.message).toBeDefined();
  });
});
```

---

## 3. Component & Accessibility Testing (React Testing Library & axe-core)

UI primitives and tool components are tested for accessibility and interaction patterns:
- **Keyboard Navigation**: Pressing `Tab` focuses controls sequentially; pressing `Enter` or `Space` activates them.
- **Copy Feedback**: Clicking `CopyButton` writes to the navigator clipboard and displays an active checkmark for 2 seconds with an `aria-live` announcement.
- **Automated A11y (axe-core)**: Zero WCAG 2.1 AA violations permitted on any component.

---

## 4. End-to-End Testing (Playwright)

Playwright runs automated regression suites against the production build across Chromium, Firefox, and WebKit viewports (desktop `1280x720`, mobile `375x667`):

### Critical E2E Scenarios:
1. **JSON Formatter Journey**:
   - Navigate to `/tools/developer/json-formatter`.
   - Input raw unformatted JSON into textarea.
   - Click "Beautify".
   - Verify formatted output in output card.
   - Click "Copy Output", verify clipboard content matches output.
2. **QR Code Generator Journey**:
   - Navigate to `/tools/media/qr-code-generator`.
   - Type `https://example.com`.
   - Verify `<canvas>` element generates QR matrix.
   - Click "Download PNG" and verify trigger.
3. **Ad Placement Integrity Journey**:
   - Verify top leaderboard container maintains `min-h-[90px]` to eliminate CLS.
   - Verify ad banner label `"ADVERTISEMENT"` is visible.
   - Verify no ads overlap with functional buttons.

---

## 5. Continuous Integration (CI) Quality Gates

Every code change must pass four sequential gates before merge:

```bash
# Gate 1: Type Checking
npm run typecheck

# Gate 2: Code Quality & Linting
npm run lint

# Gate 3: Unit & Engine Tests
npm run test:run

# Gate 4: Production Build Compilation
npm run build
```

Failure at any gate immediately aborts the deployment.
