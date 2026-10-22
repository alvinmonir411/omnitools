'use client';

import * as React from 'react';
import { calculate1099Tax, Tax1099Inputs, FilingStatus } from '@/lib/tools/us-1099-tax-calculator/engine';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useDirectLink } from '@/hooks/useDirectLink';
import { DollarSign, Percent, Calendar, ShieldCheck, Download, Share2, Calculator } from 'lucide-react';

export function TaxCalculatorUI() {
  const [inputs, setInputs] = React.useState<Tax1099Inputs>({
    grossIncome: 75000,
    expenses: 12000,
    filingStatus: 'single',
    stateCode: 'NONE',
  });

  const [shareUrl, setShareUrl] = React.useState<string | null>(null);
  const [isSaving, setIsSaving] = React.useState(false);
  const { triggerMonetizedAction } = useDirectLink();

  const result = React.useMemo(() => {
    return calculate1099Tax(inputs).data!;
  }, [inputs]);

  const handlePreset = (type: 'freelance' | 'consultant' | 'gig') => {
    if (type === 'freelance') {
      setInputs({ grossIncome: 75000, expenses: 12000, filingStatus: 'single', stateCode: 'NONE' });
    } else if (type === 'consultant') {
      setInputs({ grossIncome: 150000, expenses: 25000, filingStatus: 'marriedJoint', stateCode: 'CA' });
    } else {
      setInputs({ grossIncome: 38000, expenses: 9500, filingStatus: 'single', stateCode: 'TX' });
    }
  };

  const handleShare = async () => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toolSlug: 'us-1099-tax-calculator',
          data: { inputs, result },
        }),
      });
      const data = await res.json();
      if (data.id) {
        const link = `${window.location.origin}/tools/productivity/us-1099-tax-calculator?id=${data.id}`;
        setShareUrl(link);
        navigator.clipboard?.writeText(link);
      }
    } catch {
      // Fallback
    } finally {
      setIsSaving(false);
    }
  };

  const handleExport = () => {
    triggerMonetizedAction();
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Presets and Share Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl border border-surface-border bg-surface shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase text-body-muted mr-1">
            Example Scenarios:
          </span>
          <Button size="sm" variant="outline" onClick={() => handlePreset('freelance')}>
            Solo Freelancer ($75k)
          </Button>
          <Button size="sm" variant="outline" onClick={() => handlePreset('consultant')}>
            Six-Figure Consultant ($150k)
          </Button>
          <Button size="sm" variant="outline" onClick={() => handlePreset('gig')}>
            Gig / Rideshare ($38k)
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" variant="primary" onClick={handleShare} isLoading={isSaving}>
            <Share2 className="h-3.5 w-3.5 mr-1.5" />
            {shareUrl ? 'Link Copied!' : 'Save & Share Link'}
          </Button>
          <Button size="sm" variant="secondary" onClick={handleExport}>
            <Download className="h-3.5 w-3.5 mr-1.5" />
            Download Summary
          </Button>
        </div>
      </div>

      {/* Main Grid: Inputs vs Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Form Inputs (7 cols) */}
        <div className="lg:col-span-7 space-y-5 p-5 rounded-xl border border-surface-border bg-surface shadow-sm">
          <h3 className="text-sm font-bold uppercase tracking-wider text-body flex items-center gap-2 pb-2 border-b border-surface-border">
            <Calculator className="h-4 w-4 text-primary" />
            1099 Revenue &amp; Business Expenses
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Gross 1099 Revenue ($ / Year)"
              type="number"
              step="500"
              value={inputs.grossIncome || ''}
              onChange={(e) => setInputs({ ...inputs, grossIncome: parseFloat(e.target.value) || 0 })}
              placeholder="e.g. 75000"
            />
            <Input
              label="Tax Deductible Expenses ($)"
              type="number"
              step="100"
              value={inputs.expenses || ''}
              onChange={(e) => setInputs({ ...inputs, expenses: parseFloat(e.target.value) || 0 })}
              placeholder="e.g. 12000"
              helperText="Equipment, software, mileage, home office"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-surface-border">
            {/* Filing Status */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase text-body-muted block">
                Tax Filing Status
              </label>
              <select
                value={inputs.filingStatus}
                onChange={(e) => setInputs({ ...inputs, filingStatus: e.target.value as FilingStatus })}
                className="h-10 w-full rounded-md border border-surface-border bg-surface px-3 text-xs sm:text-sm text-body focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="single">Single Filer</option>
                <option value="marriedJoint">Married Filing Jointly</option>
                <option value="headOfHousehold">Head of Household</option>
                <option value="marriedSeparate">Married Filing Separately</option>
              </select>
            </div>

            {/* State Tax */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase text-body-muted block">
                US State Residence
              </label>
              <select
                value={inputs.stateCode}
                onChange={(e) => setInputs({ ...inputs, stateCode: e.target.value })}
                className="h-10 w-full rounded-md border border-surface-border bg-surface px-3 text-xs sm:text-sm text-body focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="NONE">No State Income Tax (TX, FL, WA, NV, WY, AK, SD, TN)</option>
                <option value="CA">California (~8.0%)</option>
                <option value="NY">New York (~6.5%)</option>
                <option value="IL">Illinois (4.95%)</option>
                <option value="CO">Colorado (4.4%)</option>
                <option value="PA">Pennsylvania (3.07%)</option>
                <option value="NC">North Carolina (4.75%)</option>
                <option value="GA">Georgia (5.49%)</option>
                <option value="OTHER">Other US State (~5.0% avg)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Overview (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Main Quarterly Estimated Payment Card */}
          <div className="p-6 rounded-xl border border-primary/20 bg-primary-subtle text-center shadow-md">
            <span className="text-xs font-bold uppercase tracking-wider text-body-muted block mb-1">
              Estimated Quarterly Payment (Q1 - Q4)
            </span>
            <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-primary">
              ${result.quarterlyPayment.toFixed(2)}
            </div>
            <p className="text-[11px] text-body-muted mt-2">
              Due April 15, June 15, September 15, and January 15
            </p>

            <div className="flex items-center justify-center gap-4 mt-4 pt-3 border-t border-primary/10 text-xs font-semibold">
              <div>
                <span className="text-body-muted block text-[11px]">Total Annual Tax</span>
                <span className="text-danger font-bold text-sm">
                  ${result.totalTaxLiability.toFixed(2)}
                </span>
              </div>
              <div className="border-l border-primary/10 pl-4">
                <span className="text-body-muted block text-[11px]">Effective Tax Rate</span>
                <span className="text-body font-bold text-sm">
                  {result.effectiveTaxRate.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>

          {/* Breakdown Card */}
          <Card>
            <CardContent className="p-5 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-body pb-2 border-b border-surface-border flex items-center justify-between">
                <span>Tax Breakdown &amp; Deductions</span>
                <span className="text-success font-bold">
                  Take-Home: ${result.takeHomePay.toFixed(2)}
                </span>
              </h4>

              <div className="divide-y divide-surface-border text-xs">
                <div className="flex justify-between py-1.5">
                  <span className="text-body-muted">Net Schedule C Business Profit</span>
                  <span className="font-semibold text-body">${result.netProfit.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-body-muted">Self-Employment (SE) Tax (15.3%)</span>
                  <span className="font-semibold text-danger">${result.totalSeTax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-body-muted">Estimated Federal Income Tax</span>
                  <span className="font-semibold text-danger">${result.federalIncomeTax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-body-muted">Estimated State Tax</span>
                  <span className="font-semibold text-danger">${result.stateTaxEstimate.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-1.5 text-success font-medium">
                  <span>QBI 20% Deduction Savings</span>
                  <span>-${result.qbiDeduction.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
