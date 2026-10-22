'use client';

import * as React from 'react';
import { convertCase, CaseType } from '@/lib/tools/case-converter/engine';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { CopyButton } from '@/components/ui/CopyButton';
import { Card, CardContent } from '@/components/ui/Card';
import { Sparkles, Trash2, Type } from 'lucide-react';

const SAMPLE_TEXT = 'OmniTools online developer utilities for modern web engineering';

const CASE_OPTIONS: { id: CaseType; name: string; example: string }[] = [
  { id: 'upper', name: 'UPPERCASE', example: 'ALL CAPS STRING' },
  { id: 'lower', name: 'lowercase', example: 'all small letters' },
  { id: 'title', name: 'Title Case', example: 'Smart Headline Capitalization' },
  { id: 'sentence', name: 'Sentence case', example: 'Capitalize first letter.' },
  { id: 'camel', name: 'camelCase', example: 'standardVariableIdentifier' },
  { id: 'pascal', name: 'PascalCase', example: 'StandardClassIdentifier' },
  { id: 'snake', name: 'snake_case', example: 'database_column_name' },
  { id: 'kebab', name: 'kebab-case', example: 'url-friendly-slug' },
  { id: 'constant', name: 'CONSTANT_CASE', example: 'GLOBAL_CONFIG_KEY' },
];

export function CaseConverterUI() {
  const [input, setInput] = React.useState('');
  const [selectedCase, setSelectedCase] = React.useState<CaseType>('title');

  const mainResult = React.useMemo(() => {
    return convertCase(input, selectedCase).data || '';
  }, [input, selectedCase]);

  // Compute all case variations for the quick-copy matrix
  const matrix = React.useMemo(() => {
    if (!input) return [];
    return CASE_OPTIONS.map((opt) => ({
      ...opt,
      result: convertCase(input, opt.id).data || '',
    }));
  }, [input]);

  const handleSample = () => setInput(SAMPLE_TEXT);
  const handleClear = () => setInput('');

  return (
    <div className="space-y-6">
      {/* Input and Quick Format Controls */}
      <div className="p-5 rounded-xl border border-surface-border bg-surface shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold uppercase text-body tracking-wider flex items-center gap-1.5">
            <Type className="h-4 w-4 text-primary" />
            Enter Text to Convert
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
              onClick={handleClear}
              disabled={!input}
              className="text-body-muted hover:text-danger hover:border-danger/30"
            >
              <Trash2 className="h-3.5 w-3.5 mr-1" />
              Clear
            </Button>
          </div>
        </div>

        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type or paste your text, identifiers, or article headlines..."
          className="min-h-[120px] text-sm"
        />

        {/* Quick Format Selector Pills */}
        <div className="space-y-1.5">
          <span className="text-xs font-semibold uppercase text-body-muted">
            Quick Transform:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {CASE_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setSelectedCase(opt.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                  selectedCase === opt.id
                    ? 'bg-primary text-white border-primary shadow-sm font-semibold'
                    : 'bg-surface-subtle text-body border-surface-border hover:bg-slate-200'
                }`}
              >
                {opt.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Formatted Result Card */}
      <div className="p-5 rounded-xl border border-surface-border bg-surface shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase text-body tracking-wider">
            Active Converted Result ({selectedCase})
          </span>
          {mainResult && <CopyButton text={mainResult} size="sm" variant="primary" />}
        </div>

        <Textarea
          readOnly
          value={mainResult}
          placeholder="Formatted text will appear here..."
          className="min-h-[100px] bg-surface-subtle/50 text-body cursor-text"
        />
      </div>

      {/* Live All-Cases Comparison Matrix */}
      {matrix.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-body-muted">
            All Case Variations Matrix (Click to Copy)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {matrix.map((item) => (
              <Card key={item.id} className="p-3.5 space-y-2 hover:border-primary/40 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-primary">{item.name}</span>
                  <CopyButton text={item.result} size="sm" variant="ghost" label="" />
                </div>
                <p className="font-mono text-xs text-body line-clamp-2 select-all bg-surface-subtle p-2 rounded border border-surface-border">
                  {item.result}
                </p>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
