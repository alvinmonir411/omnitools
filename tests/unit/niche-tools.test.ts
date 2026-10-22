import { describe, it, expect } from 'vitest';
import { calculateEtsyFees } from '@/lib/tools/etsy-fee-calculator/engine';
import { calculate1099Tax } from '@/lib/tools/us-1099-tax-calculator/engine';
import { generateViralHooks } from '@/lib/tools/tiktok-hook-generator/engine';

describe('Niche High-Yield Growth Tools Suite', () => {
  describe('Etsy Fee & Profit Calculator', () => {
    it('calculates correct fees for US seller ($35 item + $5 shipping)', () => {
      const res = calculateEtsyFees({
        salePrice: 35.0,
        shippingCharged: 5.0,
        itemCost: 10.0,
        shippingCost: 4.5,
        otherCosts: 1.0,
        offsiteAdsPercent: 0,
        country: 'US',
      });

      expect(res.success).toBe(true);
      const data = res.data!;
      expect(data.totalRevenue).toBe(40.0);
      expect(data.listingFee).toBe(0.20);
      // 6.5% of $40 = 2.60
      expect(data.transactionFee).toBe(2.60);
      // Payment: 3% of $40 ($1.20) + $0.25 = $1.45
      expect(data.paymentProcessingFee).toBe(1.45);
      // Total fees = 0.20 + 2.60 + 1.45 = 4.25
      expect(data.totalFees).toBe(4.25);
      // Costs = 10 + 4.5 + 1.0 = 15.5
      expect(data.totalCosts).toBe(15.5);
      // Net Profit = 40 - 4.25 - 15.5 = 20.25
      expect(data.netProfit).toBe(20.25);
      expect(data.profitMarginPercent).toBeCloseTo(50.6, 1);
    });

    it('calculates offsite ads correctly when 12% is selected', () => {
      const res = calculateEtsyFees({
        salePrice: 100.0,
        shippingCharged: 0,
        itemCost: 20.0,
        shippingCost: 0,
        offsiteAdsPercent: 12,
        country: 'US',
      });

      expect(res.success).toBe(true);
      expect(res.data?.offsiteAdsFee).toBe(12.0);
    });
  });

  describe('US 1099 Self-Employed Tax Calculator', () => {
    it('calculates 15.3% SE tax, QBI, and quarterly estimated payments', () => {
      const res = calculate1099Tax({
        grossIncome: 100000,
        expenses: 20000,
        filingStatus: 'single',
        stateCode: 'NONE', // Texas / Florida
      });

      expect(res.success).toBe(true);
      const data = res.data!;
      expect(data.netProfit).toBe(80000);
      // SE Taxable Income: 80,000 * 0.9235 = 73,880
      expect(data.seTaxableIncome).toBe(73880);
      // Social Security: 73,880 * 12.4% = 9,161.12
      expect(data.socialSecurityTax).toBeCloseTo(9161.12, 1);
      // Medicare: 73,880 * 2.9% = 2,142.52
      expect(data.medicareTax).toBeCloseTo(2142.52, 1);
      // Total SE Tax ~ 11,303.64
      expect(data.totalSeTax).toBeCloseTo(11303.64, 1);
      // Quarterly payment should be roughly total tax / 4
      expect(data.quarterlyPayment).toBeGreaterThan(0);
      expect(data.quarterlyPayment * 4).toBeCloseTo(data.totalTaxLiability, 1);
      expect(data.takeHomePay).toBe(data.netProfit - data.totalTaxLiability);
    });
  });

  describe('TikTok & Reels Viral Hook Generator', () => {
    it('generates hooks with visual cues and audio recommendations', () => {
      const res = generateViralHooks('tech', 'ChatGPT');
      expect(res.success).toBe(true);
      expect(res.data?.length).toBeGreaterThan(3);
      const first = res.data![0];
      expect(first.hookText).toBeDefined();
      expect(first.visualCue).toBeDefined();
      expect(first.audioTip).toBeDefined();
    });
  });
});
