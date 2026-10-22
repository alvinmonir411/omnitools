import { ToolEngineResult } from '@/types/tool';

export interface Base64Options {
  mode: 'encode' | 'decode';
  urlSafe?: boolean;
}

export function encodeBase64(input: string, urlSafe = false): ToolEngineResult<string> {
  const startTime = performance.now();
  if (!input) {
    return { success: true, data: '', metrics: { processingTimeMs: 0 } };
  }

  try {
    // Safe UTF-8 encoding using TextEncoder
    const bytes = new TextEncoder().encode(input);
    let binary = '';
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    let encoded = btoa(binary);

    if (urlSafe) {
      encoded = encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    }

    const endTime = performance.now();
    return {
      success: true,
      data: encoded,
      metrics: {
        processingTimeMs: Math.round((endTime - startTime) * 100) / 100,
        inputSize: bytes.byteLength,
        outputSize: encoded.length,
      },
    };
  } catch (err) {
    return {
      success: false,
      error: { message: (err as Error).message || 'Failed to encode text to Base64' },
    };
  }
}

export function decodeBase64(input: string, urlSafe = false): ToolEngineResult<string> {
  const startTime = performance.now();
  if (!input) {
    return { success: true, data: '', metrics: { processingTimeMs: 0 } };
  }

  try {
    let sanitized = input.trim();
    // Normalize URL safe characters to standard base64
    sanitized = sanitized.replace(/-/g, '+').replace(/_/g, '/');
    // Pad missing '=' if needed
    while (sanitized.length % 4 !== 0) {
      sanitized += '=';
    }

    const binary = atob(sanitized);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const decoded = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
    const endTime = performance.now();

    return {
      success: true,
      data: decoded,
      metrics: {
        processingTimeMs: Math.round((endTime - startTime) * 100) / 100,
        inputSize: input.length,
        outputSize: bytes.byteLength,
      },
    };
  } catch (err) {
    return {
      success: false,
      error: {
        message: 'Invalid Base64 payload. Please check for corrupted or non-base64 characters.',
      },
    };
  }
}
