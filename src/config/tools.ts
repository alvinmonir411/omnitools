import { ToolDefinition } from '@/types/tool';

export const TOOLS: ToolDefinition[] = [
  {
    id: 'json-formatter',
    slug: 'json-formatter',
    name: 'JSON Formatter & Validator',
    shortDescription:
      'Format, beautify, validate, and minify JSON data online. Pinpoint syntax errors with real-time client-side parsing.',
    category: 'developer',
    iconName: 'Code2',
    isFeatured: true,
    keywords: [
      'json formatter',
      'json validator',
      'beautify json',
      'minify json',
      'json parser',
      'json lint',
    ],
    schemaType: 'WebApplication',
    howToSteps: [
      {
        title: 'Paste or Load Your JSON',
        description: 'Paste your unformatted or minified JSON string into the input editor.',
      },
      {
        title: 'Choose Formatting Options',
        description: 'Select indentation (2 or 4 spaces) or toggle minification/alphabetical sorting.',
      },
      {
        title: 'Inspect & Copy Output',
        description:
          'View clean syntax-highlighted JSON or instant error diagnostics. Click Copy to save to clipboard.',
      },
    ],
    features: [
      {
        title: '100% Client-Side Privacy',
        description: 'Data never leaves your browser. Safe for confidential API payloads and tokens.',
      },
      {
        title: 'Precise Syntax Error Locator',
        description: 'Identifies the exact line, column, and token where JSON syntax is invalid.',
      },
      {
        title: 'Minification & Beautification',
        description: 'Switch between compact single-line JSON and readable multi-line formatting.',
      },
      {
        title: 'Key Sorting',
        description: 'Alphabetically sort JSON object keys for deterministic comparisons and diffs.',
      },
    ],
    technicalDetails:
      'Adheres to RFC 8259 specifications. Parsing is performed in-memory via JavaScript native engines with zero latency and zero network exposure.',
    faqs: [
      {
        question: 'Does this tool store or upload my JSON data?',
        answer:
          'No. All formatting, validation, and tree views execute 100% locally in your browser runtime. Nothing is uploaded to any server.',
      },
      {
        question: 'What is the maximum JSON file size supported?',
        answer:
          'Because parsing occurs in your browser memory, it comfortably processes payloads up to 25MB depending on your device specs.',
      },
      {
        question: 'Can this tool fix invalid JSON?',
        answer:
          'While standard JSON engines reject invalid syntax, OmniTools highlights the exact line and character error to help you fix missing quotes, commas, or trailing elements.',
      },
    ],
  },
  {
    id: 'base64-encode-decode',
    slug: 'base64-encode-decode',
    name: 'Base64 Encoder & Decoder',
    shortDescription:
      'Encode and decode strings and files to/from Base64 format instantly. Supports standard and URL-safe Base64 modes.',
    category: 'developer',
    iconName: 'Binary',
    isFeatured: true,
    keywords: [
      'base64 encode',
      'base64 decode',
      'base64 converter',
      'url safe base64',
      'base64 string',
    ],
    schemaType: 'WebApplication',
    howToSteps: [
      {
        title: 'Select Mode',
        description: 'Toggle between "Encode" or "Decode" mode using the mode selector tabs.',
      },
      {
        title: 'Enter Text or Upload File',
        description: 'Type or paste plain text, or drag and drop a small file.',
      },
      {
        title: 'Choose URL-Safe Encoding',
        description: 'Optionally toggle URL-safe encoding to replace + and / with - and _.',
      },
      {
        title: 'Copy Converted Output',
        description: 'Click "Copy Output" to immediately place the result onto your clipboard.',
      },
    ],
    features: [
      {
        title: 'Full UTF-8 Multibyte Support',
        description: 'Properly encodes international characters, emojis, and symbols without mangling bytes.',
      },
      {
        title: 'URL-Safe Base64 (RFC 4648 §5)',
        description: 'Compatible with JWT tokens and web query parameters without URL percent encoding.',
      },
      {
        title: 'Live Real-Time Conversion',
        description: 'Output updates instantaneously as you type.',
      },
    ],
    technicalDetails:
      'Implements RFC 4648 standard and URL-safe Base64 specification using browser TextEncoder and TextDecoder APIs.',
    faqs: [
      {
        question: 'What is the difference between standard and URL-safe Base64?',
        answer:
          'Standard Base64 uses "+" and "/" characters, which have special meanings in URLs. URL-safe Base64 replaces them with "-" and "_" and usually omits padding.',
      },
      {
        question: 'Can this decode JWT tokens?',
        answer:
          'Yes. JWT tokens consist of three Base64URL-encoded segments. You can paste the header or payload directly to inspect its JSON content.',
      },
    ],
  },
  {
    id: 'uuid-generator',
    slug: 'uuid-generator',
    name: 'UUID & GUID Generator',
    shortDescription:
      'Generate cryptographically secure Version 4 (random) and Version 7 (time-ordered) UUIDs in bulk.',
    category: 'developer',
    iconName: 'Fingerprint',
    isFeatured: false,
    keywords: ['uuid generator', 'guid generator', 'uuid v4', 'uuid v7', 'bulk uuid'],
    schemaType: 'WebApplication',
    howToSteps: [
      {
        title: 'Choose Version & Count',
        description: 'Select UUID v4 (Random) or v7 (Time-Ordered), and choose batch count (1 to 100).',
      },
      {
        title: 'Configure Formatting',
        description: 'Toggle uppercase/lowercase or hyphen separation.',
      },
      {
        title: 'Generate & Copy',
        description: 'Click "Generate New" or copy the batch directly to your clipboard.',
      },
    ],
    features: [
      {
        title: 'Cryptographically Secure',
        description: 'Generated using browser Web Crypto CSPRNG (crypto.getRandomValues).',
      },
      {
        title: 'Batch Generation',
        description: 'Instantly create up to 100 unique UUIDs at once with one click.',
      },
      {
        title: 'RFC 9562 v7 Support',
        description: 'Modern time-ordered UUIDs suitable for database primary keys.',
      },
    ],
    technicalDetails:
      'Conforms to RFC 4122 (v4) and RFC 9562 (v7). Employs crypto.randomUUID() and crypto.getRandomValues().',
    faqs: [
      {
        question: 'What is the probability of a UUID collision?',
        answer:
          'For UUID v4, you would need to generate over 1 billion UUIDs per second for 85 years to have a 50% chance of a single collision.',
      },
      {
        question: 'Why use UUID v7 over v4?',
        answer:
          'UUID v7 encodes a Unix millisecond timestamp in the high bits, making it sortable and significantly faster for B-Tree database indexing.',
      },
    ],
  },
  {
    id: 'hash-generator',
    slug: 'hash-generator',
    name: 'Cryptographic Hash Generator',
    shortDescription:
      'Generate secure MD5, SHA-1, SHA-256, and SHA-512 cryptographic checksums and message digests client-side.',
    category: 'developer',
    iconName: 'ShieldCheck',
    isFeatured: false,
    keywords: ['hash generator', 'sha256 generator', 'md5 generator', 'sha512', 'checksum'],
    schemaType: 'WebApplication',
    howToSteps: [
      {
        title: 'Input Text',
        description: 'Type or paste the input string you wish to hash.',
      },
      {
        title: 'Select Hash Algorithm',
        description: 'Choose SHA-256, SHA-512, SHA-1, or MD5.',
      },
      {
        title: 'Copy Hash Digest',
        description: 'Copy the hexadecimal hash digest or compare with an expected checksum.',
      },
    ],
    features: [
      {
        title: 'Native Web Crypto API',
        description: 'Harnesses hardware-accelerated browser cryptographic primitives.',
      },
      {
        title: 'Multi-Algorithm Overview',
        description: 'Computes SHA-256, SHA-512, and SHA-1 simultaneously in real time.',
      },
      {
        title: 'Zero Exposure',
        description: 'Hashes passwords, tokens, and verification strings with complete privacy.',
      },
    ],
    technicalDetails:
      'SHA family hashes are computed via standard browser SubtleCrypto.digest(). MD5 implemented in zero-dependency pure TypeScript.',
    faqs: [
      {
        question: 'Can a cryptographic hash be decrypted?',
        answer:
          'No. Cryptographic hashes are one-way mathematical functions. They cannot be reversed, only verified against known inputs.',
      },
      {
        question: 'Which hash algorithm is recommended for security?',
        answer:
          'SHA-256 and SHA-512 are modern industry standards. MD5 and SHA-1 should only be used for legacy checksums or non-security integrity checks.',
      },
    ],
  },
  {
    id: 'word-counter',
    slug: 'word-counter',
    name: 'Word, Character & Reading Time Counter',
    shortDescription:
      'Count words, characters, sentences, paragraphs, and estimate reading/speaking times in real time.',
    category: 'text',
    iconName: 'FileText',
    isFeatured: true,
    keywords: [
      'word counter',
      'character counter',
      'reading time calculator',
      'sentence counter',
      'text statistics',
    ],
    schemaType: 'WebApplication',
    howToSteps: [
      {
        title: 'Paste or Type Content',
        description: 'Input your article, essay, or social media caption into the text box.',
      },
      {
        title: 'View Instant Statistics',
        description: 'Statistics update dynamically as you type with zero delay.',
      },
      {
        title: 'Check Platform Limits',
        description: 'Inspect character benchmarks for Twitter/X, LinkedIn, Meta, and SEO meta tags.',
      },
    ],
    features: [
      {
        title: 'Comprehensive Text Metrics',
        description: 'Words, characters (with and without spaces), sentences, paragraphs, reading and speaking times.',
      },
      {
        title: 'Keyword Density Analyzer',
        description: 'Identifies the most frequent 1-word and 2-word phrases in your copy.',
      },
      {
        title: 'Social Media Limits',
        description: 'Visual progress bars showing status for X (280), LinkedIn (3,000), and Meta titles (60).',
      },
    ],
    technicalDetails:
      'Uses regex tokenization and Intl.Segmenter where available for Unicode-aware word boundary detection.',
    faqs: [
      {
        question: 'How is reading time calculated?',
        answer:
          'Reading time is based on the standard average adult reading speed of 200 words per minute (WPM). Speaking time is based on 130 WPM.',
      },
      {
        question: 'Are spaces included in the character count?',
        answer:
          'OmniTools displays both total characters including spaces and characters excluding spaces.',
      },
    ],
  },
  {
    id: 'case-converter',
    slug: 'case-converter',
    name: 'Text Case Converter',
    shortDescription:
      'Convert text between UPPERCASE, lowercase, Title Case, camelCase, snake_case, kebab-case, and PascalCase.',
    category: 'text',
    iconName: 'Type',
    isFeatured: false,
    keywords: [
      'case converter',
      'uppercase to lowercase',
      'title case generator',
      'camelcase converter',
      'snake case',
    ],
    schemaType: 'WebApplication',
    howToSteps: [
      {
        title: 'Enter Text',
        description: 'Paste your string, programming identifier, or headline.',
      },
      {
        title: 'Select Desired Case',
        description: 'Click any format button: UPPERCASE, lowercase, Title Case, camelCase, snake_case, kebab-case.',
      },
      {
        title: 'Copy or Replace',
        description: 'Copy the converted string with one click.',
      },
    ],
    features: [
      {
        title: '8+ Case Transformations',
        description: 'Covers prose formats (Sentence case, Title Case) and code identifiers (camelCase, snake_case, kebab-case, PascalCase, CONSTANT_CASE).',
      },
      {
        title: 'Smart Title Case',
        description: 'Capitalizes headlines correctly following Chicago Manual of Style guidelines.',
      },
    ],
    technicalDetails: 'Pure algorithmic string manipulation with regex word splitters.',
    faqs: [
      {
        question: 'Does Title Case lowercase minor words like "and" or "the"?',
        answer:
          'Yes, our Title Case algorithm preserves lowercase articles, prepositions, and conjunctions unless they begin the sentence.',
      },
    ],
  },
  {
    id: 'qr-code-generator',
    slug: 'qr-code-generator',
    name: 'Custom QR Code Generator',
    shortDescription:
      'Create high-resolution, custom QR codes for URLs, WiFi, emails, and text. Download in PNG or SVG vector format.',
    category: 'media',
    iconName: 'QrCode',
    isFeatured: true,
    keywords: [
      'qr code generator',
      'free qr code',
      'svg qr code',
      'custom qr code',
      'wifi qr code',
    ],
    schemaType: 'WebApplication',
    howToSteps: [
      {
        title: 'Enter Destination Content',
        description: 'Type a website URL, WiFi credentials, plain text, or email address.',
      },
      {
        title: 'Customize Design',
        description: 'Pick foreground and background colors and select error correction level.',
      },
      {
        title: 'Download Image',
        description: 'Download crisp raster PNG or scalable vector SVG for print and digital use.',
      },
    ],
    features: [
      {
        title: 'Custom Color Styling',
        description: 'Personalize with high-contrast brand colors.',
      },
      {
        title: 'Adjustable Error Correction',
        description: 'Levels L (7%), M (15%), Q (25%), and H (30%) for maximum scan reliability.',
      },
      {
        title: 'Vector SVG & PNG Export',
        description: 'Export infinite-resolution SVG for print banners or lightweight PNG for digital sharing.',
      },
    ],
    technicalDetails:
      'Generated entirely client-side using standard HTML5 Canvas and SVG DOM builders. Zero server tracking or dynamic redirect hops.',
    faqs: [
      {
        question: 'Do these QR codes ever expire?',
        answer:
          'No! These are static QR codes. They encode the destination directly into the pattern and will never expire.',
      },
      {
        question: 'Can I use these QR codes for commercial purposes?',
        answer:
          'Yes, generated QR codes are 100% free for both personal and commercial projects with zero attribution required.',
      },
    ],
  },
  {
    id: 'unix-timestamp-converter',
    slug: 'unix-timestamp-converter',
    name: 'Unix Timestamp & Epoch Converter',
    shortDescription:
      'Convert Unix timestamps (seconds and milliseconds) to human-readable dates in UTC and local timezones, and vice-versa.',
    category: 'productivity',
    iconName: 'Clock',
    isFeatured: false,
    keywords: [
      'unix timestamp converter',
      'epoch converter',
      'timestamp to date',
      'date to timestamp',
      'epoch time',
    ],
    schemaType: 'WebApplication',
    howToSteps: [
      {
        title: 'Enter Epoch or Date',
        description: 'Input a numeric timestamp or pick a date/time from the picker.',
      },
      {
        title: 'Select Unit',
        description: 'Specify whether your timestamp is in Seconds (10 digits) or Milliseconds (13 digits).',
      },
      {
        title: 'View Converted Times',
        description: 'Inspect instant representations in ISO 8601, UTC, RFC 2822, and your local timezone.',
      },
    ],
    features: [
      {
        title: 'Live Clock & Current Epoch',
        description: 'Displays a live updating current Unix timestamp with a one-click copy button.',
      },
      {
        title: 'Automatic Unit Detection',
        description: 'Automatically distinguishes between seconds, milliseconds, and microseconds.',
      },
      {
        title: 'Bidirectional Conversion',
        description: 'Convert from timestamp to date or from human date to Unix epoch.',
      },
    ],
    technicalDetails:
      'Computed using native JavaScript Date and Intl.DateTimeFormat with zero third-party date library overhead.',
    faqs: [
      {
        question: 'What is Unix Epoch time?',
        answer:
          'Unix Epoch is the number of seconds that have elapsed since January 1, 1970 00:00:00 UTC, not counting leap seconds.',
      },
      {
        question: 'What happens in the Year 2038 (Y2038 problem)?',
        answer:
          'Systems using 32-bit signed integers will overflow on January 19, 2038. OmniTools uses 64-bit JavaScript floating point numbers, safely computing dates well beyond 2038.',
      },
    ],
  },
];

export function getToolBySlug(slug: string): ToolDefinition | undefined {
  return TOOLS.find((tool) => tool.slug === slug);
}

export function getToolsByCategory(category: string): ToolDefinition[] {
  return TOOLS.filter((tool) => tool.category === category);
}

export function getFeaturedTools(): ToolDefinition[] {
  return TOOLS.filter((tool) => tool.isFeatured);
}
