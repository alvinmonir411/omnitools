import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Home, Search, Wrench } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-16 max-w-lg mx-auto space-y-6">
      <div className="h-16 w-16 rounded-2xl bg-primary-subtle text-primary flex items-center justify-center mx-auto shadow-sm">
        <Wrench className="h-8 w-8" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-primary">
          404 Error
        </span>
        <h1 className="text-3xl font-extrabold text-body">Tool or Page Not Found</h1>
        <p className="text-sm text-body-muted leading-relaxed">
          The requested utility or page does not exist or may have been relocated.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <Link href="/">
          <Button variant="primary">
            <Home className="h-4 w-4 mr-2" />
            Back to Homepage
          </Button>
        </Link>
      </div>
    </main>
  );
}
