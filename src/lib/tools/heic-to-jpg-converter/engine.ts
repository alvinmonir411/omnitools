import { ToolEngineResult } from '@/types/tool';

export interface HeicConversionOptions {
  format: 'image/jpeg' | 'image/png';
  quality: number; // 0.1 to 1.0
}

export interface HeicConversionResult {
  dataUrl: string;
  blob: Blob;
  originalSize: number;
  convertedSize: number;
  format: string;
}

export async function convertHeicImage(
  file: File | Blob,
  options: HeicConversionOptions = { format: 'image/jpeg', quality: 0.85 },
): Promise<ToolEngineResult<HeicConversionResult>> {
  const startTime = performance.now();

  try {
    // Dynamically import heic2any for client-side processing
    const heic2anyModule = await import('heic2any');
    const heic2any = heic2anyModule.default || heic2anyModule;

    const conversionResult = await heic2any({
      blob: file,
      toType: options.format,
      quality: options.quality,
    });

    const resultBlob = Array.isArray(conversionResult) ? conversionResult[0] : conversionResult;
    const dataUrl = URL.createObjectURL(resultBlob);

    const endTime = performance.now();
    return {
      success: true,
      data: {
        dataUrl,
        blob: resultBlob,
        originalSize: file.size,
        convertedSize: resultBlob.size,
        format: options.format === 'image/jpeg' ? 'JPG' : 'PNG',
      },
      metrics: {
        processingTimeMs: Math.round((endTime - startTime) * 100) / 100,
        inputSize: file.size,
        outputSize: resultBlob.size,
      },
    };
  } catch (err) {
    return {
      success: false,
      error: {
        message:
          (err as Error).message ||
          'Failed to convert HEIC image. Please verify the file is a valid .heic or .heif file.',
      },
    };
  }
}
