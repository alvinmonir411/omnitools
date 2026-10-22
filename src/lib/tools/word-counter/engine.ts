import { ToolEngineResult } from '@/types/tool';

export interface TextMetrics {
  words: number;
  charactersWithSpaces: number;
  charactersWithoutSpaces: number;
  sentences: number;
  paragraphs: number;
  readingTimeMinutes: number;
  speakingTimeMinutes: number;
  keywordDensity: { word: string; count: number; percentage: number }[];
  platformLimits: {
    twitter: { current: number; max: number; percentage: number };
    linkedin: { current: number; max: number; percentage: number };
    metaTitle: { current: number; max: number; percentage: number };
  };
}

export function analyzeText(input: string): ToolEngineResult<TextMetrics> {
  const startTime = performance.now();
  if (!input || !input.trim()) {
    return {
      success: true,
      data: {
        words: 0,
        charactersWithSpaces: 0,
        charactersWithoutSpaces: 0,
        sentences: 0,
        paragraphs: 0,
        readingTimeMinutes: 0,
        speakingTimeMinutes: 0,
        keywordDensity: [],
        platformLimits: {
          twitter: { current: 0, max: 280, percentage: 0 },
          linkedin: { current: 0, max: 3000, percentage: 0 },
          metaTitle: { current: 0, max: 60, percentage: 0 },
        },
      },
      metrics: { processingTimeMs: 0 },
    };
  }

  const charactersWithSpaces = input.length;
  const charactersWithoutSpaces = input.replace(/\s+/g, '').length;

  // Words regex splitting on whitespace while filtering out pure punctuation
  const wordsArray = input
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0 && !/^[^a-zA-Z0-9]+$/.test(w));
  const words = wordsArray.length;

  // Sentences count: matches text ending in . ! ? or end of string
  const sentences = (input.match(/[^.!?]+[.!?]+(\s|$)/g) || []).length || (words > 0 ? 1 : 0);

  // Paragraphs count: consecutive non-empty lines
  const paragraphs = input
    .split(/\n+/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0).length;

  // 200 WPM reading, 130 WPM speaking
  const readingTimeMinutes = Math.max(Math.ceil((words / 200) * 10) / 10, 0.1);
  const speakingTimeMinutes = Math.max(Math.ceil((words / 130) * 10) / 10, 0.1);

  // Keyword density (filtering common stop words)
  const stopWords = new Set([
    'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i', 'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at', 'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she', 'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what', 'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me', 'is', 'are', 'was', 'were'
  ]);

  const wordCounts: Record<string, number> = {};
  for (const rawWord of wordsArray) {
    const cleaned = rawWord.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
    if (cleaned.length > 2 && !stopWords.has(cleaned)) {
      wordCounts[cleaned] = (wordCounts[cleaned] || 0) + 1;
    }
  }

  const keywordDensity = Object.entries(wordCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([word, count]) => ({
      word,
      count,
      percentage: Math.round((count / Math.max(words, 1)) * 1000) / 10,
    }));

  const twitterChars = charactersWithSpaces;
  const endTime = performance.now();

  return {
    success: true,
    data: {
      words,
      charactersWithSpaces,
      charactersWithoutSpaces,
      sentences,
      paragraphs,
      readingTimeMinutes,
      speakingTimeMinutes,
      keywordDensity,
      platformLimits: {
        twitter: {
          current: twitterChars,
          max: 280,
          percentage: Math.min(Math.round((twitterChars / 280) * 100), 100),
        },
        linkedin: {
          current: charactersWithSpaces,
          max: 3000,
          percentage: Math.min(Math.round((charactersWithSpaces / 3000) * 100), 100),
        },
        metaTitle: {
          current: charactersWithSpaces,
          max: 60,
          percentage: Math.min(Math.round((charactersWithSpaces / 60) * 100), 100),
        },
      },
    },
    metrics: {
      processingTimeMs: Math.round((endTime - startTime) * 100) / 100,
    },
  };
}
