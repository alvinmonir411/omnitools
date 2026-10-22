export type ToolCategory = 'developer' | 'text' | 'media' | 'productivity';

export interface ToolMetadata {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  category: ToolCategory;
  iconName: string;
  isFeatured?: boolean;
  keywords: string[];
  schemaType: 'WebApplication' | 'SoftwareApplication';
}

export interface ToolFaqItem {
  question: string;
  answer: string;
}

export interface ToolGuideStep {
  title: string;
  description: string;
}

export interface ToolFeature {
  title: string;
  description: string;
}

export interface ToolDefinition extends ToolMetadata {
  howToSteps: ToolGuideStep[];
  features: ToolFeature[];
  technicalDetails: string;
  faqs: ToolFaqItem[];
}

export interface ToolEngineResult<T> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    line?: number;
    column?: number;
  };
  metrics?: {
    processingTimeMs: number;
    inputSize?: number;
    outputSize?: number;
  };
}
