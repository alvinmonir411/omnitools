'use client';

import * as React from 'react';
import { Copy, Check } from 'lucide-react';
import { Button, ButtonProps } from '@/components/ui/Button';
import { useClipboard } from '@/hooks/useClipboard';
import { cn } from '@/lib/utils/cn';

export interface CopyButtonProps extends Omit<ButtonProps, 'onClick'> {
  text: string;
  label?: string;
  copiedLabel?: string;
}

export function CopyButton({
  text,
  label = 'Copy',
  copiedLabel = 'Copied!',
  variant = 'secondary',
  size = 'sm',
  className,
  ...props
}: CopyButtonProps) {
  const { copy, copied } = useClipboard();

  const handleCopy = () => {
    copy(text);
  };

  return (
    <>
      <Button
        type="button"
        variant={copied ? 'success' : variant}
        size={size}
        onClick={handleCopy}
        disabled={!text}
        aria-label={copied ? copiedLabel : label}
        className={cn('transition-all duration-200', className)}
        {...props}
      >
        {copied ? (
          <>
            <Check className="h-4 w-4 animate-in zoom-in-50 text-white" />
            <span>{copiedLabel}</span>
          </>
        ) : (
          <>
            <Copy className="h-4 w-4 text-body-muted group-hover:text-body" />
            <span>{label}</span>
          </>
        )}
      </Button>
      <span className="sr-only" aria-live="polite">
        {copied ? copiedLabel : ''}
      </span>
    </>
  );
}
