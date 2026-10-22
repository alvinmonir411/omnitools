'use client';

import * as React from 'react';
import { convertHeicImage, HeicConversionResult } from '@/lib/tools/heic-to-jpg-converter/engine';
import { Dropzone } from '@/components/ui/Dropzone';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Alert } from '@/components/ui/Alert';
import { useDirectLink } from '@/hooks/useDirectLink';
import { Download, Image as ImageIcon, Sparkles, Trash2, CheckCircle2 } from 'lucide-react';

export function HeicConverterUI() {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [format, setFormat] = React.useState<'image/jpeg' | 'image/png'>('image/jpeg');
  const [quality, setQuality] = React.useState<number>(0.85);
  const [isConverting, setIsConverting] = React.useState(false);
  const [result, setResult] = React.useState<HeicConversionResult | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const { triggerMonetizedAction } = useDirectLink();

  const handleFile = async (file: File) => {
    setSelectedFile(file);
    setError(null);
    setIsConverting(true);

    const res = await convertHeicImage(file, { format, quality });
    setIsConverting(false);

    if (res.success && res.data) {
      setResult(res.data);
    } else {
      setError(res.error?.message || 'Failed to process HEIC file.');
    }
  };

  const handleDownload = () => {
    if (!result) return;
    triggerMonetizedAction();

    const a = document.createElement('a');
    a.href = result.dataUrl;
    const ext = result.format.toLowerCase();
    const originalName = selectedFile ? selectedFile.name.replace(/\.[^/.]+$/, '') : 'converted';
    a.download = `${originalName}.${ext}`;
    a.click();
  };

  const handleReset = () => {
    setSelectedFile(null);
    setResult(null);
    setError(null);
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
  };

  return (
    <div className="space-y-6">
      {/* Options Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl border border-surface-border bg-surface shadow-sm">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase text-body-muted">Target Format:</span>
            <div className="inline-flex rounded-lg border border-surface-border p-0.5 bg-surface-subtle">
              <button
                type="button"
                onClick={() => setFormat('image/jpeg')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                  format === 'image/jpeg'
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-body-muted hover:text-body'
                }`}
              >
                JPEG (.jpg)
              </button>
              <button
                type="button"
                onClick={() => setFormat('image/png')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                  format === 'image/png'
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-body-muted hover:text-body'
                }`}
              >
                PNG (.png)
              </button>
            </div>
          </div>

          {format === 'image/jpeg' && (
            <div className="flex items-center gap-2 text-xs">
              <span className="font-semibold text-body-muted">Quality:</span>
              <input
                type="range"
                min="0.5"
                max="1.0"
                step="0.05"
                value={quality}
                onChange={(e) => setQuality(parseFloat(e.target.value))}
                className="w-24 accent-primary"
              />
              <span className="font-bold text-body">{(quality * 100).toFixed(0)}%</span>
            </div>
          )}
        </div>

        {selectedFile && (
          <Button size="sm" variant="outline" onClick={handleReset}>
            <Trash2 className="h-3.5 w-3.5 mr-1 text-danger" />
            Clear
          </Button>
        )}
      </div>

      {/* Main Dropzone / Converter Area */}
      {!result ? (
        <div className="space-y-4">
          <Dropzone
            onFileSelect={handleFile}
            accept=".heic,.heif"
            maxSizeBytes={35 * 1024 * 1024}
            label="Drop Apple iPhone HEIC/HEIF photo here"
            description="Photos are decoded locally in your browser memory and never uploaded (Max 35MB)"
          />

          {isConverting && (
            <div className="flex items-center justify-center gap-3 p-8 rounded-xl border border-primary/20 bg-primary-subtle text-primary font-semibold text-sm animate-pulse">
              <div className="h-5 w-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <span>Converting HEIC photo to {format === 'image/jpeg' ? 'JPG' : 'PNG'}...</span>
            </div>
          )}

          {error && (
            <Alert variant="danger" title="Conversion Failed">
              {error}
            </Alert>
          )}
        </div>
      ) : (
        <div className="space-y-5 p-6 rounded-xl border border-surface-border bg-surface shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-surface-border">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-success" />
              <span className="text-sm font-bold text-body">
                Converted Successfully ({result.format})
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <span className="text-body-muted">
                Original: <strong className="text-body">{formatBytes(result.originalSize)}</strong>
              </span>
              <span>→</span>
              <span className="text-success font-bold">
                Converted: {formatBytes(result.convertedSize)}
              </span>
            </div>
          </div>

          {/* Image Preview */}
          <div className="max-h-96 overflow-hidden rounded-xl border border-surface-border bg-slate-900/5 flex items-center justify-center p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={result.dataUrl}
              alt="Converted preview"
              className="max-h-80 w-auto object-contain rounded-lg shadow-sm"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <Button variant="outline" size="sm" onClick={handleReset}>
              Convert Another Photo
            </Button>

            <Button variant="primary" size="md" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download {result.format} Image
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
