import { ToolEngineResult } from '@/types/tool';

export interface JsonFormatterOptions {
  indent: 2 | 4 | 'tab' | 0; // 0 for minify
  sortKeys?: boolean;
}

function sortJsonKeys(obj: unknown): unknown {
  if (Array.isArray(obj)) {
    return obj.map(sortJsonKeys);
  } else if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj as Record<string, unknown>)
      .sort()
      .reduce((result: Record<string, unknown>, key: string) => {
        result[key] = sortJsonKeys((obj as Record<string, unknown>)[key]);
        return result;
      }, {});
  }
  return obj;
}

export function formatJson(
  input: string,
  options: JsonFormatterOptions = { indent: 2, sortKeys: false },
): ToolEngineResult<string> {
  const startTime = performance.now();
  if (!input || !input.trim()) {
    return {
      success: true,
      data: '',
      metrics: {
        processingTimeMs: 0,
        inputSize: 0,
        outputSize: 0,
      },
    };
  }

  try {
    let parsed = JSON.parse(input);
    if (options.sortKeys) {
      parsed = sortJsonKeys(parsed);
    }

    const indentValue =
      options.indent === 0 ? undefined : options.indent === 'tab' ? '\t' : options.indent;
    const formatted = JSON.stringify(parsed, null, indentValue);
    const endTime = performance.now();

    return {
      success: true,
      data: formatted,
      metrics: {
        processingTimeMs: Math.round((endTime - startTime) * 100) / 100,
        inputSize: new Blob([input]).size,
        outputSize: new Blob([formatted]).size,
      },
    };
  } catch (err) {
    const error = err as Error;
    let line: number | undefined;
    let column: number | undefined;

    // Extract line/column from common V8 error messages, e.g. "at position 14" or "line 2 column 5"
    const posMatch = error.message.match(/position (\d+)/i);
    if (posMatch && posMatch[1]) {
      const position = parseInt(posMatch[1], 10);
      const textUpToError = input.substring(0, position);
      const lines = textUpToError.split('\n');
      line = lines.length;
      column = lines[lines.length - 1].length + 1;
    }

    const lineColMatch = error.message.match(/line (\d+) column (\d+)/i);
    if (lineColMatch) {
      line = parseInt(lineColMatch[1], 10);
      column = parseInt(lineColMatch[2], 10);
    }

    return {
      success: false,
      error: {
        message: error.message,
        line,
        column,
      },
    };
  }
}
