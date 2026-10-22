'use client';

import * as React from 'react';
import { ADS_CONFIG, AdSlotConfig } from '@/config/ads';
import { cn } from '@/lib/utils/cn';

export interface AdSlotProps {
  slot: AdSlotConfig;
  className?: string;
}

export function AdSlot({ slot, className }: AdSlotProps) {
  const [adLoaded, setAdLoaded] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // If ads are completely disabled globally, don't render anything or render wireframe in dev
  if (!slot.enabled) return null;

  return (
    <aside
      aria-label="Advertisement"
      className={cn(
        'mx-auto my-6 flex flex-col items-center justify-center overflow-hidden rounded-lg border border-dashed border-surface-border bg-surface-subtle/50 p-2 text-center transition-all',
        className,
      )}
      style={{
        minHeight: `${slot.minHeight + 24}px`, // 24px for label and padding
        minWidth: `${Math.min(slot.minWidth, 300)}px`,
      }}
    >
      <div className="w-full flex items-center justify-between pb-1 px-1 text-[10px] uppercase font-bold tracking-widest text-body-muted/60">
        <span>{slot.label}</span>
        <span className="text-[9px] lowercase font-normal opacity-75">ethical placement</span>
      </div>

      <div
        ref={containerRef}
        className="flex items-center justify-center w-full overflow-hidden"
        style={{
          height: `${slot.minHeight}px`,
          maxWidth: `${slot.minWidth}px`,
        }}
      >
        {ADS_CONFIG.debugWireframe ? (
          <div className="flex flex-col items-center justify-center w-full h-full border border-surface-border rounded bg-surface/80 p-2 text-body-muted">
            <span className="text-xs font-semibold text-body">
              Adsterra Slot: {slot.format}
            </span>
            <span className="text-[11px] text-body-muted">
              ({slot.minWidth}x{slot.minHeight} Reserved Box - 0 CLS)
            </span>
          </div>
        ) : (
          <div
            id={slot.slotId}
            className="w-full h-full flex items-center justify-center"
          >
            {/* Adsterra real ad iframe or script insertion point */}
          </div>
        )}
      </div>
    </aside>
  );
}
