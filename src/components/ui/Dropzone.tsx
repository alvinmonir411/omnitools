'use client';

import * as React from 'react';
import { UploadCloud, File, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export interface DropzoneProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  maxSizeBytes?: number;
  className?: string;
  label?: string;
  description?: string;
}

export function Dropzone({
  onFileSelect,
  accept,
  maxSizeBytes = 10 * 1024 * 1024, // 10MB default
  className,
  label = 'Click to upload or drag & drop',
  description = 'Files are processed locally and never uploaded to any server',
}: DropzoneProps) {
  const [isDragging, setIsDragging] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (maxSizeBytes && file.size > maxSizeBytes) {
      setError(`File size exceeds ${(maxSizeBytes / (1024 * 1024)).toFixed(0)}MB limit.`);
      return;
    }
    setError(null);
    onFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="w-full space-y-2">
      <div
        role="button"
        tabIndex={0}
        onClick={() => fileInputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            fileInputRef.current?.click();
          }
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          'flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 text-center cursor-pointer transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
          isDragging
            ? 'border-primary bg-primary-subtle/50'
            : 'border-surface-border bg-surface hover:bg-surface-subtle',
          error && 'border-danger bg-danger-subtle/20',
          className,
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleFile(e.target.files[0]);
            }
          }}
        />

        <div className="rounded-full bg-primary-subtle p-3 mb-3 text-primary">
          <UploadCloud className="h-6 w-6" />
        </div>

        <p className="text-sm font-semibold text-body mb-1">{label}</p>
        <p className="text-xs text-body-muted max-w-sm">{description}</p>
      </div>

      {error && (
        <div className="flex items-center gap-1.5 text-xs text-danger font-medium">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
