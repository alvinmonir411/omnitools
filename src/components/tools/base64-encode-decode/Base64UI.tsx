'use client';

import * as React from 'react';
import { encodeBase64, decodeBase64 } from '@/lib/tools/base64-encode-decode/engine';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { Button } from '@/components/ui/Button';
import { CopyButton } from '@/components/ui/CopyButton';
import { Alert } from '@/components/ui/Alert';
import { Textarea } from '@/components/ui/Textarea';
import { Dropzone } from '@/components/ui/Dropzone';
import { Trash2, Sparkles, ShieldCheck, Binary, Link2 } from 'lucide-react';

export function Base64UI() {
  const [mode, setMode] = React.useState<'encode' | 'decode'>('encode');
  const [input, setInput] = React.useState('');
  const [urlSafe, setUrlSafe] = React.useState(false);
  const [fileDataUrl, setFileDataUrl] = React.useState<string | null>(null);

  const result = React.useMemo(() => {
    if (mode === 'encode') {
      return encodeBase64(input, urlSafe);
    } else {
      return decodeBase64(input, urlSafe);
    }
  }, [input, mode, urlSafe]);

  const handleSample = () => {
    if (mode === 'encode') {
      setInput('OmniTools: High-performance, 100% private client utilities 🚀');
    } else {
      setInput('T21uaVRvb2xzOiBIaWdoLXBlcmZvcm1hbmNlLCAxMDAlIHByaXZhdGUgY2xpZW50IHV0aWxpdGllcyDwn5qA');
    }
  };

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setFileDataUrl(dataUrl);
      if (mode === 'encode') {
        // Strip data prefix if user wants raw base64, or use whole string
        const base64Index = dataUrl.indexOf(';base64,');
        if (base64Index !== -1) {
          setInput(dataUrl.substring(base64Index + 8));
        } else {
          setInput(dataUrl);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      {/* Mode & Options Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl border border-surface-border bg-surface shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <Tabs value={mode} onValueChange={(val) => setMode(val as 'encode' | 'decode')}>
            <TabsList>
              <TabsTrigger value="encode">Encode to Base64</TabsTrigger>
              <TabsTrigger value="decode">Decode from Base64</TabsTrigger>
            </TabsList>
          </Tabs>

          <button
            type="button"
            onClick={() => setUrlSafe(!urlSafe)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
              urlSafe
                ? 'border-primary bg-primary-subtle text-primary font-semibold'
                : 'border-surface-border bg-surface text-body hover:bg-surface-subtle'
            }`}
          >
            <Link2 className="h-3.5 w-3.5" />
            <span>URL-Safe Mode (- and _)</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleSample}
            className="text-primary hover:text-primary-hover"
          >
            <Sparkles className="h-3.5 w-3.5 mr-1.5" />
            Sample Data
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              setInput('');
              setFileDataUrl(null);
            }}
            disabled={!input}
            className="text-body-muted hover:text-danger hover:border-danger/30"
          >
            <Trash2 className="h-3.5 w-3.5 mr-1" />
            Clear
          </Button>
        </div>
      </div>

      {/* Editor Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Pane */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-body uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <Binary className="h-4 w-4 text-primary" />
              {mode === 'encode' ? 'Plaintext / File Input' : 'Base64 Encoded Input'}
            </span>
            {input && (
              <span className="text-[11px] font-normal text-body-muted">
                {input.length} characters
              </span>
            )}
          </div>

          <Textarea
            mono
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              mode === 'encode'
                ? 'Enter or paste plaintext to encode...'
                : 'Paste Base64 string to decode...'
            }
            className="min-h-[260px] font-mono text-xs sm:text-sm bg-surface"
          />

          {mode === 'encode' && (
            <div className="pt-2">
              <Dropzone
                onFileSelect={handleFile}
                maxSizeBytes={5 * 1024 * 1024}
                label="Or drop a small file to encode as Base64"
                description="Images, text, documents (max 5MB, processed client-side)"
              />
            </div>
          )}
        </div>

        {/* Output Pane */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-body uppercase tracking-wider">
            <span>{mode === 'encode' ? 'Base64 Result' : 'Decoded Plaintext'}</span>
            {result.data && (
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-normal text-body-muted hidden sm:inline">
                  {result.metrics?.processingTimeMs}ms
                </span>
                <CopyButton text={result.data} size="sm" />
              </div>
            )}
          </div>

          {!result.success && result.error ? (
            <div className="space-y-3">
              <Alert variant="danger" title="Base64 Decoding Error">
                {result.error.message}
              </Alert>
              <div className="min-h-[220px] rounded-xl border border-dashed border-danger/30 bg-danger-subtle/10 flex items-center justify-center p-6 text-center text-xs text-danger font-medium">
                Please verify that the input string is a valid Base64 encoded payload.
              </div>
            </div>
          ) : (
            <Textarea
              mono
              readOnly
              value={result.data || ''}
              placeholder="Converted result will appear here instantly..."
              className="min-h-[260px] font-mono text-xs sm:text-sm bg-surface-subtle/40 border-surface-border text-body shadow-inner cursor-text"
            />
          )}

          {fileDataUrl && mode === 'encode' && fileDataUrl.startsWith('data:image/') && (
            <div className="p-4 rounded-xl border border-surface-border bg-surface space-y-2">
              <span className="text-xs font-semibold uppercase text-body-muted">
                Image Preview from Base64
              </span>
              <div className="max-h-48 overflow-hidden rounded border border-surface-border bg-surface-subtle flex items-center justify-center p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={fileDataUrl} alt="Base64 decoded preview" className="max-h-44 object-contain" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
