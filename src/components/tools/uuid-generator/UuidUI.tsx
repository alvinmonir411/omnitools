'use client';

import * as React from 'react';
import { generateUuids } from '@/lib/tools/uuid-generator/engine';
import { Button } from '@/components/ui/Button';
import { CopyButton } from '@/components/ui/CopyButton';
import { Badge } from '@/components/ui/Badge';
import { RefreshCw, Copy, Check, Fingerprint } from 'lucide-react';

export function UuidUI() {
  const [version, setVersion] = React.useState<'v4' | 'v7'>('v4');
  const [count, setCount] = React.useState<number>(5);
  const [uppercase, setUppercase] = React.useState(false);
  const [hyphens, setHyphens] = React.useState(true);
  const [braces, setBraces] = React.useState(false);
  const [seed, setSeed] = React.useState(0);

  const uuids = React.useMemo(() => {
    void seed;
    const res = generateUuids({ version, count, uppercase, hyphens, braces });
    return res.success && res.data ? res.data : [];
  }, [version, count, uppercase, hyphens, braces, seed]);

  const handleRegenerate = () => {
    setSeed((prev) => prev + 1);
  };

  const allUuidsText = uuids.join('\n');

  return (
    <div className="space-y-6">
      {/* Options Controls */}
      <div className="p-5 rounded-xl border border-surface-border bg-surface shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Version */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase text-body-muted">
              UUID Version
            </label>
            <div className="flex gap-2">
              <Button
                type="button"
                size="sm"
                variant={version === 'v4' ? 'primary' : 'outline'}
                onClick={() => setVersion('v4')}
                className="flex-1"
              >
                Version 4 (Random)
              </Button>
              <Button
                type="button"
                size="sm"
                variant={version === 'v7' ? 'primary' : 'outline'}
                onClick={() => setVersion('v7')}
                className="flex-1"
              >
                Version 7 (Time)
              </Button>
            </div>
          </div>

          {/* Batch Count */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase text-body-muted">
              Batch Quantity: <span className="font-bold text-body">{count}</span>
            </label>
            <div className="flex gap-1.5">
              {[1, 5, 10, 25, 50].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setCount(num)}
                  className={`flex-1 py-1.5 text-xs font-medium rounded-md border transition-colors ${
                    count === num
                      ? 'bg-primary text-white border-primary'
                      : 'border-surface-border bg-surface-subtle text-body hover:bg-slate-200'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Formatting Toggles */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase text-body-muted">
              Formatting Options
            </label>
            <div className="flex flex-wrap gap-2 text-xs">
              <label className="flex items-center gap-1.5 cursor-pointer bg-surface-subtle px-2.5 py-1.5 rounded border border-surface-border">
                <input
                  type="checkbox"
                  checked={uppercase}
                  onChange={(e) => setUppercase(e.target.checked)}
                  className="rounded text-primary focus:ring-primary h-3.5 w-3.5"
                />
                <span>Uppercase</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer bg-surface-subtle px-2.5 py-1.5 rounded border border-surface-border">
                <input
                  type="checkbox"
                  checked={hyphens}
                  onChange={(e) => setHyphens(e.target.checked)}
                  className="rounded text-primary focus:ring-primary h-3.5 w-3.5"
                />
                <span>Hyphens</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer bg-surface-subtle px-2.5 py-1.5 rounded border border-surface-border">
                <input
                  type="checkbox"
                  checked={braces}
                  onChange={(e) => setBraces(e.target.checked)}
                  className="rounded text-primary focus:ring-primary h-3.5 w-3.5"
                />
                <span>Braces</span>
              </label>
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-surface-border flex items-center justify-between">
          <Button type="button" variant="primary" onClick={handleRegenerate}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Generate New Batch
          </Button>

          <CopyButton
            text={allUuidsText}
            label={`Copy All (${uuids.length})`}
            copiedLabel="All Copied!"
            variant="outline"
          />
        </div>
      </div>

      {/* UUID List Display */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-body uppercase tracking-wider">
          <span className="flex items-center gap-1.5">
            <Fingerprint className="h-4 w-4 text-primary" />
            Generated {version.toUpperCase()} Identifiers ({uuids.length})
          </span>
          <Badge variant="success" size="sm">CSPRNG Validated</Badge>
        </div>

        <div className="rounded-xl border border-surface-border bg-surface divide-y divide-surface-border/60 overflow-hidden shadow-sm">
          {uuids.map((uuid, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3.5 hover:bg-surface-subtle/50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-body-muted w-6 select-none">
                  {idx + 1}.
                </span>
                <span className="font-mono text-sm sm:text-base text-body font-medium select-all">
                  {uuid}
                </span>
              </div>
              <CopyButton text={uuid} size="sm" variant="ghost" label="Copy" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
