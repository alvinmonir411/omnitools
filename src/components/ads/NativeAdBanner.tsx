import React from 'react';
import { ADS_CONFIG } from '@/config/ads';
import { ExternalLink, Sparkles, TrendingUp } from 'lucide-react';

export function NativeAdBanner({ className }: { className?: string }) {
  if (!ADS_CONFIG.nativeBanner.enabled) return null;

  return (
    <aside
      aria-label="Sponsored Recommendation"
      className={`my-6 rounded-xl border border-surface-border bg-gradient-to-r from-surface to-surface-subtle/50 p-4 transition-all shadow-sm ${
        className || ''
      }`}
    >
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-surface-border/50 text-[10px] font-bold uppercase tracking-widest text-body-muted">
        <span className="flex items-center gap-1 text-primary">
          <Sparkles className="h-3 w-3" />
          Recommended by OmniTools Partners
        </span>
        <span className="text-[9px] text-body-muted/60">ADVERTISEMENT</span>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-body">
              Automate Your US E-Commerce Accounting &amp; Quarterly Taxes
            </h4>
            <p className="text-xs text-body-muted leading-relaxed mt-0.5">
              Sync Etsy, Amazon, and Stripe payouts automatically with zero spreadsheets.
            </p>
          </div>
        </div>

        <a
          href={ADS_CONFIG.directLink.url || 'https://omnitools-lovat.vercel.app'}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary-hover shadow-sm transition-colors whitespace-nowrap"
        >
          <span>Claim Offer</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </aside>
  );
}
