'use client';

import * as React from 'react';
import { formatJson, JsonFormatterOptions } from '@/lib/tools/json-formatter/engine';
import { Button } from '@/components/ui/Button';
import { CopyButton } from '@/components/ui/CopyButton';
import { Alert } from '@/components/ui/Alert';
import { Badge } from '@/components/ui/Badge';
import { Textarea } from '@/components/ui/Textarea';
import { Trash2, FileCode, ArrowUpDown, Sparkles } from 'lucide-react';

const SAMPLE_JSON = `{
  "platform": "OmniTools",
  "privacy": {
    "clientSide": true,
    "serversLogging": false,
    "encryption": "WebCrypto"
  },
  "toolsCount": 8,
  "supportedFormats": ["json", "base64", "qr", "hashes"]
}`;

export function JsonFormatterUI() {
  const [input, setInput] = React.useState('');
  const [indent, setIndent] = React.useState<2 | 4 | 'tab' | 0>(2);
  const [sortKeys, setSortKeys] = React.useState(false);

  const result = React.useMemo(() => {
    return formatJson(input, { indent, sortKeys });
  }, [input, indent, sortKeys]);

  const handleLoadSample = () => {
    setInput(SAMPLE_JSON);
  };

  const handleClear = () => {
    setInput('');
  };

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl border border-surface-border bg-surface shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase text-body-muted mr-1">
            Indentation:
          </span>
          <div className="inline-flex rounded-lg border border-surface-border p-0.5 bg-surface-subtle">
            <button
              type="button"
              onClick={() => setIndent(2)}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                indent === 2 ? 'bg-surface text-primary shadow-sm' : 'text-body-muted hover:text-body'
              }`}
            >
              2 Spaces
            </button>
            <button
              type="button"
              onClick={() => setIndent(4)}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                indent === 4 ? 'bg-surface text-primary shadow-sm' : 'text-body-muted hover:text-body'
              }`}
            >
              4 Spaces
            </button>
            <button
              type="button"
              onClick={() => setIndent('tab')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                indent === 'tab' ? 'bg-surface text-primary shadow-sm' : 'text-body-muted hover:text-body'
              }`}
            >
              Tab
            </button>
            <button
              type="button"
              onClick={() => setIndent(0)}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                indent === 0 ? 'bg-surface text-primary shadow-sm' : 'text-body-muted hover:text-body'
              }`}
            >
              Minify
            </button>
          </div>

          <button
            type="button"
            onClick={() => setSortKeys(!sortKeys)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
              sortKeys
                ? 'border-primary bg-primary-subtle text-primary'
                : 'border-surface-border bg-surface text-body hover:bg-surface-subtle'
            }`}
          >
            <ArrowUpDown className="h-3.5 w-3.5" />
            <span>Sort Keys</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleLoadSample}
            className="text-primary hover:text-primary-hover"
          >
            <Sparkles className="h-3.5 w-3.5 mr-1.5" />
            Sample Data
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleClear}
            disabled={!input}
            className="text-body-muted hover:text-danger hover:border-danger/30"
          >
            <Trash2 className="h-3.5 w-3.5 mr-1" />
            Clear
          </Button>
        </div>
      </div>

      {/* Editor Split Pane */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Column */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-body uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <FileCode className="h-4 w-4 text-primary" />
              Raw Input JSON
            </span>
            {input && (
              <span className="text-[11px] font-normal text-body-muted">
                {input.length} chars · {new Blob([input]).size} bytes
              </span>
            )}
          </div>

          <Textarea
            mono
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your unformatted or minified JSON here..."
            className="min-h-[380px] font-mono text-xs sm:text-sm bg-surface shadow-inner"
          />
        </div>

        {/* Output Column */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-body uppercase tracking-wider">
            <span className="flex items-center gap-2">
              <span>Formatted Output</span>
              {input && result.success && (
                <Badge variant="success" size="sm">Valid JSON</Badge>
              )}
            </span>
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
              <Alert variant="danger" title="JSON Syntax Error">
                <p className="font-mono text-xs mb-1">{result.error.message}</p>
                {result.error.line && (
                  <p className="text-xs font-semibold">
                    Error localized near Line {result.error.line}, Column {result.error.column}
                  </p>
                )}
              </Alert>
              <div className="min-h-[290px] rounded-xl border border-dashed border-danger/30 bg-danger-subtle/10 flex items-center justify-center p-6 text-center text-xs text-danger font-medium">
                Fix the syntax issue in the left input to render formatted JSON.
              </div>
            </div>
          ) : (
            <Textarea
              mono
              readOnly
              value={result.data || ''}
              placeholder="Formatted, highlighted JSON will appear here instantly..."
              className="min-h-[380px] font-mono text-xs sm:text-sm bg-surface-subtle/40 border-surface-border text-body shadow-inner cursor-text"
            />
          )}
        </div>
      </div>
    </div>
  );
}
