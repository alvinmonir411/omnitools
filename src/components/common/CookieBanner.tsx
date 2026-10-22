'use client';

import * as React from 'react';
import Link from 'next/link';
import { ShieldCheck, Cookie } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function CookieBanner() {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    try {
      const consent = localStorage.getItem('omnitools_cookie_consent');
      if (!consent) {
        setShow(true);
      }
    } catch {
      // Ignore if localStorage is disabled
    }
  }, []);

  const handleConsent = (accepted: boolean) => {
    try {
      localStorage.setItem('omnitools_cookie_consent', accepted ? 'accepted' : 'declined');
    } catch {
      // Ignore
    }
    setShow(false);
  };

  if (!show) return null;

  return (
    <aside
      role="region"
      aria-label="Cookie consent banner"
      className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-xl rounded-xl border border-surface-border bg-surface p-4 sm:p-5 shadow-modal animate-in slide-in-from-bottom-5"
    >
      <div className="flex items-start gap-3">
        <div className="rounded-lg bg-primary-subtle p-2 text-primary flex-shrink-0">
          <Cookie className="h-5 w-5" />
        </div>
        <div className="flex-1 space-y-2">
          <h4 className="text-sm font-semibold text-body">
            Privacy & Advertising Preferences
          </h4>
          <p className="text-xs text-body-muted leading-relaxed">
            We use client-side storage for tool functionality and non-intrusive advertising to keep
            our tools free. <strong>Your tool data and files are never stored or uploaded.</strong> Read
            our{' '}
            <Link href="/privacy-policy" className="text-primary underline hover:text-primary-hover">
              Privacy Policy
            </Link>
            .
          </p>
          <div className="flex items-center gap-2 pt-1">
            <Button size="sm" variant="primary" onClick={() => handleConsent(true)}>
              Accept All
            </Button>
            <Button size="sm" variant="outline" onClick={() => handleConsent(false)}>
              Essential Only
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
}
