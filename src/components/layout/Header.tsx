'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Wrench, Search, Menu, X, ShieldCheck } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';
import { QuickSearchModal } from './QuickSearchModal';
import { Kbd } from '@/components/ui/Kbd';

export function Header() {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // Global Ctrl+K / Cmd+K listener
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-surface-border bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/80">
        <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
          {/* Logo & Brand */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white shadow-sm transition-transform group-hover:scale-105">
                <Wrench className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-body">
                  {SITE_CONFIG.name}
                </span>
                <span className="hidden sm:inline-block text-[10px] text-primary font-semibold tracking-wider uppercase">
                  Private Web Utilities
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 pl-4 border-l border-surface-border">
              {SITE_CONFIG.categories.map((category) => {
                const isActive = pathname.startsWith(`/categories/${category.id}`);
                return (
                  <Link
                    key={category.id}
                    href={`/categories/${category.id}`}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                      isActive
                        ? 'bg-surface-subtle text-primary font-semibold'
                        : 'text-body-muted hover:text-body hover:bg-surface-subtle'
                    }`}
                  >
                    {category.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3">
            {/* Search Trigger Button */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 rounded-lg border border-surface-border bg-surface-subtle px-3 py-1.5 text-xs text-body-muted hover:border-slate-300 hover:text-body transition-colors"
              aria-label="Open tool search"
            >
              <Search className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Search tools...</span>
              <div className="hidden sm:flex items-center gap-0.5 ml-2">
                <Kbd>Ctrl</Kbd>
                <Kbd>K</Kbd>
              </div>
            </button>

            {/* Client-Side Privacy Badge */}
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-success-subtle text-success text-[11px] font-semibold border border-success/20">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>100% Client-Side</span>
            </div>

            {/* Mobile Menu Hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden rounded-md p-2 text-body-muted hover:bg-surface-subtle hover:text-body focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-surface-border bg-surface px-4 py-3 space-y-2 animate-in slide-in-from-top-2">
            <div className="text-xs font-semibold uppercase text-body-muted px-2 py-1">
              Tool Categories
            </div>
            {SITE_CONFIG.categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.id}`}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-medium text-body rounded-md hover:bg-surface-subtle transition-colors"
              >
                {category.name}
              </Link>
            ))}
            <div className="pt-2 border-t border-surface-border flex items-center justify-between px-2 text-xs text-success font-medium">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4" />
                <span>Zero Server Uploads</span>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Global Quick Search Modal */}
      <QuickSearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
