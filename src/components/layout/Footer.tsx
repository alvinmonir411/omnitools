import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Heart, Wrench } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-surface-border bg-surface text-body mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Privacy Pledge Column */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white shadow-sm">
                <Wrench className="h-4 w-4" />
              </div>
              <span className="text-lg font-bold tracking-tight text-body">
                {SITE_CONFIG.name}
              </span>
            </Link>
            <p className="text-sm text-body-muted max-w-sm leading-relaxed">
              OmniTools provides free, private, high-performance web utilities for developers, writers,
              and digital creators. All computations run 100% inside your browser.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-success bg-success-subtle/60 border border-success/20 px-3 py-1.5 rounded-lg w-fit">
              <ShieldCheck className="h-4 w-4" />
              <span>Client-Side Execution Guarantee: We Never Store Your Data</span>
            </div>
          </div>

          {/* Categories Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-body">
              Categories
            </h4>
            <ul className="space-y-2 text-sm text-body-muted">
              {SITE_CONFIG.categories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/categories/${category.id}`}
                    className="hover:text-primary transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Compliance Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-body">
              Legal & Trust
            </h4>
            <ul className="space-y-2 text-sm text-body-muted">
              <li>
                <Link href="/privacy-policy" className="hover:text-primary transition-colors">
                  Privacy Policy & Data Pledge
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  About OmniTools
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-surface-border flex flex-col sm:flex-row items-center justify-between text-xs text-body-muted gap-4">
          <p>© {currentYear} OmniTools. Built for speed, privacy, and zero data retention.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="h-3 w-3 text-danger fill-danger" />
            <span>for the open web</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
