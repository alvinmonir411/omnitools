import React from 'react';
import { AdSlot } from './AdSlot';
import { ADS_CONFIG } from '@/config/ads';

export function SidebarAd({ className }: { className?: string }) {
  return (
    <div className="hidden lg:block sticky top-24">
      <AdSlot slot={ADS_CONFIG.slots.sidebarSticky} className={className} />
    </div>
  );
}
