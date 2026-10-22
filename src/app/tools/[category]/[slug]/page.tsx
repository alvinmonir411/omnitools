import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { TOOLS, getToolBySlug } from '@/config/tools';
import { SITE_CONFIG } from '@/config/site';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { LeaderboardAd, ContentBottomAd } from '@/components/ads/LeaderboardAd';
import { SidebarAd } from '@/components/ads/SidebarAd';
import { ToolHeader } from '@/components/tools/ToolHeader';
import { ToolGuideSection, ToolFeaturesSection } from '@/components/tools/ToolGuideSection';
import { ToolFaqSection } from '@/components/tools/ToolFaqSection';
import { RelatedToolsGrid } from '@/components/tools/RelatedToolsGrid';
import { Card, CardContent } from '@/components/ui/Card';

// Tool UIs
import { JsonFormatterUI } from '@/components/tools/json-formatter/JsonFormatterUI';
import { Base64UI } from '@/components/tools/base64-encode-decode/Base64UI';
import { UuidUI } from '@/components/tools/uuid-generator/UuidUI';
import { HashUI } from '@/components/tools/hash-generator/HashUI';
import { WordCounterUI } from '@/components/tools/word-counter/WordCounterUI';
import { CaseConverterUI } from '@/components/tools/case-converter/CaseConverterUI';
import { QrCodeUI } from '@/components/tools/qr-code-generator/QrCodeUI';
import { TimestampUI } from '@/components/tools/unix-timestamp-converter/TimestampUI';

interface ToolPageProps {
  params: {
    category: string;
    slug: string;
  };
}

export async function generateStaticParams() {
  return TOOLS.map((tool) => ({
    category: tool.category,
    slug: tool.slug,
  }));
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const tool = getToolBySlug(params.slug);
  if (!tool) return {};

  const title = `${tool.name} - Free Online Tool`;
  const canonicalUrl = `${SITE_CONFIG.url}/tools/${tool.category}/${tool.slug}`;

  return {
    title,
    description: tool.shortDescription,
    keywords: tool.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${tool.name} | ${SITE_CONFIG.name}`,
      description: tool.shortDescription,
      url: canonicalUrl,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${tool.name} | ${SITE_CONFIG.name}`,
      description: tool.shortDescription,
    },
  };
}

function renderToolComponent(slug: string) {
  switch (slug) {
    case 'json-formatter':
      return <JsonFormatterUI />;
    case 'base64-encode-decode':
      return <Base64UI />;
    case 'uuid-generator':
      return <UuidUI />;
    case 'hash-generator':
      return <HashUI />;
    case 'word-counter':
      return <WordCounterUI />;
    case 'case-converter':
      return <CaseConverterUI />;
    case 'qr-code-generator':
      return <QrCodeUI />;
    case 'unix-timestamp-converter':
      return <TimestampUI />;
    default:
      return null;
  }
}

export default function ToolPage({ params }: ToolPageProps) {
  const tool = getToolBySlug(params.slug);

  if (!tool || tool.category !== params.category) {
    notFound();
  }

  const categoryName =
    SITE_CONFIG.categories.find((c) => c.id === tool.category)?.name || tool.category;

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': tool.schemaType,
    name: tool.name,
    url: `${SITE_CONFIG.url}/tools/${tool.category}/${tool.slug}`,
    description: tool.shortDescription,
    applicationCategory: `${tool.category}Application`,
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full space-y-6">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { label: categoryName, href: `/categories/${tool.category}` },
            { label: tool.name },
          ]}
        />

        {/* Top Leaderboard Ad Slot (728x90 desktop / 320x50 mobile, 0 CLS) */}
        <LeaderboardAd />

        {/* Main Workspace Layout with Sidebar Rail on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Tool Primary Workspace (3 columns on lg) */}
          <div className="lg:col-span-3 space-y-8">
            <ToolHeader tool={tool} />

            {/* Interactive Tool Sandbox */}
            <div className="min-h-[300px]">
              {renderToolComponent(tool.slug)}
            </div>

            {/* In-Content Ad Slot between tool and documentation */}
            <ContentBottomAd />

            {/* How To Use Guide */}
            <ToolGuideSection steps={tool.howToSteps} />

            {/* Key Capabilities */}
            <ToolFeaturesSection features={tool.features} />

            {/* Technical Specifications Deep Dive */}
            {tool.technicalDetails && (
              <section aria-labelledby="tech-details-heading" className="space-y-3">
                <h2
                  id="tech-details-heading"
                  className="text-xl sm:text-2xl font-bold tracking-tight text-body"
                >
                  Technical Specifications &amp; Standards
                </h2>
                <Card>
                  <CardContent className="p-5 text-sm text-body leading-relaxed bg-surface">
                    {tool.technicalDetails}
                  </CardContent>
                </Card>
              </section>
            )}

            {/* FAQ Accordion Section */}
            <ToolFaqSection faqs={tool.faqs} />

            {/* Related Tools */}
            <RelatedToolsGrid currentTool={tool} />
          </div>

          {/* Desktop Right Rail (1 column on lg) */}
          <div className="lg:col-span-1 space-y-6">
            <SidebarAd />

            {/* Quick Privacy Pledge Card */}
            <Card className="bg-surface-subtle/50 border-surface-border">
              <CardContent className="p-4 space-y-2 text-xs">
                <span className="font-bold text-body uppercase tracking-wider block">
                  Client Privacy Pledge
                </span>
                <p className="text-body-muted leading-relaxed">
                  OmniTools operates with 100% in-browser processing. Your inputs, tokens, and files
                  are never transmitted to or logged on any external server.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}
