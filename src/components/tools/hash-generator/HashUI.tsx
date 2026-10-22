'use client';

import * as React from 'react';
import { computeHashes, HashResults } from '@/lib/tools/hash-generator/engine';
import { Textarea } from '@/components/ui/Textarea';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { CopyButton } from '@/components/ui/CopyButton';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent } from '@/components/ui/Card';
import { ShieldCheck, CheckCircle2, XCircle, Sparkles, Trash2 } from 'lucide-react';

export function HashUI() {
  const [input, setInput] = React.useState('');
  const [uppercase, setUppercase] = React.useState(false);
  const [compareHash, setCompareHash] = React.useState('');
  const [hashes, setHashes] = React.useState<HashResults>({
    md5: '',
    sha1: '',
    sha256: '',
    sha512: '',
  });
  const [computeTime, setComputeTime] = React.useState<number>(0);

  React.useEffect(() => {
    let isCancelled = false;
    computeHashes(input, uppercase).then((res) => {
      if (!isCancelled && res.success && res.data) {
        setHashes(res.data);
        setComputeTime(res.metrics?.processingTimeMs || 0);
      }
    });
    return () => {
      isCancelled = true;
    };
  }, [input, uppercase]);

  const handleSample = () => {
    setInput('OmniTools Secure Hash Test 2026');
  };

  const cleanCompare = compareHash.trim().toLowerCase();

  const algorithms = [
    { name: 'SHA-256', bits: '256 bits', value: hashes.sha256, recommended: true },
    { name: 'SHA-512', bits: '512 bits', value: hashes.sha512, recommended: true },
    { name: 'SHA-1', bits: '160 bits', value: hashes.sha1, legacy: true },
    { name: 'MD5', bits: '128 bits', value: hashes.md5, legacy: true },
  ];

  return (
    <div className="space-y-6">
      {/* Input & Controls */}
      <div className="space-y-4 p-5 rounded-xl border border-surface-border bg-surface shadow-sm">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold uppercase text-body tracking-wider">
            Input Plaintext String
          </label>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleSample}
              className="text-primary hover:text-primary-hover"
            >
              <Sparkles className="h-3.5 w-3.5 mr-1" />
              Sample
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setInput('');
                setCompareHash('');
              }}
              disabled={!input}
              className="text-body-muted hover:text-danger hover:border-danger/30"
            >
              <Trash2 className="h-3.5 w-3.5 mr-1" />
              Clear
            </Button>
          </div>
        </div>

        <Textarea
          mono
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type or paste any text string to generate cryptographic checksums..."
          className="min-h-[120px] font-mono text-sm"
        />

        {/* Options and Verify Bar */}
        <div className="pt-2 border-t border-surface-border flex flex-wrap items-center justify-between gap-4">
          <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-body">
            <input
              type="checkbox"
              checked={uppercase}
              onChange={(e) => setUppercase(e.target.checked)}
              className="rounded text-primary focus:ring-primary h-4 w-4"
            />
            <span>Uppercase Hexadecimal Output</span>
          </label>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Input
              placeholder="Paste checksum to verify match..."
              value={compareHash}
              onChange={(e) => setCompareHash(e.target.value)}
              className="h-8 text-xs font-mono w-full sm:w-64"
            />
          </div>
        </div>
      </div>

      {/* Hash Results Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-semibold text-body uppercase tracking-wider">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-primary" />
            Computed Cryptographic Hashes
          </span>
          {computeTime > 0 && (
            <span className="text-[11px] font-normal text-body-muted">
              Computed in {computeTime}ms via Web Crypto
            </span>
          )}
        </div>

        <div className="space-y-3">
          {algorithms.map((algo) => {
            const isMatch =
              cleanCompare.length > 0 &&
              algo.value.toLowerCase() === cleanCompare;
            const isMismatch =
              cleanCompare.length > 0 &&
              algo.value.length === cleanCompare.length &&
              algo.value.toLowerCase() !== cleanCompare;

            return (
              <Card key={algo.name} className="overflow-hidden">
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-body">{algo.name}</span>
                      <Badge variant="outline" size="sm">{algo.bits}</Badge>
                      {algo.recommended && (
                        <Badge variant="success" size="sm">Recommended</Badge>
                      )}
                      {algo.legacy && (
                        <Badge variant="warning" size="sm">Legacy</Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {isMatch && (
                        <span className="flex items-center gap-1 text-xs font-bold text-success">
                          <CheckCircle2 className="h-4 w-4" />
                          Checksum Matched!
                        </span>
                      )}
                      {isMismatch && (
                        <span className="flex items-center gap-1 text-xs text-danger">
                          <XCircle className="h-4 w-4" />
                          No Match
                        </span>
                      )}
                      <CopyButton text={algo.value} size="sm" variant="outline" />
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-surface-subtle border border-surface-border font-mono text-xs text-body break-all select-all">
                    {algo.value || (
                      <span className="text-body-muted font-sans italic">
                        Enter text above to compute hash...
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
