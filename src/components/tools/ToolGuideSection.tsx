import React from 'react';
import { ToolGuideStep, ToolFeature } from '@/types/tool';
import { Card, CardContent } from '@/components/ui/Card';
import { CheckCircle2 } from 'lucide-react';

export function ToolGuideSection({ steps }: { steps: ToolGuideStep[] }) {
  if (!steps || steps.length === 0) return null;

  return (
    <section aria-labelledby="guide-heading" className="space-y-4">
      <h2 id="guide-heading" className="text-xl sm:text-2xl font-bold tracking-tight text-body">
        How to Use
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {steps.map((step, idx) => (
          <Card key={idx} className="bg-surface relative overflow-hidden">
            <div className="absolute top-3 right-3 text-2xl font-black text-slate-200 select-none">
              0{idx + 1}
            </div>
            <CardContent className="pt-6 space-y-2">
              <h3 className="font-semibold text-body text-base">{step.title}</h3>
              <p className="text-xs sm:text-sm text-body-muted leading-relaxed">
                {step.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

export function ToolFeaturesSection({ features }: { features: ToolFeature[] }) {
  if (!features || features.length === 0) return null;

  return (
    <section aria-labelledby="features-heading" className="space-y-4">
      <h2 id="features-heading" className="text-xl sm:text-2xl font-bold tracking-tight text-body">
        Key Capabilities &amp; Features
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3 p-4 rounded-xl border border-surface-border bg-surface"
          >
            <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-semibold text-sm text-body">{feature.title}</h4>
              <p className="text-xs text-body-muted leading-relaxed">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
