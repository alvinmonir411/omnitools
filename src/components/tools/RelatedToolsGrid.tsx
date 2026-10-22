import React from 'react';
import Link from 'next/link';
import { ToolDefinition } from '@/types/tool';
import { TOOLS } from '@/config/tools';
import { ArrowRight } from 'lucide-react';

export function RelatedToolsGrid({ currentTool }: { currentTool: ToolDefinition }) {
  const related = TOOLS.filter(
    (t) => t.category === currentTool.category && t.id !== currentTool.id,
  ).slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section aria-labelledby="related-heading" className="space-y-4 pt-6 border-t border-surface-border">
      <h2 id="related-heading" className="text-xl sm:text-2xl font-bold tracking-tight text-body">
        More {currentTool.category} Utilities
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {related.map((tool) => (
          <Link
            key={tool.id}
            href={`/tools/${tool.category}/${tool.slug}`}
            className="group block p-4 rounded-xl border border-surface-border bg-surface hover:border-primary/40 hover:shadow-card transition-all"
          >
            <h3 className="font-semibold text-sm text-body group-hover:text-primary transition-colors flex items-center justify-between">
              <span>{tool.name}</span>
              <ArrowRight className="h-3.5 w-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
            </h3>
            <p className="text-xs text-body-muted line-clamp-2 mt-1">
              {tool.shortDescription}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
