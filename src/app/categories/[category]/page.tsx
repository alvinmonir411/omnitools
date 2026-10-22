import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/config/site';
import { getToolsByCategory } from '@/config/tools';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { LeaderboardAd } from '@/components/ads/LeaderboardAd';
import { ArrowRight, Wrench, ShieldCheck } from 'lucide-react';

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export async function generateStaticParams() {
  return SITE_CONFIG.categories.map((c) => ({
    category: c.id,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const cat = SITE_CONFIG.categories.find((c) => c.id === params.category);
  if (!cat) return {};

  const title = `${cat.name} - Free Browser Utilities | ${SITE_CONFIG.name}`;
  const canonicalUrl = `${SITE_CONFIG.url}/categories/${cat.id}`;

  return {
    title,
    description: cat.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description: cat.description,
      url: canonicalUrl,
    },
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const cat = SITE_CONFIG.categories.find((c) => c.id === params.category);

  if (!cat) {
    notFound();
  }

  const tools = getToolsByCategory(params.category);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full space-y-8">
      <Breadcrumbs items={[{ label: cat.name }]} />

      <LeaderboardAd />

      <div className="space-y-3 pb-6 border-b border-surface-border">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-sm">
            <Wrench className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-body">
              {cat.name}
            </h1>
            <p className="text-sm sm:text-base text-body-muted mt-1">
              {cat.description}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Link
            key={tool.id}
            href={`/tools/${tool.category}/${tool.slug}`}
            className="group flex flex-col justify-between p-6 rounded-xl border border-surface-border bg-surface shadow-card hover:shadow-card-hover hover:border-primary/40 transition-all duration-200"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-subtle text-primary uppercase tracking-wider">
                  {tool.category}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-success font-medium">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Private
                </span>
              </div>
              <h2 className="text-xl font-bold text-body group-hover:text-primary transition-colors">
                {tool.name}
              </h2>
              <p className="text-sm text-body-muted line-clamp-3 leading-relaxed">
                {tool.shortDescription}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-surface-border flex items-center justify-between text-xs font-semibold text-primary">
              <span>Open Tool</span>
              <ArrowRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
