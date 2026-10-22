'use client';

import * as React from 'react';
import { calculateEtsyFees, EtsyFeeInputs, EtsyFeeBreakdown } from '@/lib/tools/etsy-fee-calculator/engine';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useDirectLink } from '@/hooks/useDirectLink';
import { DollarSign, Percent, TrendingUp, Share2, Sparkles, AlertCircle, ShoppingBag, Download } from 'lucide-react';

export function EtsyFeeUI() {
  const [inputs, setInputs] = React.useState<EtsyFeeInputs>({
    salePrice: 35.0,
    shippingCharged: 4.5,
    itemCost: 8.0,
    shippingCost: 4.25,
    otherCosts: 1.5,
    offsiteAdsPercent: 0,
    country: 'US',
  });

  const [shareUrl, setShareUrl] = React.useState<string | null>(null);
  const [isSaving, setIsSaving] = React.useState(false);
  const { triggerMonetizedAction } = useDirectLink();

  const result = React.useMemo(() => {
    return calculateEtsyFees(inputs).data!;
  }, [inputs]);

  const handlePreset = (type: 'craft' | 'digital' | 'vintage') => {
    if (type === 'craft') {
      setInputs({
        salePrice: 42.0,
        shippingCharged: 5.0,
        itemCost: 11.5,
        shippingCost: 4.8,
        otherCosts: 2.0,
        offsiteAdsPercent: 0,
        country: 'US',
      });
    } else if (type === 'digital') {
      setInputs({
        salePrice: 12.0,
        shippingCharged: 0,
        itemCost: 0,
        shippingCost: 0,
        otherCosts: 0.5,
        offsiteAdsPercent: 0,
        country: 'US',
      });
    } else {
      setInputs({
        salePrice: 85.0,
        shippingCharged: 12.0,
        itemCost: 25.0,
        shippingCost: 11.0,
        otherCosts: 3.0,
        offsiteAdsPercent: 12,
        country: 'US',
      });
    }
  };

  const handleShare = async () => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toolSlug: 'etsy-fee-calculator',
          data: { inputs, result },
        }),
      });
      const data = await res.json();
      if (data.id) {
        const link = `${window.location.origin}/tools/productivity/etsy-fee-calculator?id=${data.id}`;
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
    // Trigger smart monetization gateway in background tab (rate-limited)
    triggerMonetizedAction();

    // Print / Save calculation
    window.print();
  };

  const isProfitable = result.netProfit > 0;

  return (
    <div className="space-y-6">
      {/* Preset Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl border border-surface-border bg-surface shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase text-body-muted mr-1">
            Example Templates:
          </span>
          <Button size="sm" variant="outline" onClick={() => handlePreset('craft')}>
            Handmade Craft ($42)
          </Button>
          <Button size="sm" variant="outline" onClick={() => handlePreset('digital')}>
            Digital Download ($12)
          </Button>
          <Button size="sm" variant="outline" onClick={() => handlePreset('vintage')}>
            Vintage Item ($85)
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" variant="primary" onClick={handleShare} isLoading={isSaving}>
            <Share2 className="h-3.5 w-3.5 mr-1.5" />
            {shareUrl ? 'Link Copied!' : 'Save & Share Link'}
          </Button>
          <Button size="sm" variant="secondary" onClick={handleExport}>
            <Download className="h-3.5 w-3.5 mr-1.5" />
            Print / PDF Report
          </Button>
        </div>
      </div>

      {/* Grid: Inputs (Left) and Results (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Form Inputs (7 cols) */}
        <div className="lg:col-span-7 space-y-5 p-5 rounded-xl border border-surface-border bg-surface shadow-sm">
          <div className="flex items-center justify-between pb-2 border-b border-surface-border">
            <h3 className="text-sm font-bold uppercase tracking-wider text-body flex items-center gap-2">
              <ShoppingBag className="h-4 w-4 text-primary" />
              Listing &amp; Revenue Details
            </h3>
            {/* Country */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-body-muted font-medium">Market:</span>
              <select
                value={inputs.country}
                onChange={(e) => setInputs({ ...inputs, country: e.target.value as any })}
                className="h-8 rounded-md border border-surface-border bg-surface px-2.5 text-xs font-semibold text-body focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="US">United States (USD)</option>
                <option value="UK">United Kingdom (GBP)</option>
                <option value="CA">Canada (CAD)</option>
                <option value="AU">Australia (AUD)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Item Sale Price ($)"
              type="number"
              step="0.01"
              value={inputs.salePrice || ''}
              onChange={(e) => setInputs({ ...inputs, salePrice: parseFloat(e.target.value) || 0 })}
              placeholder="e.g. 35.00"
            />
            <Input
              label="Shipping Charged to Buyer ($)"
              type="number"
              step="0.01"
              value={inputs.shippingCharged || ''}
              onChange={(e) => setInputs({ ...inputs, shippingCharged: parseFloat(e.target.value) || 0 })}
              placeholder="e.g. 4.50"
            />
          </div>

          <h3 className="text-sm font-bold uppercase tracking-wider text-body pt-2 border-t border-surface-border">
            Your Costs (COGS)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="Item / Material Cost ($)"
              type="number"
              step="0.01"
              value={inputs.itemCost || ''}
              onChange={(e) => setInputs({ ...inputs, itemCost: parseFloat(e.target.value) || 0 })}
              placeholder="e.g. 8.00"
            />
            <Input
              label="Actual Shipping Cost ($)"
              type="number"
              step="0.01"
              value={inputs.shippingCost || ''}
              onChange={(e) => setInputs({ ...inputs, shippingCost: parseFloat(e.target.value) || 0 })}
              placeholder="e.g. 4.25"
            />
            <Input
              label="Packaging & Other ($)"
              type="number"
              step="0.01"
              value={inputs.otherCosts || ''}
              onChange={(e) => setInputs({ ...inputs, otherCosts: parseFloat(e.target.value) || 0 })}
              placeholder="e.g. 1.50"
            />
          </div>

          {/* Offsite Ads Selection */}
          <div className="pt-2 border-t border-surface-border space-y-2">
            <label className="text-xs font-semibold uppercase text-body-muted block">
              Etsy Offsite Ads Fee
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'No Ads (0%)', val: 0 },
                { label: 'Mandatory (12%)', val: 12 },
                { label: 'Optional (15%)', val: 15 },
              ].map((opt) => (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() => setInputs({ ...inputs, offsiteAdsPercent: opt.val as any })}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                    inputs.offsiteAdsPercent === opt.val
                      ? 'bg-primary text-white border-primary shadow-sm'
                      : 'bg-surface-subtle text-body border-surface-border hover:bg-slate-200'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Card (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Main Net Profit Card */}
          <div
            className={`p-6 rounded-xl border text-center shadow-md transition-colors ${
              isProfitable
                ? 'bg-success-subtle/40 border-success/30'
                : 'bg-danger-subtle/30 border-danger/30'
            }`}
          >
            <span className="text-xs font-bold uppercase tracking-wider text-body-muted block mb-1">
              Estimated Net Take-Home Profit
            </span>
            <div
              className={`text-4xl sm:text-5xl font-extrabold tracking-tight ${
                isProfitable ? 'text-success' : 'text-danger'
              }`}
            >
              ${result.netProfit.toFixed(2)}
            </div>

            <div className="flex items-center justify-center gap-4 mt-3 pt-3 border-t border-black/10 text-xs font-semibold">
              <div>
                <span className="text-body-muted block text-[11px]">Profit Margin</span>
                <span className={isProfitable ? 'text-success font-bold text-sm' : 'text-danger font-bold text-sm'}>
                  {result.profitMarginPercent.toFixed(1)}%
                </span>
              </div>
              <div className="border-l border-black/10 pl-4">
                <span className="text-body-muted block text-[11px]">Break-Even Price</span>
                <span className="text-body font-bold text-sm">
                  ${result.breakEvenPrice.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Itemized Fee Breakdown Card */}
          <Card>
            <CardContent className="p-5 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-body pb-2 border-b border-surface-border flex items-center justify-between">
                <span>Etsy Fees Breakdown</span>
                <span className="text-primary font-bold">
                  ${result.totalFees.toFixed(2)} ({result.etsyFeePercentOfRevenue.toFixed(1)}%)
                </span>
              </h4>

              <div className="divide-y divide-surface-border text-xs">
                <div className="flex justify-between py-1.5">
                  <span className="text-body-muted">Listing Fee (per 4 months / sale)</span>
                  <span className="font-semibold text-body">${result.listingFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-body-muted">Transaction Fee (6.5%)</span>
                  <span className="font-semibold text-body">${result.transactionFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-body-muted">Payment Processing ({inputs.country})</span>
                  <span className="font-semibold text-body">${result.paymentProcessingFee.toFixed(2)}</span>
                </div>
                {result.offsiteAdsFee > 0 && (
                  <div className="flex justify-between py-1.5 text-warning font-semibold">
                    <span>Offsite Ads Fee ({inputs.offsiteAdsPercent}%)</span>
                    <span>${result.offsiteAdsFee.toFixed(2)}</span>
                  </div>
                )}
                {result.regulatoryFee > 0 && (
                  <div className="flex justify-between py-1.5">
                    <span className="text-body-muted">Regulatory Operating Fee</span>
                    <span className="font-semibold text-body">${result.regulatoryFee.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between py-2 font-bold text-body pt-2 text-sm">
                  <span>Total Etsy Fees</span>
                  <span className="text-danger">-${result.totalFees.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-1.5 text-body-muted">
                  <span>Total Product &amp; Shipping Costs</span>
                  <span>-${result.totalCosts.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
