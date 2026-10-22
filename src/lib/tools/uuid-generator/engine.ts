import { ToolEngineResult } from '@/types/tool';

export interface UuidOptions {
  version: 'v4' | 'v7';
  count: number;
  uppercase?: boolean;
  hyphens?: boolean;
  braces?: boolean;
}

// Generate RFC 9562 UUID v7 (Unix epoch ms + 74 random bits)
function generateUuidV7(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);

  const timestamp = Date.now();
  // 48-bit timestamp from Unix epoch milliseconds
  bytes[0] = Math.floor(timestamp / 0x10000000000) & 0xff;
  bytes[1] = Math.floor(timestamp / 0x100000000) & 0xff;
  bytes[2] = Math.floor(timestamp / 0x1000000) & 0xff;
  bytes[3] = Math.floor(timestamp / 0x10000) & 0xff;
  bytes[4] = Math.floor(timestamp / 0x100) & 0xff;
  bytes[5] = timestamp & 0xff;

  // version 7 (0b0111 in high 4 bits of byte 6)
  bytes[6] = (bytes[6] & 0x0f) | 0x70;
  // variant 1 (0b10 in high 2 bits of byte 8)
  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

// Generate RFC 4122 UUID v4
function generateUuidV4(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  bytes[6] = (bytes[6] & 0x0f) | 0x40; // version 4
  bytes[8] = (bytes[8] & 0x3f) | 0x80; // variant 1
  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

export function generateUuids(options: UuidOptions): ToolEngineResult<string[]> {
  const startTime = performance.now();
  const safeCount = Math.min(Math.max(options.count || 1, 1), 100);
  const list: string[] = [];

  for (let i = 0; i < safeCount; i++) {
    let raw = options.version === 'v7' ? generateUuidV7() : generateUuidV4();

    if (!options.hyphens) {
      raw = raw.replace(/-/g, '');
    }

    if (options.uppercase) {
      raw = raw.toUpperCase();
    } else {
      raw = raw.toLowerCase();
    }

    if (options.braces) {
      raw = `{${raw}}`;
    }

    list.push(raw);
  }

  const endTime = performance.now();
  return {
    success: true,
    data: list,
    metrics: {
      processingTimeMs: Math.round((endTime - startTime) * 100) / 100,
    },
  };
}
