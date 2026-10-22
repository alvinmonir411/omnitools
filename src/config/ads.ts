export interface AdSlotConfig {
  slotId: string;
  enabled: boolean;
  format: 'banner-728x90' | 'banner-300x250' | 'banner-320x50';
  minHeight: number;
  minWidth: number;
  label: string;
  adsterraKey?: string;
}

export const ADS_CONFIG = {
  // Driven by NEXT_PUBLIC_ENABLE_ADS or default to false in test/dev
  enabled: process.env.NEXT_PUBLIC_ENABLE_ADS === 'true',
  debugWireframe: process.env.NODE_ENV !== 'production' || process.env.NEXT_PUBLIC_ENABLE_ADS !== 'true',
  slots: {
    leaderboardTop: {
      slotId: 'ad-leaderboard-top',
      enabled: true,
      format: 'banner-728x90',
      minHeight: 90,
      minWidth: 728,
      label: 'ADVERTISEMENT',
    },
    sidebarSticky: {
      slotId: 'ad-sidebar-sticky',
      enabled: true,
      format: 'banner-300x250',
      minHeight: 250,
      minWidth: 300,
      label: 'SPONSORED',
    },
    contentBottom: {
      slotId: 'ad-content-bottom',
      enabled: true,
      format: 'banner-728x90',
      minHeight: 90,
      minWidth: 728,
      label: 'ADVERTISEMENT',
    },
  } as const,
};
