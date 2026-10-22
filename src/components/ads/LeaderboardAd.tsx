import React from 'react';
import { AdSlot } from './AdSlot';
import { ADS_CONFIG } from '@/config/ads';

export function LeaderboardAd({ className }: { className?: string }) {
  return <AdSlot slot={ADS_CONFIG.slots.leaderboardTop} className={className} />;
}

export function ContentBottomAd({ className }: { className?: string }) {
  return <AdSlot slot={ADS_CONFIG.slots.contentBottom} className={className} />;
}
