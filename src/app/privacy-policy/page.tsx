import React from 'react';
import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { ShieldCheck, Lock, EyeOff, ServerOff } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'Privacy Policy & Zero-Data Retention Pledge',
  description:
    'Learn how OmniTools protects your privacy with 100% in-browser client-side processing and zero server logging.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 w-full space-y-8">
      <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />

      <div className="space-y-3 pb-6 border-b border-surface-border">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase text-success tracking-wider">
          <ShieldCheck className="h-4 w-4" />
          <span>Our Uncompromising Pledge</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-body">
          Privacy Policy &amp; Data Pledge
        </h1>
        <p className="text-sm text-body-muted">
          Effective Date: October 2026 · Last Updated: October 2026
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-surface">
          <CardContent className="p-4 space-y-2 text-center">
            <ServerOff className="h-6 w-6 text-primary mx-auto" />
            <h3 className="font-bold text-sm text-body">Zero Server Uploads</h3>
            <p className="text-xs text-body-muted">
              Tool inputs, files, code, and text never touch a server.
            </p>
          </CardContent>
        </Card>
        <Card className="bg-surface">
          <CardContent className="p-4 space-y-2 text-center">
            <Lock className="h-6 w-6 text-primary mx-auto" />
            <h3 className="font-bold text-sm text-body">100% In-Browser</h3>
            <p className="text-xs text-body-muted">
              Executed entirely inside your local device JavaScript engine.
            </p>
          </CardContent>
        </Card>
        <Card className="bg-surface">
          <CardContent className="p-4 space-y-2 text-center">
            <EyeOff className="h-6 w-6 text-primary mx-auto" />
            <h3 className="font-bold text-sm text-body">No Payload Telemetry</h3>
            <p className="text-xs text-body-muted">
              We never log, inspect, or retain what you type or convert.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="prose prose-slate max-w-none space-y-6 text-sm text-body leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-body">1. Core Philosophy: Client-Side First</h2>
          <p>
            OmniTools was built out of frustration with online tools that send confidential payloads,
            API tokens, customer data, and passwords to unverified remote servers. Every single tool
            on this platform operates completely client-side in your web browser using HTML5, Web
            Crypto API, and standard JavaScript.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-body">2. What Information We Do NOT Collect</h2>
          <p>We do not collect, view, transmit, store, or sell:</p>
          <ul className="list-disc pl-5 space-y-1 text-body-muted">
            <li>Your JSON code, syntax, or formatted documents.</li>
            <li>Plaintext or Base64-encoded strings or uploaded files.</li>
            <li>Strings entered into cryptographic hash or UUID generators.</li>
            <li>Text entered into the Word Counter or Case Converter.</li>
            <li>Destination URLs or information entered into the QR Code Generator.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-body">3. Local Storage</h2>
          <p>
            Any preferences (such as cookie consent choices or tool indentation settings) are stored
            strictly in your browser’s local storage (`localStorage`). This data never leaves your
            computer and can be deleted at any time through your browser settings.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-body">4. Third-Party Advertising (Adsterra)</h2>
          <p>
            To keep all tools 100% free with no paywalls or required accounts, OmniTools displays
            legitimate online advertisements served by advertising partners including Adsterra.
            These partners may use standard web cookies or beacons to serve non-intrusive, relevant
            ads in accordance with their privacy policies. Advertising scripts run in isolated
            containers and cannot read your tool input contents.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-body">5. Contact Us</h2>
          <p>
            If you have questions or feedback regarding this Privacy Policy, please reach out to us
            at <span className="font-semibold text-primary">privacy@omnitools.app</span>.
          </p>
        </section>
      </div>
    </main>
  );
}
