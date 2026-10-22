'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, ArrowRight, CornerDownLeft } from 'lucide-react';
import { TOOLS } from '@/config/tools';
import { ToolDefinition } from '@/types/tool';
import { Modal } from '@/components/ui/Modal';
import { Kbd } from '@/components/ui/Kbd';

export function QuickSearchModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [query, setQuery] = React.useState('');
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const filteredTools = React.useMemo(() => {
    if (!query.trim()) return TOOLS.slice(0, 6);
    const q = query.toLowerCase().trim();
    return TOOLS.filter(
      (tool) =>
        tool.name.toLowerCase().includes(q) ||
        tool.shortDescription.toLowerCase().includes(q) ||
        tool.category.toLowerCase().includes(q) ||
        tool.keywords.some((k) => k.toLowerCase().includes(q)),
    );
  }, [query]);

  React.useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  React.useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  const handleSelectTool = (tool: ToolDefinition) => {
    onClose();
    router.push(`/tools/${tool.category}/${tool.slug}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(filteredTools.length, 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev === 0 ? filteredTools.length - 1 : prev - 1,
      );
    } else if (e.key === 'Enter' && filteredTools[selectedIndex]) {
      e.preventDefault();
      handleSelectTool(filteredTools[selectedIndex]);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="p-0 max-w-xl overflow-hidden">
      <div className="flex items-center border-b border-surface-border px-4 py-3">
        <Search className="h-5 w-5 text-body-muted mr-3 flex-shrink-0" />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search 8+ tools, categories, or keywords..."
          className="w-full bg-transparent text-sm text-body placeholder:text-body-muted focus:outline-none"
        />
        <Kbd className="hidden sm:inline-flex">ESC</Kbd>
      </div>

      <div className="max-h-80 overflow-y-auto p-2">
        {filteredTools.length === 0 ? (
          <div className="py-8 text-center text-sm text-body-muted">
            No tools found matching &quot;{query}&quot;
          </div>
        ) : (
          <ul className="space-y-1">
            {filteredTools.map((tool, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <li key={tool.id}>
                  <button
                    type="button"
                    onClick={() => handleSelectTool(tool)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                      isSelected
                        ? 'bg-primary text-white'
                        : 'text-body hover:bg-surface-subtle'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{tool.name}</span>
                        <span
                          className={`text-[10px] uppercase px-1.5 py-0.5 rounded ${
                            isSelected
                              ? 'bg-white/20 text-white'
                              : 'bg-surface-subtle text-body-muted'
                          }`}
                        >
                          {tool.category}
                        </span>
                      </div>
                      <p
                        className={`text-xs line-clamp-1 mt-0.5 ${
                          isSelected ? 'text-white/80' : 'text-body-muted'
                        }`}
                      >
                        {tool.shortDescription}
                      </p>
                    </div>

                    <div className="flex items-center pl-3">
                      {isSelected ? (
                        <CornerDownLeft className="h-4 w-4 text-white" />
                      ) : (
                        <ArrowRight className="h-4 w-4 text-body-muted" />
                      )}
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="flex items-center justify-between border-t border-surface-border bg-surface-subtle px-4 py-2 text-[11px] text-body-muted">
        <div className="flex items-center gap-2">
          <span>Navigate with</span>
          <Kbd>↑</Kbd>
          <Kbd>↓</Kbd>
          <span>Select with</span>
          <Kbd>Enter</Kbd>
        </div>
        <span>100% Client-Side Search</span>
      </div>
    </Modal>
  );
}
