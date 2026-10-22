import { ToolEngineResult } from '@/types/tool';

export interface EtsyFeeInputs {
  salePrice: number;
  shippingCharged: number;
  itemCost: number;
  shippingCost: number;
  otherCosts?: number;
  offsiteAdsPercent?: 0 | 12 | 15;
  country?: 'US' | 'UK' | 'CA' | 'AU';
  isAutoRenewListing?: boolean;
}

export interface EtsyFeeBreakdown {
  listingFee: number;
  transactionFee: number;
  paymentProcessingFee: number;
  offsiteAdsFee: number;
  regulatoryFee: number;
  totalFees: number;
  totalCosts: number;
  totalRevenue: number;
  netProfit: number;
  profitMarginPercent: number;
  etsyFeePercentOfRevenue: number;
  breakEvenPrice: number;
}

export function calculateEtsyFees(inputs: EtsyFeeInputs): ToolEngineResult<EtsyFeeBreakdown> {
  const startTime = performance.now();
  const salePrice = Math.max(inputs.salePrice || 0, 0);
  const shippingCharged = Math.max(inputs.shippingCharged || 0, 0);
  const itemCost = Math.max(inputs.itemCost || 0, 0);
  const shippingCost = Math.max(inputs.shippingCost || 0, 0);
  const otherCosts = Math.max(inputs.otherCosts || 0, 0);
  const offsiteAdsPercent = inputs.offsiteAdsPercent || 0;
  const country = inputs.country || 'US';

  const totalRevenue = salePrice + shippingCharged;

  if (totalRevenue === 0) {
    return {
      success: true,
      data: {
        listingFee: 0,
        transactionFee: 0,
        paymentProcessingFee: 0,
        offsiteAdsFee: 0,
        regulatoryFee: 0,
        totalFees: 0,
        totalCosts: itemCost + shippingCost + otherCosts,
        totalRevenue: 0,
        netProfit: -(itemCost + shippingCost + otherCosts),
        profitMarginPercent: 0,
        etsyFeePercentOfRevenue: 0,
        breakEvenPrice: 0,
      },
      metrics: { processingTimeMs: 0 },
    };
  }

  // 1. Listing Fee: $0.20 USD fixed
  const listingFee = 0.20;

  // 2. Transaction Fee: 6.5% of (Item Price + Shipping Charged)
  const transactionFee = totalRevenue * 0.065;

  // 3. Payment Processing Fee by Country
  let paymentPercent = 0.03;
  let paymentFixed = 0.25;
  let regulatoryPercent = 0;

  if (country === 'UK') {
    paymentPercent = 0.04;
    paymentFixed = 0.20;
    regulatoryPercent = 0.0032; // 0.32% UK regulatory operating fee
  } else if (country === 'CA') {
    paymentPercent = 0.03;
    paymentFixed = 0.25;
  } else if (country === 'AU') {
    paymentPercent = 0.03;
    paymentFixed = 0.25;
  }

  const paymentProcessingFee = totalRevenue * paymentPercent + paymentFixed;

  // 4. Offsite Ads Fee
  const offsiteAdsFee = totalRevenue * (offsiteAdsPercent / 100);

  // 5. Regulatory Operating Fee
  const regulatoryFee = totalRevenue * regulatoryPercent;

  const totalFees = listingFee + transactionFee + paymentProcessingFee + offsiteAdsFee + regulatoryFee;
  const totalCosts = itemCost + shippingCost + otherCosts;
  const netProfit = totalRevenue - totalFees - totalCosts;
  const profitMarginPercent = (netProfit / totalRevenue) * 100;
  const etsyFeePercentOfRevenue = (totalFees / totalRevenue) * 100;

  // Calculate Break-Even Sale Price:
  // Revenue = SalePrice + ShippingCharged
  // Net = Revenue - (Fees + Costs) = 0
  // Revenue * (1 - 0.065 - paymentPercent - offsiteAdsPercent/100 - regulatoryPercent) = listingFee + paymentFixed + totalCosts
  const feeRate = 0.065 + paymentPercent + (offsiteAdsPercent / 100) + regulatoryPercent;
  const fixedFeesAndCosts = listingFee + paymentFixed + totalCosts;
  const breakEvenRevenue = (1 - feeRate) > 0 ? fixedFeesAndCosts / (1 - feeRate) : 0;
  const breakEvenPrice = Math.max(breakEvenRevenue - shippingCharged, 0);

  const round2 = (num: number) => Math.round(num * 100) / 100;

  const endTime = performance.now();
  return {
    success: true,
    data: {
      listingFee: round2(listingFee),
      transactionFee: round2(transactionFee),
      paymentProcessingFee: round2(paymentProcessingFee),
      offsiteAdsFee: round2(offsiteAdsFee),
      regulatoryFee: round2(regulatoryFee),
      totalFees: round2(totalFees),
      totalCosts: round2(totalCosts),
      totalRevenue: round2(totalRevenue),
      netProfit: round2(netProfit),
      profitMarginPercent: round2(profitMarginPercent),
      etsyFeePercentOfRevenue: round2(etsyFeePercentOfRevenue),
      breakEvenPrice: round2(breakEvenPrice),
    },
    metrics: {
      processingTimeMs: Math.round((endTime - startTime) * 100) / 100,
    },
  };
}
