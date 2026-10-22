'use client';

import * as React from 'react';
import {
  convertTimestampToDate,
  convertDateToTimestamp,
  TimestampConvertedData,
} from '@/lib/tools/unix-timestamp-converter/engine';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { CopyButton } from '@/components/ui/CopyButton';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent } from '@/components/ui/Card';
import { Clock, RefreshCw, Calendar, ArrowRightLeft, Sparkles } from 'lucide-react';

export function TimestampUI() {
  const [currentEpoch, setCurrentEpoch] = React.useState<number>(() => Math.floor(Date.now() / 1000));
  const [inputTimestamp, setInputTimestamp] = React.useState<string>(() => String(Math.floor(Date.now() / 1000)));
  const [dateInput, setDateInput] = React.useState<string>(() => new Date().toISOString().slice(0, 16));
  const [activeMode, setActiveMode] = React.useState<'timestampToDate' | 'dateToTimestamp'>('timestampToDate');

  // Live clock ticker
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentEpoch(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const result = React.useMemo(() => {
    if (activeMode === 'timestampToDate') {
      return convertTimestampToDate(inputTimestamp);
    } else {
      return convertDateToTimestamp(dateInput);
    }
  }, [inputTimestamp, dateInput, activeMode]);

  const data: TimestampConvertedData | undefined = result.data;

  const handleUseCurrent = () => {
    const nowSec = Math.floor(Date.now() / 1000);
    setInputTimestamp(String(nowSec));
    setDateInput(new Date().toISOString().slice(0, 16));
  };

  return (
    <div className="space-y-6">
      {/* Live Current Epoch Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl border border-primary/20 bg-primary-subtle text-body shadow-sm">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-primary p-2 text-white">
            <Clock className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-body-muted">
              Current Unix Epoch (Seconds)
            </div>
            <div className="font-mono text-xl sm:text-2xl font-bold text-primary">
              {currentEpoch}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <CopyButton text={String(currentEpoch)} size="sm" variant="primary" label="Copy Epoch" />
          <Button size="sm" variant="outline" onClick={handleUseCurrent}>
            <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
            Use Current
          </Button>
        </div>
      </div>

      {/* Mode Switcher */}
      <div className="flex gap-2 p-1 rounded-lg border border-surface-border bg-surface-subtle w-fit">
        <button
          type="button"
          onClick={() => setActiveMode('timestampToDate')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            activeMode === 'timestampToDate'
              ? 'bg-surface text-primary shadow-sm font-semibold'
              : 'text-body-muted hover:text-body'
          }`}
        >
          Epoch Timestamp → Human Date
        </button>
        <button
          type="button"
          onClick={() => setActiveMode('dateToTimestamp')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            activeMode === 'dateToTimestamp'
              ? 'bg-surface text-primary shadow-sm font-semibold'
              : 'text-body-muted hover:text-body'
          }`}
        >
          Human Date → Epoch Timestamp
        </button>
      </div>

      {/* Input Form */}
      <div className="p-5 rounded-xl border border-surface-border bg-surface shadow-sm space-y-4">
        {activeMode === 'timestampToDate' ? (
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase text-body tracking-wider">
              Enter Unix Timestamp (Seconds or Milliseconds)
            </label>
            <div className="flex gap-2">
              <Input
                value={inputTimestamp}
                onChange={(e) => setInputTimestamp(e.target.value)}
                placeholder="e.g. 1774204800 or 1774204800000"
                className="font-mono text-sm"
              />
              <Button type="button" variant="outline" onClick={handleUseCurrent}>
                Now
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase text-body tracking-wider">
              Pick Date and Time
            </label>
            <Input
              type="datetime-local"
              value={dateInput}
              onChange={(e) => setDateInput(e.target.value)}
              className="text-sm font-mono"
            />
          </div>
        )}
      </div>

      {/* Output Display Cards */}
      {data && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-body uppercase tracking-wider">
            <span>Converted Representations</span>
            <Badge variant="primary" size="sm">{data.relativeTime}</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* UTC Format */}
            <Card>
              <CardContent className="p-4 space-y-1.5">
                <div className="flex items-center justify-between text-xs text-body-muted">
                  <span className="font-semibold uppercase">UTC Format (GMT)</span>
                  <CopyButton text={data.utcString} size="sm" variant="ghost" label="" />
                </div>
                <div className="font-mono text-sm font-semibold text-body select-all">
                  {data.utcString}
                </div>
              </CardContent>
            </Card>

            {/* ISO 8601 */}
            <Card>
              <CardContent className="p-4 space-y-1.5">
                <div className="flex items-center justify-between text-xs text-body-muted">
                  <span className="font-semibold uppercase">ISO 8601</span>
                  <CopyButton text={data.iso8601} size="sm" variant="ghost" label="" />
                </div>
                <div className="font-mono text-sm font-semibold text-body select-all">
                  {data.iso8601}
                </div>
              </CardContent>
            </Card>

            {/* Local Time */}
            <Card>
              <CardContent className="p-4 space-y-1.5">
                <div className="flex items-center justify-between text-xs text-body-muted">
                  <span className="font-semibold uppercase">Your Local Timezone</span>
                  <CopyButton text={data.localString} size="sm" variant="ghost" label="" />
                </div>
                <div className="font-mono text-sm font-semibold text-body select-all">
                  {data.localString}
                </div>
              </CardContent>
            </Card>

            {/* Epoch Seconds & Millis */}
            <Card>
              <CardContent className="p-4 space-y-1.5">
                <div className="flex items-center justify-between text-xs text-body-muted">
                  <span className="font-semibold uppercase">Seconds &amp; Milliseconds</span>
                  <CopyButton text={String(data.epochSeconds)} size="sm" variant="ghost" label="" />
                </div>
                <div className="font-mono text-xs text-body space-y-1">
                  <div>
                    <span className="text-body-muted">Sec: </span>
                    <span className="font-bold">{data.epochSeconds}</span>
                  </div>
                  <div>
                    <span className="text-body-muted">Ms: </span>
                    <span className="font-bold">{data.epochMilliseconds}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Metrics Badges */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="text-xs text-body-muted">Calendar Details:</span>
            <Badge variant="outline">{data.dayOfWeek}</Badge>
            <Badge variant="outline">Day of Year: {data.dayOfYear}</Badge>
            <Badge variant="outline">{data.isLeapYear ? 'Leap Year' : 'Non-Leap Year'}</Badge>
          </div>
        </div>
      )}
    </div>
  );
}
