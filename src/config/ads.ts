export interface AdSlotConfig {
  slotId: string;
  enabled: boolean;
  format: 'banner-728x90' | 'banner-300x250' | 'banner-320x50' | 'native-banner' | 'social-bar';
  minHeight: number;
  minWidth?: number;
  label: string;
}

export const ADS_CONFIG = {
  enabled: process.env.NEXT_PUBLIC_ENABLE_ADS === 'true',
  debugWireframe: process.env.NODE_ENV !== 'production' || process.env.NEXT_PUBLIC_ENABLE_ADS !== 'true',

  // High-CPM Adsterra Social Bar (In-Page Push)
  socialBar: {
    enabled: true,
    scriptUrl: process.env.NEXT_PUBLIC_ADSTERRA_SOCIAL_BAR_URL || '',
    dismissible: true,
  },

  // High-CTR Native Recommendation Banner
  nativeBanner: {
    enabled: true,
    slotId: 'adsterra-native-banner',
    minHeight: 140,
    label: 'SPONSORED RECOMMENDATION',
  },

  // Smart Monetization Direct Link Gateway (with 24-Hour Cooldown)
  directLink: {
    enabled: true,
    url: process.env.NEXT_PUBLIC_ADSTERRA_DIRECT_LINK || '',
    cooldownHours: 24, // Trigger maximum once every 24 hours per user
  },

  // Standard Safe Display Slots
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
