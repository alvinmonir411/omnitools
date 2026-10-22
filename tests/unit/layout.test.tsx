import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AdSlot } from '@/components/ads/AdSlot';
import { ADS_CONFIG } from '@/config/ads';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({ push: vi.fn() }),
}));

describe('Global Layout & Shell Suite', () => {
  it('renders Header brand and search triggers', () => {
    render(<Header />);
    expect(screen.getByText('OmniTools')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /open tool search/i })).toBeInTheDocument();
  });

  it('renders Footer with category links and privacy pledge', () => {
    render(<Footer />);
    expect(screen.getByText(/client-side execution guarantee/i)).toBeInTheDocument();
    expect(screen.getByText('Developer Tools')).toBeInTheDocument();
    expect(screen.getByText('Text & Content')).toBeInTheDocument();
  });

  it('renders AdSlot with reserved min-height to eliminate CLS', () => {
    render(<AdSlot slot={ADS_CONFIG.slots.leaderboardTop} />);
    const adContainer = screen.getByLabelText('Advertisement');
    expect(adContainer).toBeInTheDocument();
    expect(adContainer.style.minHeight).toBe('114px'); // 90px + 24px buffer
  });
});
