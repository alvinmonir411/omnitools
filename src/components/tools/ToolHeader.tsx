import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { ShieldCheck, Sparkles } from 'lucide-react';
import { ToolDefinition } from '@/types/tool';

export function ToolHeader({ tool }: { tool: ToolDefinition }) {
  return (
    <div className="space-y-3 pb-6 border-b border-surface-border">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="primary" size="sm" className="uppercase tracking-wider">
          {tool.category}
        </Badge>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-success-subtle text-success text-[11px] font-semibold border border-success/20">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Client-Side &amp; Private</span>
        </div>
      </div>
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-body">
        {tool.name}
      </h1>
      <p className="text-base text-body-muted max-w-3xl leading-relaxed">
        {tool.shortDescription}
      </p>
    </div>
  );
}
