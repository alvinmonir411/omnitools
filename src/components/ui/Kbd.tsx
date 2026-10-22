import * as React from 'react';
import { cn } from '@/lib/utils/cn';

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {}

export function Kbd({ className, children, ...props }: KbdProps) {
  return (
    <kbd
      className={cn(
        'inline-flex items-center justify-center rounded border border-surface-border bg-surface-subtle px-1.5 py-0.5 font-mono text-[10px] font-semibold text-body-muted shadow-sm',
        className,
      )}
      {...props}
    >
      {children}
    </kbd>
  );
}
