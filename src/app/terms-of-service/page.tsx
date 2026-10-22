import React from 'react';
import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms and conditions governing the use of OmniTools online web utilities.',
};

export default function TermsOfServicePage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 w-full space-y-8">
      <Breadcrumbs items={[{ label: 'Terms of Service' }]} />

      <div className="space-y-3 pb-6 border-b border-surface-border">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-body">
          Terms of Service
        </h1>
        <p className="text-sm text-body-muted">
          Last Updated: October 2026
        </p>
      </div>

      <div className="prose prose-slate max-w-none space-y-6 text-sm text-body leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-body">1. Acceptance of Terms</h2>
          <p>
            By accessing or using OmniTools, you agree to be bound by these Terms of Service. If you
            do not agree to these terms, please do not use our services.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-body">2. Permitted Use</h2>
          <p>
            All tools provided on OmniTools are free to use for both personal and commercial
            purposes. You may use our utilities to format code, compute hashes, generate QR codes,
            and convert data without royalty or attribution requirements.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-body">3. Disclaimers &amp; Limitation of Liability</h2>
          <p>
            OmniTools provides services on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranty of
            any kind, whether express or implied. While we take pride in mathematical and
            algorithmic accuracy, we do not warrant that our tools will be error-free or uninterrupted.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-body">4. Prohibited Activities</h2>
          <p>
            You agree not to attempt to circumvent, disable, or interfere with security features or
            advertising integrations, or use automated bots to artificially inflate traffic or
            impressions.
          </p>
        </section>
      </div>
    </main>
  );
}
