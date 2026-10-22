'use client';

import * as React from 'react';
import { generateViralHooks, CreatorNiche, ViralHookItem } from '@/lib/tools/tiktok-hook-generator/engine';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { CopyButton } from '@/components/ui/CopyButton';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent } from '@/components/ui/Card';
import { Video, Sparkles, Eye, Volume2, Film, Flame } from 'lucide-react';

const NICHES: { id: CreatorNiche; label: string; icon: string }[] = [
  { id: 'tech', label: 'Tech & AI', icon: '💻' },
  { id: 'finance', label: 'Money & Investing', icon: '💰' },
  { id: 'business', label: 'E-Com & Side Hustles', icon: '📈' },
  { id: 'fitness', label: 'Fitness & Health', icon: '💪' },
  { id: 'beauty', label: 'Beauty & Skincare', icon: '✨' },
  { id: 'lifestyle', label: 'Lifestyle & Habits', icon: '☕' },
];

export function TikTokHookUI() {
  const [niche, setNiche] = React.useState<CreatorNiche>('tech');
  const [topic, setTopic] = React.useState('');

  const hooks = React.useMemo(() => {
    const res = generateViralHooks(niche, topic);
    return res.success && res.data ? res.data : [];
  }, [niche, topic]);

  const allHooksText = hooks
    .map((h, i) => `${i + 1}. [${h.category}] "${h.hookText}"\nVisual: ${h.visualCue}\nAudio: ${h.audioTip}\n`)
    .join('\n');

  return (
    <div className="space-y-6">
      {/* Configuration Bar */}
      <div className="p-5 rounded-xl border border-surface-border bg-surface shadow-sm space-y-4">
        <div>
          <span className="text-xs font-semibold uppercase text-body-muted block mb-2">
            Select Your Creator Niche
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {NICHES.map((n) => (
              <button
                key={n.id}
                type="button"
                onClick={() => setNiche(n.id)}
                className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all ${
                  niche === n.id
                    ? 'bg-primary text-white border-primary shadow-sm'
                    : 'bg-surface-subtle text-body border-surface-border hover:bg-slate-200'
                }`}
              >
                <span>{n.icon}</span>
                <span>{n.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="pt-2 border-t border-surface-border flex flex-wrap items-center justify-between gap-3">
          <div className="flex-1 min-w-[240px]">
            <Input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Optional: custom product or topic (e.g. Notion, Etsy shop, Creatine)..."
              className="text-xs sm:text-sm"
            />
          </div>

          <div className="flex items-center gap-2">
            <CopyButton text={allHooksText} label="Copy All Scripts" variant="outline" size="sm" />
          </div>
        </div>
      </div>

      {/* Generated Hook Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-body">
          <span className="flex items-center gap-1.5 text-primary">
            <Flame className="h-4 w-4 text-orange-500 fill-orange-500" />
            High-Retention Hook Scripts ({hooks.length})
          </span>
          <span className="text-body-muted">Tested for 3-Second Retention</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {hooks.map((item) => (
            <Card key={item.id} className="hover:border-primary/40 transition-colors">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="primary" size="sm">
                    {item.category} HOOK
                  </Badge>
                  <CopyButton text={item.hookText} size="sm" variant="ghost" label="Copy Hook" />
                </div>

                {/* Main Hook Sentence */}
                <p className="text-sm sm:text-base font-bold text-body leading-snug">
                  &ldquo;{item.hookText}&rdquo;
                </p>

                {/* Director's Cues */}
                <div className="pt-2 border-t border-surface-border/60 space-y-1.5 text-xs">
                  <div className="flex items-start gap-2 text-body-muted">
                    <Eye className="h-3.5 w-3.5 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong>Visual Action:</strong> {item.visualCue}</span>
                  </div>
                  <div className="flex items-start gap-2 text-body-muted">
                    <Volume2 className="h-3.5 w-3.5 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong>Audio Sound:</strong> {item.audioTip}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
