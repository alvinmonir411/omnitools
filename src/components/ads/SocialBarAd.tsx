'use client';

import * as React from 'react';
import Script from 'next/script';
import { ADS_CONFIG } from '@/config/ads';
import { Bell, X, ExternalLink, Sparkles } from 'lucide-react';

export function SocialBarAd() {
  const [dismissed, setDismissed] = React.useState(false);

  if (!ADS_CONFIG.socialBar.enabled || dismissed) return null;

  // Real Adsterra script injection when provided
  if (!ADS_CONFIG.debugWireframe && ADS_CONFIG.socialBar.scriptUrl) {
    return (
      <Script
        src={ADS_CONFIG.socialBar.scriptUrl}
        strategy="lazyOnload"
      />
    );
  }

  // Visual demonstration / preview of the Social Bar in-page push widget
  return (
    <div
      role="complementary"
      aria-label="Sponsored notification"
      className="fixed bottom-4 right-4 z-50 max-w-xs sm:max-w-sm rounded-xl border border-primary/20 bg-surface p-3.5 shadow-modal animate-in slide-in-from-bottom-5"
    >
      <div className="flex items-start gap-3">
        <div className="h-9 w-9 rounded-lg bg-primary-subtle text-primary flex items-center justify-center flex-shrink-0">
          <Sparkles className="h-5 w-5" />
        </div>

        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
              Sponsored Offer
            </span>
            <button
              type="button"
              onClick={() => setDismissed(true)}
              className="text-body-muted hover:text-body p-0.5 rounded"
              aria-label="Dismiss offer"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          <p className="text-xs font-semibold text-body leading-snug">
            Save up to 45% on US/UK Business Invoicing &amp; Seller Banking
          </p>
          <p className="text-[11px] text-body-muted">
            Special partner rates for freelancers and Etsy sellers.
          </p>

          <div className="pt-1.5 flex items-center gap-2">
            <a
              href="https://omnitools-lovat.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-bold text-primary hover:text-primary-hover"
            >
              <span>Learn More</span>
              <ExternalLink className="h-3 w-3" />
            </a>
            <span className="text-[9px] text-body-muted/60 uppercase">Adsterra Social Bar</span>
          </div>
        </div>
      </div>
    </div>
  );
}
