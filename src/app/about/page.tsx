import React from 'react';
import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { Wrench, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'About OmniTools - The Story Behind Private Web Utilities',
  description:
    'Discover why OmniTools was built: to deliver blisteringly fast, 100% private developer and digital utilities with zero compromise.',
};

export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 w-full space-y-8">
      <Breadcrumbs items={[{ label: 'About OmniTools' }]} />

      <div className="space-y-3 pb-6 border-b border-surface-border">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-body">
          About OmniTools
        </h1>
        <p className="text-base text-body-muted leading-relaxed">
          The fast, respectful, client-side utility suite for developers, writers, and digital
          professionals.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6 space-y-3">
            <div className="p-2.5 rounded-lg bg-primary-subtle text-primary w-fit">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h2 className="text-lg font-bold text-body">Why We Built OmniTools</h2>
            <p className="text-sm text-body-muted leading-relaxed">
              Every day, millions of engineers and writers use online formatters, converters, and
              generators. Most existing tools are packed with intrusive popups, slow server-side
              processing, and questionable data retention policies. We built OmniTools to prove that
              web utilities can be beautiful, fast, and 100% private.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 space-y-3">
            <div className="p-2.5 rounded-lg bg-success-subtle text-success w-fit">
              <Sparkles className="h-6 w-6" />
            </div>
            <h2 className="text-lg font-bold text-body">Our Engineering Standards</h2>
            <p className="text-sm text-body-muted leading-relaxed">
              Every tool is compiled to static HTML, adheres strictly to WCAG 2.1 AA accessibility
              guidelines, delivers sub-millisecond execution in your local browser sandbox, and
              preserves zero Cumulative Layout Shift (CLS).
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
