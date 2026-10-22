import QRCode from 'qrcode';
import { ToolEngineResult } from '@/types/tool';

export interface QrCodeOptions {
  errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H';
  width?: number;
  margin?: number;
  colorDark?: string;
  colorLight?: string;
}

export interface QrCodeOutput {
  pngDataUrl: string;
  svgString: string;
}

export async function generateQrCode(
  text: string,
  options: QrCodeOptions = {},
): Promise<ToolEngineResult<QrCodeOutput>> {
  const startTime = performance.now();
  if (!text || !text.trim()) {
    return {
      success: true,
      data: { pngDataUrl: '', svgString: '' },
      metrics: { processingTimeMs: 0 },
    };
  }

  const ecLevel = options.errorCorrectionLevel || 'M';
  const width = options.width || 320;
  const margin = options.margin !== undefined ? options.margin : 2;
  const colorDark = options.colorDark || '#000000';
  const colorLight = options.colorLight || '#ffffff';

  try {
    const [pngDataUrl, svgString] = await Promise.all([
      QRCode.toDataURL(text, {
        errorCorrectionLevel: ecLevel,
        width,
        margin,
        color: { dark: colorDark, light: colorLight },
      }),
      QRCode.toString(text, {
        type: 'svg',
        errorCorrectionLevel: ecLevel,
        width,
        margin,
        color: { dark: colorDark, light: colorLight },
      }),
    ]);

    const endTime = performance.now();
    return {
      success: true,
      data: { pngDataUrl, svgString },
      metrics: {
        processingTimeMs: Math.round((endTime - startTime) * 100) / 100,
        inputSize: text.length,
      },
    };
  } catch (err) {
    return {
      success: false,
      error: { message: (err as Error).message || 'Failed to generate QR code' },
    };
  }
}
