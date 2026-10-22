import React from 'react';
import Link from 'next/link';
import { TOOLS } from '@/config/tools';
import { SITE_CONFIG } from '@/config/site';
import { LeaderboardAd } from '@/components/ads/LeaderboardAd';
import { NativeAdBanner } from '@/components/ads/NativeAdBanner';
import {
  ShieldCheck,
  Zap,
  Lock,
  Sparkles,
  ArrowRight,
  Code2,
  Binary,
  Fingerprint,
  Shield,
  FileText,
  Type,
  QrCode,
  Clock,
  ShoppingBag,
  Calculator,
  Image as ImageIcon,
  Flame,
  Star,
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  'etsy-fee-calculator': <ShoppingBag className="h-6 w-6 text-primary" />,
  'us-1099-tax-calculator': <Calculator className="h-6 w-6 text-primary" />,
  'heic-to-jpg-converter': <ImageIcon className="h-6 w-6 text-primary" />,
  'tiktok-hook-generator': <Flame className="h-6 w-6 text-primary" />,
  'json-formatter': <Code2 className="h-6 w-6 text-primary" />,
  'base64-encode-decode': <Binary className="h-6 w-6 text-primary" />,
  'uuid-generator': <Fingerprint className="h-6 w-6 text-primary" />,
  'hash-generator': <Shield className="h-6 w-6 text-primary" />,
  'word-counter': <FileText className="h-6 w-6 text-primary" />,
  'case-converter': <Type className="h-6 w-6 text-primary" />,
  'qr-code-generator': <QrCode className="h-6 w-6 text-primary" />,
  'unix-timestamp-converter': <Clock className="h-6 w-6 text-primary" />,
};

export default function HomePage() {
  const featuredTools = TOOLS.filter((t) => t.isFeatured);
  const otherTools = TOOLS.filter((t) => !t.isFeatured);

  return (
    <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 space-y-12">
      {/* Top Leaderboard Ad Slot */}
      <LeaderboardAd />

      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto space-y-4 pt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-subtle text-primary text-xs font-semibold border border-primary/20">
          <Sparkles className="h-3.5 w-3.5" />
          <span>12 Free, Fast &amp; Client-Side Calculators &amp; Converters</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-body">
          High-Yield Calculators. <br />
          <span className="text-primary">100% Client-Side Privacy.</span>
        </h1>

        <p className="text-base sm:text-lg text-body-muted max-w-2xl mx-auto leading-relaxed">
          From US 1099 freelance tax estimates and Etsy seller fee breakdowns to HEIC photo conversions
          and developer utilities—everything runs in your browser with zero server uploads.
        </p>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {SITE_CONFIG.categories.map((c) => (
            <Link
              key={c.id}
              href={`/categories/${c.id}`}
              className="px-3.5 py-1.5 rounded-lg border border-surface-border bg-surface text-xs font-medium text-body hover:border-primary/40 hover:bg-surface-subtle transition-colors"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured High-Yield Niche Tools Section */}
      <section aria-labelledby="featured-heading" className="space-y-6">
        <div className="flex items-center justify-between pb-2 border-b border-surface-border">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
            <h2 id="featured-heading" className="text-2xl font-bold tracking-tight text-body">
              Featured US/UK Niche Tools
            </h2>
          </div>
          <span className="text-xs text-primary font-semibold">High Search Volume</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredTools.map((tool) => (
            <Link
              key={tool.id}
              href={`/tools/${tool.category}/${tool.slug}`}
              className="group flex flex-col justify-between p-5 rounded-xl border-2 border-primary/20 bg-surface shadow-card hover:shadow-card-hover hover:border-primary transition-all duration-200"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-primary-subtle">
                    {iconMap[tool.id] || <Code2 className="h-6 w-6 text-primary" />}
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                    Popular
                  </span>
                </div>

                <h3 className="text-base font-bold text-body group-hover:text-primary transition-colors">
                  {tool.name}
                </h3>

                <p className="text-xs text-body-muted line-clamp-2 leading-relaxed">
                  {tool.shortDescription}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-surface-border/60 flex items-center justify-between text-xs font-semibold text-primary">
                <span>Launch Tool</span>
                <ArrowRight className="h-3.5 w-3.5 transform transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Native In-Content Sponsor Banner */}
      <NativeAdBanner />

      {/* All Platform Utilities Section */}
      <section aria-labelledby="all-tools-heading" className="space-y-6">
        <div className="flex items-center justify-between pb-2 border-b border-surface-border">
          <h2 id="all-tools-heading" className="text-xl font-bold tracking-tight text-body">
            All 12 Web Utilities
          </h2>
          <span className="text-xs text-body-muted font-medium">100% In-Browser</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {TOOLS.map((tool) => (
            <Link
              key={tool.id}
              href={`/tools/${tool.category}/${tool.slug}`}
              className="group flex flex-col justify-between p-5 rounded-xl border border-surface-border bg-surface shadow-card hover:shadow-card-hover hover:border-primary/40 transition-all duration-200"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-lg bg-surface-subtle">
                    {iconMap[tool.id] || <Code2 className="h-6 w-6 text-primary" />}
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-surface-subtle text-body-muted">
                    {tool.category}
                  </span>
                </div>

                <h3 className="text-base font-bold text-body group-hover:text-primary transition-colors">
                  {tool.name}
                </h3>

                <p className="text-xs text-body-muted line-clamp-2 leading-relaxed">
                  {tool.shortDescription}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-surface-border/60 flex items-center justify-between text-xs font-semibold text-primary">
                <span>Open Tool</span>
                <ArrowRight className="h-3.5 w-3.5 transform transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trust & Value Proposition Pillars */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-surface-border">
        <div className="p-5 rounded-xl border border-surface-border bg-surface space-y-2">
          <div className="h-9 w-9 rounded-lg bg-success-subtle text-success flex items-center justify-center">
            <Lock className="h-5 w-5" />
          </div>
          <h3 className="font-bold text-base text-body">100% In-Browser Privacy</h3>
          <p className="text-xs text-body-muted leading-relaxed">
            Your proprietary financial numbers, tax returns, personal photos, and code snippets never
            touch a remote backend.
          </p>
        </div>

        <div className="p-5 rounded-xl border border-surface-border bg-surface space-y-2">
          <div className="h-9 w-9 rounded-lg bg-primary-subtle text-primary flex items-center justify-center">
            <Zap className="h-5 w-5" />
          </div>
          <h3 className="font-bold text-base text-body">Sub-Second Execution</h3>
          <p className="text-xs text-body-muted leading-relaxed">
            Zero network latency during transformations. Static HTML generation ensures instant
            page loading and fluid responsiveness globally.
          </p>
        </div>

        <div className="p-5 rounded-xl border border-surface-border bg-surface space-y-2">
          <div className="h-9 w-9 rounded-lg bg-warning-subtle text-warning flex items-center justify-center">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <h3 className="font-bold text-base text-body">Cloud Persistence via Neon DB</h3>
          <p className="text-xs text-body-muted leading-relaxed">
            Instantly save and share calculation links with clients and business partners powered by
            serverless PostgreSQL.
          </p>
        </div>
      </section>
    </main>
  );
}
