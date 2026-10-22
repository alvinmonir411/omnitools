import { ToolEngineResult } from '@/types/tool';

export type CaseType =
  | 'upper'
  | 'lower'
  | 'title'
  | 'sentence'
  | 'camel'
  | 'snake'
  | 'kebab'
  | 'pascal'
  | 'constant';

// Extract words cleanly from any input (camelCase, snake_case, spaces, hyphens)
function extractWords(input: string): string[] {
  return input
    .replace(/([a-z])([A-Z])/g, '$1 $2') // split camelCase
    .replace(/[_-]+/g, ' ')               // convert _ and - to spaces
    .split(/\s+/)
    .map((w) => w.trim())
    .filter((w) => w.length > 0);
}

export function convertCase(input: string, targetCase: CaseType): ToolEngineResult<string> {
  const startTime = performance.now();
  if (!input || !input.trim()) {
    return { success: true, data: '', metrics: { processingTimeMs: 0 } };
  }

  let result = '';

  switch (targetCase) {
    case 'upper':
      result = input.toUpperCase();
      break;

    case 'lower':
      result = input.toLowerCase();
      break;

    case 'sentence':
      result = input
        .toLowerCase()
        .replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
      break;

    case 'title': {
      const minorWords = new Set([
        'and', 'as', 'but', 'for', 'if', 'nor', 'or', 'so', 'yet', 'a', 'an', 'the', 'at', 'by', 'for', 'in', 'of', 'off', 'on', 'per', 'to', 'up', 'via'
      ]);
      const words = input.toLowerCase().split(/\s+/);
      result = words
        .map((word, idx) => {
          if (idx === 0 || idx === words.length - 1 || !minorWords.has(word)) {
            return word.charAt(0).toUpperCase() + word.slice(1);
          }
          return word;
        })
        .join(' ');
      break;
    }

    case 'camel': {
      const words = extractWords(input);
      result = words
        .map((w, idx) => {
          const lower = w.toLowerCase();
          return idx === 0 ? lower : lower.charAt(0).toUpperCase() + lower.slice(1);
        })
        .join('');
      break;
    }

    case 'pascal': {
      const words = extractWords(input);
      result = words
        .map((w) => {
          const lower = w.toLowerCase();
          return lower.charAt(0).toUpperCase() + lower.slice(1);
        })
        .join('');
      break;
    }

    case 'snake': {
      const words = extractWords(input);
      result = words.map((w) => w.toLowerCase()).join('_');
      break;
    }

    case 'kebab': {
      const words = extractWords(input);
      result = words.map((w) => w.toLowerCase()).join('-');
      break;
    }

    case 'constant': {
      const words = extractWords(input);
      result = words.map((w) => w.toUpperCase()).join('_');
      break;
    }

    default:
      result = input;
  }

  const endTime = performance.now();
  return {
    success: true,
    data: result,
    metrics: { processingTimeMs: Math.round((endTime - startTime) * 100) / 100 },
  };
}
