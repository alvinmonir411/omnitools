import { ToolEngineResult } from '@/types/tool';

export type FilingStatus = 'single' | 'marriedJoint' | 'marriedSeparate' | 'headOfHousehold';

export interface Tax1099Inputs {
  grossIncome: number;
  expenses: number;
  filingStatus?: FilingStatus;
  stateCode?: string;
  hasOtherW2Income?: number;
}

export interface Tax1099Breakdown {
  netProfit: number;
  seTaxableIncome: number;
  socialSecurityTax: number;
  medicareTax: number;
  totalSeTax: number;
  halfSeDeduction: number;
  qbiDeduction: number;
  standardDeduction: number;
  federalTaxableIncome: number;
  federalIncomeTax: number;
  stateTaxEstimate: number;
  totalTaxLiability: number;
  effectiveTaxRate: number;
  quarterlyPayment: number;
  takeHomePay: number;
}

// 2026 / Modern Federal Tax Brackets for Single Filers
const FEDERAL_BRACKETS_SINGLE = [
  { cap: 11600, rate: 0.10 },
  { cap: 47150, rate: 0.12 },
  { cap: 100525, rate: 0.22 },
  { cap: 191950, rate: 0.24 },
  { cap: 243725, rate: 0.32 },
  { cap: 609350, rate: 0.35 },
  { cap: Infinity, rate: 0.37 },
];

// Approximate state tax rates for popular freelance states
const STATE_RATES: Record<string, number> = {
  NONE: 0.0, // TX, FL, WA, NV, WY, AK, SD, TN
  CA: 0.08,  // California avg effective
  NY: 0.065, // New York
  IL: 0.0495,// Illinois flat
  CO: 0.044, // Colorado flat
  PA: 0.0307,// Pennsylvania flat
  NC: 0.0475,// North Carolina
  GA: 0.0549,// Georgia
  OTHER: 0.05,// Default US state average
};

export function calculate1099Tax(inputs: Tax1099Inputs): ToolEngineResult<Tax1099Breakdown> {
  const startTime = performance.now();
  const gross = Math.max(inputs.grossIncome || 0, 0);
  const expenses = Math.max(inputs.expenses || 0, 0);
  const filingStatus = inputs.filingStatus || 'single';
  const stateCode = inputs.stateCode || 'NONE';

  const netProfit = Math.max(gross - expenses, 0);

  if (netProfit === 0) {
    return {
      success: true,
      data: {
        netProfit: 0,
        seTaxableIncome: 0,
        socialSecurityTax: 0,
        medicareTax: 0,
        totalSeTax: 0,
        halfSeDeduction: 0,
        qbiDeduction: 0,
        standardDeduction: 14600,
        federalTaxableIncome: 0,
        federalIncomeTax: 0,
        stateTaxEstimate: 0,
        totalTaxLiability: 0,
        effectiveTaxRate: 0,
        quarterlyPayment: 0,
        takeHomePay: 0,
      },
      metrics: { processingTimeMs: 0 },
    };
  }

  // 1. Self-Employment Tax
  // 92.35% of net profit is subject to SE tax
  const seTaxableIncome = netProfit * 0.9235;

  // Social Security: 12.4% up to cap (~$168,600)
  const ssCap = 168600;
  const socialSecurityTax = Math.min(seTaxableIncome, ssCap) * 0.124;

  // Medicare: 2.9% uncapped (+ 0.9% if over $200k)
  let medicareTax = seTaxableIncome * 0.029;
  if (seTaxableIncome > 200000) {
    medicareTax += (seTaxableIncome - 200000) * 0.009;
  }

  const totalSeTax = socialSecurityTax + medicareTax;

  // 2. Adjustments & Deductions
  const halfSeDeduction = totalSeTax * 0.5;

  // Standard deduction
  let standardDeduction = 14600;
  if (filingStatus === 'marriedJoint') standardDeduction = 29200;
  else if (filingStatus === 'headOfHousehold') standardDeduction = 21900;

  // QBI (Qualified Business Income 20% deduction)
  const qbiDeduction = Math.max(netProfit - halfSeDeduction, 0) * 0.20;

  // Adjusted Taxable Income for Federal
  const federalTaxableIncome = Math.max(
    netProfit - halfSeDeduction - standardDeduction - qbiDeduction,
    0,
  );

  // 3. Federal Income Tax Calculation
  let federalIncomeTax = 0;
  let previousCap = 0;

  for (const bracket of FEDERAL_BRACKETS_SINGLE) {
    if (federalTaxableIncome > previousCap) {
      const taxableInBracket = Math.min(federalTaxableIncome, bracket.cap) - previousCap;
      federalIncomeTax += taxableInBracket * bracket.rate;
      previousCap = bracket.cap;
    } else {
      break;
    }
  }

  // 4. State Tax Estimate
  const stateRate = STATE_RATES[stateCode] ?? 0.05;
  const stateTaxEstimate = Math.max(netProfit - standardDeduction, 0) * stateRate;

  // Total Tax & Metrics
  const totalTaxLiability = totalSeTax + federalIncomeTax + stateTaxEstimate;
  const effectiveTaxRate = netProfit > 0 ? (totalTaxLiability / netProfit) * 100 : 0;
  const quarterlyPayment = totalTaxLiability / 4;
  const takeHomePay = netProfit - totalTaxLiability;

  const round2 = (num: number) => Math.round(num * 100) / 100;

  const endTime = performance.now();
  return {
    success: true,
    data: {
      netProfit: round2(netProfit),
      seTaxableIncome: round2(seTaxableIncome),
      socialSecurityTax: round2(socialSecurityTax),
      medicareTax: round2(medicareTax),
      totalSeTax: round2(totalSeTax),
      halfSeDeduction: round2(halfSeDeduction),
      qbiDeduction: round2(qbiDeduction),
      standardDeduction: round2(standardDeduction),
      federalTaxableIncome: round2(federalTaxableIncome),
      federalIncomeTax: round2(federalIncomeTax),
      stateTaxEstimate: round2(stateTaxEstimate),
      totalTaxLiability: round2(totalTaxLiability),
      effectiveTaxRate: round2(effectiveTaxRate),
      quarterlyPayment: round2(quarterlyPayment),
      takeHomePay: round2(takeHomePay),
    },
    metrics: { processingTimeMs: Math.round((endTime - startTime) * 100) / 100 },
  };
}
