'use client';

import { useCallback } from 'react';
import { ADS_CONFIG } from '@/config/ads';

const STORAGE_KEY = 'omnitools_direct_link_last_trigger';

export function useDirectLink() {
  const triggerMonetizedAction = useCallback(() => {
    if (!ADS_CONFIG.directLink.enabled || !ADS_CONFIG.directLink.url) {
      return false;
    }

    try {
      const lastTrigger = localStorage.getItem(STORAGE_KEY);
      const now = Date.now();
      const cooldownMs = ADS_CONFIG.directLink.cooldownHours * 60 * 60 * 1000;

      if (!lastTrigger || now - parseInt(lastTrigger, 10) > cooldownMs) {
        localStorage.setItem(STORAGE_KEY, now.toString());
        // Open Adsterra smart direct link in background tab
        window.open(ADS_CONFIG.directLink.url, '_blank', 'noopener,noreferrer');
        return true;
      }
    } catch {
      // Ignore if localStorage blocked
    }
    return false;
  }, []);

  return { triggerMonetizedAction };
}
