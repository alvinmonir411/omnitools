import { describe, it, expect } from 'vitest';
import { analyzeText } from '@/lib/tools/word-counter/engine';
import { convertCase } from '@/lib/tools/case-converter/engine';
import { generateQrCode } from '@/lib/tools/qr-code-generator/engine';
import { convertTimestampToDate, convertDateToTimestamp } from '@/lib/tools/unix-timestamp-converter/engine';

describe('Batch 2 Tools Engine Suite', () => {
  describe('Word & Character Counter', () => {
    it('correctly counts words, characters, sentences, and paragraphs', () => {
      const text = 'Hello world! This is OmniTools.\n\nSecond paragraph here.';
      const res = analyzeText(text);
      expect(res.success).toBe(true);
      expect(res.data?.words).toBe(8);
      expect(res.data?.paragraphs).toBe(2);
      expect(res.data?.charactersWithoutSpaces).toBe(text.replace(/\s+/g, '').length);
    });

    it('calculates reading time', () => {
      // 200 words should be ~1.0 min
      const words = Array(200).fill('word').join(' ');
      const res = analyzeText(words);
      expect(res.data?.readingTimeMinutes).toBe(1);
    });
  });

  describe('Text Case Converter', () => {
    const input = 'hello_world test-case';

    it('converts to UPPERCASE and lowercase', () => {
      expect(convertCase(input, 'upper').data).toBe('HELLO_WORLD TEST-CASE');
      expect(convertCase(input, 'lower').data).toBe('hello_world test-case');
    });

    it('converts to camelCase', () => {
      expect(convertCase('user_profile_id', 'camel').data).toBe('userProfileId');
    });

    it('converts to snake_case and kebab-case', () => {
      expect(convertCase('UserProfileId', 'snake').data).toBe('user_profile_id');
      expect(convertCase('UserProfileId', 'kebab').data).toBe('user-profile-id');
    });

    it('converts to PascalCase and CONSTANT_CASE', () => {
      expect(convertCase('hello world', 'pascal').data).toBe('HelloWorld');
      expect(convertCase('hello world', 'constant').data).toBe('HELLO_WORLD');
    });

    it('converts to Title Case while respecting minor words', () => {
      expect(convertCase('the quick brown fox and the dog', 'title').data).toBe(
        'The Quick Brown Fox and the Dog',
      );
    });
  });

  describe('QR Code Generator', () => {
    it('generates PNG Data URL and SVG string', async () => {
      const res = await generateQrCode('https://omnitools.app');
      expect(res.success).toBe(true);
      expect(res.data?.pngDataUrl.startsWith('data:image/png;base64,')).toBe(true);
      expect(res.data?.svgString.startsWith('<svg')).toBe(true);
    });
  });

  describe('Unix Timestamp Converter', () => {
    it('converts timestamp in seconds to ISO and UTC representations', () => {
      // 1700000000 = Wed, 14 Nov 2023 22:13:20 GMT
      const res = convertTimestampToDate(1700000000);
      expect(res.success).toBe(true);
      expect(res.data?.epochSeconds).toBe(1700000000);
      expect(res.data?.iso8601).toBe('2023-11-14T22:13:20.000Z');
      expect(res.data?.utcString).toBe('Tue, 14 Nov 2023 22:13:20 GMT');
    });

    it('auto-detects milliseconds vs seconds', () => {
      const res = convertTimestampToDate(1700000000000);
      expect(res.success).toBe(true);
      expect(res.data?.epochSeconds).toBe(1700000000);
    });

    it('converts date string to timestamp', () => {
      const res = convertDateToTimestamp('2023-11-14T22:13:20.000Z');
      expect(res.success).toBe(true);
      expect(res.data?.epochSeconds).toBe(1700000000);
    });
  });
});
