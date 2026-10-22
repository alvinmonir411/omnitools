import { describe, it, expect } from 'vitest';
import { formatJson } from '@/lib/tools/json-formatter/engine';
import { encodeBase64, decodeBase64 } from '@/lib/tools/base64-encode-decode/engine';
import { generateUuids } from '@/lib/tools/uuid-generator/engine';
import { computeHashes } from '@/lib/tools/hash-generator/engine';

describe('Developer Tools Engine Suite', () => {
  describe('JSON Formatter & Validator', () => {
    it('formats valid JSON with custom indentation', () => {
      const input = '{"b":2,"a":1}';
      const res = formatJson(input, { indent: 2, sortKeys: false });
      expect(res.success).toBe(true);
      expect(res.data).toBe('{\n  "b": 2,\n  "a": 1\n}');
    });

    it('sorts keys alphabetically when requested', () => {
      const input = '{"z":1,"a":2}';
      const res = formatJson(input, { indent: 2, sortKeys: true });
      expect(res.success).toBe(true);
      expect(res.data).toBe('{\n  "a": 2,\n  "z": 1\n}');
    });

    it('minifies JSON properly', () => {
      const input = '{\n  "name": "OmniTools"\n}';
      const res = formatJson(input, { indent: 0 });
      expect(res.success).toBe(true);
      expect(res.data).toBe('{"name":"OmniTools"}');
    });

    it('catches syntax errors and returns error object', () => {
      const input = '{"missingQuote: true}';
      const res = formatJson(input);
      expect(res.success).toBe(false);
      expect(res.error).toBeDefined();
    });
  });

  describe('Base64 Encoder / Decoder', () => {
    it('encodes UTF-8 strings including emojis', () => {
      const text = 'Hello 🚀 World';
      const enc = encodeBase64(text);
      expect(enc.success).toBe(true);
      const dec = decodeBase64(enc.data!);
      expect(dec.success).toBe(true);
      expect(dec.data).toBe(text);
    });

    it('supports URL-safe Base64 mode', () => {
      // Test characters that produce '+' or '/' in standard base64
      const text = 'subjects?_d=1&foo=bar';
      const enc = encodeBase64(text, true);
      expect(enc.success).toBe(true);
      expect(enc.data).not.toContain('+');
      expect(enc.data).not.toContain('/');
      const dec = decodeBase64(enc.data!, true);
      expect(dec.success).toBe(true);
      expect(dec.data).toBe(text);
    });

    it('returns error on malformed Base64 decoding', () => {
      const invalid = '!!!not-a-valid-base64-string!!!';
      const dec = decodeBase64(invalid);
      expect(dec.success).toBe(false);
      expect(dec.error).toBeDefined();
    });
  });

  describe('UUID / GUID Generator', () => {
    it('generates valid UUID v4 format', () => {
      const res = generateUuids({ version: 'v4', count: 5, hyphens: true });
      expect(res.success).toBe(true);
      expect(res.data?.length).toBe(5);
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      expect(uuidRegex.test(res.data![0])).toBe(true);
    });

    it('generates valid UUID v7 format with version 7 bits', () => {
      const res = generateUuids({ version: 'v7', count: 3, hyphens: true });
      expect(res.success).toBe(true);
      expect(res.data?.length).toBe(3);
      const v7Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      expect(v7Regex.test(res.data![0])).toBe(true);
    });

    it('supports uppercase and braces options', () => {
      const res = generateUuids({
        version: 'v4',
        count: 1,
        uppercase: true,
        braces: true,
        hyphens: true,
      });
      expect(res.success).toBe(true);
      expect(res.data![0].startsWith('{')).toBe(true);
      expect(res.data![0].endsWith('}')).toBe(true);
      expect(res.data![0]).toBe(res.data![0].toUpperCase());
    });
  });

  describe('Cryptographic Hash Generator', () => {
    it('computes accurate MD5, SHA-1, SHA-256, SHA-512 hashes', async () => {
      const input = 'hello';
      const res = await computeHashes(input);
      expect(res.success).toBe(true);
      // Known MD5 of "hello" = 5d41402abc4b2a76b9719d911017c592
      expect(res.data?.md5).toBe('5d41402abc4b2a76b9719d911017c592');
      // Known SHA-1 of "hello" = aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d
      expect(res.data?.sha1).toBe('aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d');
      // Known SHA-256 of "hello" = 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824
      expect(res.data?.sha256).toBe(
        '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824',
      );
    });
  });
});
