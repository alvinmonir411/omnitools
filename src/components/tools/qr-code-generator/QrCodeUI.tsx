'use client';

import * as React from 'react';
import { generateQrCode, QrCodeOptions } from '@/lib/tools/qr-code-generator/engine';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { CopyButton } from '@/components/ui/CopyButton';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent } from '@/components/ui/Card';
import { Download, Sparkles, Trash2, QrCode as QrIcon, Globe, Wifi, Mail, AlignLeft } from 'lucide-react';

export function QrCodeUI() {
  const [text, setText] = React.useState('https://omnitools.app');
  const [ecLevel, setEcLevel] = React.useState<'L' | 'M' | 'Q' | 'H'>('M');
  const [colorDark, setColorDark] = React.useState('#0F172A');
  const [colorLight, setColorLight] = React.useState('#FFFFFF');
  const [qrPng, setQrPng] = React.useState<string>('');
  const [qrSvg, setQrSvg] = React.useState<string>('');

  React.useEffect(() => {
    let isCancelled = false;
    generateQrCode(text, {
      errorCorrectionLevel: ecLevel,
      colorDark,
      colorLight,
      width: 320,
    }).then((res) => {
      if (!isCancelled && res.success && res.data) {
        setQrPng(res.data.pngDataUrl);
        setQrSvg(res.data.svgString);
      }
    });
    return () => {
      isCancelled = true;
    };
  }, [text, ecLevel, colorDark, colorLight]);

  const handleDownloadPng = () => {
    if (!qrPng) return;
    const a = document.createElement('a');
    a.href = qrPng;
    a.download = `qrcode-${Date.now()}.png`;
    a.click();
  };

  const handleDownloadSvg = () => {
    if (!qrSvg) return;
    const blob = new Blob([qrSvg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `qrcode-${Date.now()}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration Column (2 spans) */}
        <div className="lg:col-span-2 space-y-5 p-5 rounded-xl border border-surface-border bg-surface shadow-sm">
          {/* Content Type Presets */}
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase text-body-muted">
              Input Template
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setText('https://omnitools.app')}
                className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-surface-border bg-surface-subtle text-xs font-medium text-body hover:bg-slate-200"
              >
                <Globe className="h-3.5 w-3.5 text-primary" />
                <span>Website URL</span>
              </button>

              <button
                type="button"
                onClick={() => setText('WIFI:S:MyNetwork;T:WPA;P:SecretPassword;;')}
                className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-surface-border bg-surface-subtle text-xs font-medium text-body hover:bg-slate-200"
              >
                <Wifi className="h-3.5 w-3.5 text-primary" />
                <span>WiFi Network</span>
              </button>

              <button
                type="button"
                onClick={() => setText('mailto:hello@example.com?subject=Inquiry')}
                className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-surface-border bg-surface-subtle text-xs font-medium text-body hover:bg-slate-200"
              >
                <Mail className="h-3.5 w-3.5 text-primary" />
                <span>Email Address</span>
              </button>

              <button
                type="button"
                onClick={() => setText('OmniTools 100% Private Offline QR Code')}
                className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-surface-border bg-surface-subtle text-xs font-medium text-body hover:bg-slate-200"
              >
                <AlignLeft className="h-3.5 w-3.5 text-primary" />
                <span>Plain Text</span>
              </button>
            </div>
          </div>

          {/* Text Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase text-body tracking-wider flex items-center justify-between">
              <span>QR Destination Content</span>
              {text && (
                <button
                  type="button"
                  onClick={() => setText('')}
                  className="text-body-muted hover:text-danger text-[11px] normal-case"
                >
                  Clear
                </button>
              )}
            </label>
            <Input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter URL, text, or payload..."
              className="text-sm"
            />
          </div>

          {/* Customization Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-surface-border">
            {/* Error Correction */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase text-body-muted">
                Error Correction Level
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {(['L', 'M', 'Q', 'H'] as const).map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setEcLevel(level)}
                    className={`py-1.5 text-xs font-medium rounded-md border transition-colors ${
                      ecLevel === level
                        ? 'bg-primary text-white border-primary font-bold'
                        : 'border-surface-border bg-surface-subtle text-body hover:bg-slate-200'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-body-muted">
                {ecLevel === 'L' && '7% recovery (compact size)'}
                {ecLevel === 'M' && '15% recovery (standard recommended)'}
                {ecLevel === 'Q' && '25% recovery (high reliability)'}
                {ecLevel === 'H' && '30% recovery (best for logos & damage)'}
              </p>
            </div>

            {/* Colors */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase text-body-muted">
                Colors
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={colorDark}
                    onChange={(e) => setColorDark(e.target.value)}
                    className="h-8 w-8 rounded cursor-pointer border border-surface-border"
                  />
                  <span className="text-xs text-body">Pattern</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={colorLight}
                    onChange={(e) => setColorLight(e.target.value)}
                    className="h-8 w-8 rounded cursor-pointer border border-surface-border"
                  />
                  <span className="text-xs text-body">Background</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live QR Preview & Download Column (1 span) */}
        <div className="space-y-4 p-5 rounded-xl border border-surface-border bg-surface shadow-sm flex flex-col items-center justify-between text-center">
          <span className="text-xs font-semibold uppercase text-body tracking-wider">
            Live Preview
          </span>

          <div className="p-4 rounded-xl border border-surface-border bg-white shadow-inner flex items-center justify-center min-h-[220px] w-full max-w-[240px]">
            {qrPng ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={qrPng}
                alt="Generated QR code preview"
                className="max-h-[200px] w-auto object-contain animate-in zoom-in-95"
              />
            ) : (
              <div className="text-xs text-body-muted italic">
                Enter content to generate QR matrix
              </div>
            )}
          </div>

          {/* Download Actions */}
          <div className="w-full space-y-2">
            <Button
              type="button"
              variant="primary"
              className="w-full"
              disabled={!qrPng}
              onClick={handleDownloadPng}
            >
              <Download className="h-4 w-4 mr-2" />
              Download PNG
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              disabled={!qrSvg}
              onClick={handleDownloadSvg}
            >
              <Download className="h-4 w-4 mr-2" />
              Download Vector SVG
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
