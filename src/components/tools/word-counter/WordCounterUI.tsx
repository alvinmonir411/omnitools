'use client';

import * as React from 'react';
import { analyzeText } from '@/lib/tools/word-counter/engine';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { CopyButton } from '@/components/ui/CopyButton';
import { Card, CardContent } from '@/components/ui/Card';
import { Sparkles, Trash2, FileText, Clock, BarChart3 } from 'lucide-react';

const SAMPLE_TEXT = `Modern web development demands speed, reliability, and utmost user privacy. OmniTools was engineered from the ground up to provide developers, writers, and digital professionals with instantaneous utility without ever sending sensitive data across the wire. 

Every transformation — whether formatting complex JSON, calculating cryptographic hashes, or converting text cases — executes locally within the browser sandbox. This guarantees zero server retention, zero tracking of your proprietary code, and immediate sub-millisecond execution.`;

export function WordCounterUI() {
  const [text, setText] = React.useState('');

  const analysis = React.useMemo(() => {
    return analyzeText(text).data!;
  }, [text]);

  const handleSample = () => setText(SAMPLE_TEXT);
  const handleClear = () => setText('');

  const stats = [
    { label: 'Words', value: analysis.words },
    { label: 'Characters', value: analysis.charactersWithSpaces },
    { label: 'Chars (No Spaces)', value: analysis.charactersWithoutSpaces },
    { label: 'Sentences', value: analysis.sentences },
    { label: 'Paragraphs', value: analysis.paragraphs },
    { label: 'Reading Time', value: `${analysis.readingTimeMinutes} min` },
  ];

  return (
    <div className="space-y-6">
      {/* Top Metric Cards Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {stats.map((s, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-xl border border-surface-border bg-surface text-center shadow-sm"
          >
            <div className="text-xl sm:text-2xl font-bold text-primary">{s.value}</div>
            <div className="text-[11px] font-semibold text-body-muted uppercase tracking-wider mt-1">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Editor & Actions */}
      <div className="space-y-3 p-5 rounded-xl border border-surface-border bg-surface shadow-sm">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold uppercase text-body tracking-wider flex items-center gap-1.5">
            <FileText className="h-4 w-4 text-primary" />
            Type or Paste Text
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
            <CopyButton text={text} size="sm" variant="outline" />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleClear}
              disabled={!text}
              className="text-body-muted hover:text-danger hover:border-danger/30"
            >
              <Trash2 className="h-3.5 w-3.5 mr-1" />
              Clear
            </Button>
          </div>
        </div>

        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste your content here to inspect real-time metrics..."
          className="min-h-[220px] text-sm leading-relaxed"
        />
      </div>

      {/* Platform Benchmarks & Keyword Density */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Social Media Limits */}
        <Card>
          <CardContent className="p-5 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-body flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-primary" />
              Platform Character Benchmarks
            </h3>

            <div className="space-y-3">
              {/* Twitter / X */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-body">X (formerly Twitter)</span>
                  <span
                    className={
                      analysis.platformLimits.twitter.current > 280
                        ? 'text-danger font-bold'
                        : 'text-body-muted'
                    }
                  >
                    {analysis.platformLimits.twitter.current} / 280
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-surface-subtle overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      analysis.platformLimits.twitter.current > 280
                        ? 'bg-danger'
                        : 'bg-primary'
                    }`}
                    style={{ width: `${Math.min(analysis.platformLimits.twitter.percentage, 100)}%` }}
                  />
                </div>
              </div>

              {/* SEO Title */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-body">SEO Meta Title Target</span>
                  <span
                    className={
                      analysis.platformLimits.metaTitle.current > 60
                        ? 'text-warning font-bold'
                        : 'text-body-muted'
                    }
                  >
                    {analysis.platformLimits.metaTitle.current} / 60
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-surface-subtle overflow-hidden">
                  <div
                    className="h-full bg-success transition-all"
                    style={{ width: `${Math.min(analysis.platformLimits.metaTitle.percentage, 100)}%` }}
                  />
                </div>
              </div>

              {/* LinkedIn Post */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-body">LinkedIn Post</span>
                  <span className="text-body-muted">
                    {analysis.platformLimits.linkedin.current} / 3000
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-surface-subtle overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{ width: `${Math.min(analysis.platformLimits.linkedin.percentage, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Keywords */}
        <Card>
          <CardContent className="p-5 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-body flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              Keyword Density &amp; Frequency
            </h3>

            {analysis.keywordDensity.length === 0 ? (
              <p className="text-xs text-body-muted italic py-6 text-center">
                Type more than 5 words to see top keyword density rankings.
              </p>
            ) : (
              <div className="divide-y divide-surface-border">
                {analysis.keywordDensity.map((k, idx) => (
                  <div key={idx} className="flex items-center justify-between py-2 text-xs">
                    <span className="font-semibold text-body capitalize">{k.word}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-body-muted">{k.count} times</span>
                      <span className="font-mono text-primary font-bold">{k.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
