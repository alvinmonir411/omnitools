import { ToolEngineResult } from '@/types/tool';

export interface TimestampConvertedData {
  epochSeconds: number;
  epochMilliseconds: number;
  iso8601: string;
  utcString: string;
  localString: string;
  relativeTime: string;
  dayOfWeek: string;
  dayOfYear: number;
  isLeapYear: boolean;
}

function getRelativeTime(timestampMs: number): string {
  const diffMs = timestampMs - Date.now();
  const diffSeconds = Math.round(diffMs / 1000);
  const isFuture = diffSeconds > 0;
  const absSec = Math.abs(diffSeconds);

  let val = '';
  if (absSec < 60) {
    val = `${absSec} second${absSec !== 1 ? 's' : ''}`;
  } else if (absSec < 3600) {
    const mins = Math.floor(absSec / 60);
    val = `${mins} minute${mins !== 1 ? 's' : ''}`;
  } else if (absSec < 86400) {
    const hours = Math.floor(absSec / 3600);
    val = `${hours} hour${hours !== 1 ? 's' : ''}`;
  } else {
    const days = Math.floor(absSec / 86400);
    val = `${days} day${days !== 1 ? 's' : ''}`;
  }

  return isFuture ? `in ${val}` : `${val} ago`;
}

function calculateDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

export function convertTimestampToDate(
  rawInput: string | number,
  forceUnit?: 'seconds' | 'milliseconds',
): ToolEngineResult<TimestampConvertedData> {
  const startTime = performance.now();
  const numeric = typeof rawInput === 'string' ? Number(rawInput.trim()) : rawInput;

  if (isNaN(numeric)) {
    return {
      success: false,
      error: { message: 'Invalid numeric timestamp provided.' },
    };
  }

  // Determine seconds vs milliseconds
  let ms: number;
  let sec: number;

  if (forceUnit === 'milliseconds' || (!forceUnit && numeric > 9999999999)) {
    ms = numeric;
    sec = Math.floor(numeric / 1000);
  } else {
    sec = numeric;
    ms = numeric * 1000;
  }

  const date = new Date(ms);
  if (isNaN(date.getTime())) {
    return {
      success: false,
      error: { message: 'Timestamp is outside of valid date range.' },
    };
  }

  const year = date.getUTCFullYear();
  const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const endTime = performance.now();
  return {
    success: true,
    data: {
      epochSeconds: sec,
      epochMilliseconds: ms,
      iso8601: date.toISOString(),
      utcString: date.toUTCString(),
      localString: date.toLocaleString(),
      relativeTime: getRelativeTime(ms),
      dayOfWeek: daysOfWeek[date.getUTCDay()],
      dayOfYear: calculateDayOfYear(date),
      isLeapYear,
    },
    metrics: { processingTimeMs: Math.round((endTime - startTime) * 100) / 100 },
  };
}

export function convertDateToTimestamp(dateStr: string): ToolEngineResult<TimestampConvertedData> {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    return {
      success: false,
      error: { message: 'Invalid date string provided.' },
    };
  }
  return convertTimestampToDate(date.getTime(), 'milliseconds');
}
