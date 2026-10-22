import { ToolDefinition } from '@/types/tool';

export const TOOLS: ToolDefinition[] = [
  // --- High-Converting US/UK Niche Growth Drivers ---
  {
    id: 'etsy-fee-calculator',
    slug: 'etsy-fee-calculator',
    name: 'Etsy Fee & Profit Margin Calculator',
    shortDescription:
      'Calculate exact Etsy seller fees, listing costs, transaction fees, payment processing, and net profit margins instantly.',
    category: 'productivity',
    iconName: 'ShoppingBag',
    isFeatured: true,
    keywords: [
      'etsy fee calculator',
      'etsy profit calculator',
      'etsy seller fees',
      'etsy pricing calculator',
      'etsy offsite ads fee',
    ],
    schemaType: 'WebApplication',
    howToSteps: [
      {
        title: 'Enter Item Pricing',
        description: 'Input your item sale price and the shipping amount charged to the buyer.',
      },
      {
        title: 'Input Your Costs',
        description: 'Include your materials cost, actual shipping postage, and packaging expenses.',
      },
      {
        title: 'Select Market & Offsite Ads',
        description: 'Choose your shop country (US, UK, CA, AU) and toggle 0%, 12%, or 15% offsite ads.',
      },
      {
        title: 'Review Net Profit & Break-Even',
        description: 'Inspect itemized fees, profit margin percentage, and minimum break-even price.',
      },
    ],
    features: [
      {
        title: 'Accurate 2026 Etsy Fee Schedules',
        description: 'Includes the $0.20 listing fee, 6.5% transaction fee, and country payment rates.',
      },
      {
        title: 'Offsite Ads & Regulatory Fees',
        description: 'Accurately calculates 12% and 15% offsite ad fees and UK/EU operating fees.',
      },
      {
        title: 'Instant Break-Even Pricing',
        description: 'Computes the absolute minimum sale price needed to avoid losing money.',
      },
      {
        title: 'Shareable Calculation Links',
        description: 'Save and share fee breakdown snapshots with partners or suppliers.',
      },
    ],
    technicalDetails:
      'Computes fees according to official Etsy Merchant Agreements. Supports US ($0.25 + 3%), UK (£0.20 + 4% + 0.32% regulatory), Canada, and Australia fee schedules.',
    faqs: [
      {
        question: 'What percentage does Etsy take in total?',
        answer:
          'On average in the US, Etsy takes between 9.5% and 12% of total revenue (including item price and shipping) without offsite ads, or up to 25% with offsite ads.',
      },
      {
        question: 'Does Etsy charge fees on shipping?',
        answer:
          'Yes. Etsy charges the 6.5% transaction fee and payment processing fee on both the item price AND the shipping amount charged to the buyer.',
      },
      {
        question: 'How do I avoid Etsy offsite ads fees?',
        answer:
          'Shops with under $10,000 USD in 12-month sales can opt out of Offsite Ads in their shop dashboard settings.',
      },
    ],
  },
  {
    id: 'us-1099-tax-calculator',
    slug: 'us-1099-tax-calculator',
    name: 'US 1099 Self-Employed Tax Calculator',
    shortDescription:
      'Estimate quarterly payments, self-employment tax (15.3%), federal brackets, and state tax for freelancers and contractors.',
    category: 'productivity',
    iconName: 'Calculator',
    isFeatured: true,
    keywords: [
      '1099 tax calculator',
      'self employment tax calculator',
      'quarterly estimated tax calculator',
      'freelance tax calculator',
      'contractor taxes',
    ],
    schemaType: 'WebApplication',
    howToSteps: [
      {
        title: 'Enter Annual 1099 Revenue',
        description: 'Type your gross annual earnings from 1099-NEC, 1099-K, or client invoices.',
      },
      {
        title: 'Deduct Business Expenses',
        description: 'Subtract equipment, software, travel mileage, advertising, and home office costs.',
      },
      {
        title: 'Select Filing Status & State',
        description: 'Choose single, married joint, or head of household, and select your US state.',
      },
      {
        title: 'View Quarterly Payment Schedule',
        description: 'See your exact recommended quarterly estimated tax payment for Q1 through Q4.',
      },
    ],
    features: [
      {
        title: 'Full 15.3% Self-Employment Tax',
        description: 'Calculates 12.4% Social Security (with annual wage caps) and 2.9% Medicare tax.',
      },
      {
        title: '20% QBI Deduction Calculation',
        description: 'Applies the Section 199A Qualified Business Income 20% write-off for sole proprietors.',
      },
      {
        title: 'State Income Tax Estimates',
        description: 'Supports zero-tax states (Texas, Florida, Washington, Nevada) and high-tax states.',
      },
      {
        title: 'Quarterly Deadlines Calendar',
        description: 'Breaks down quarterly payment obligations due April 15, June 15, Sept 15, and Jan 15.',
      },
    ],
    technicalDetails:
      'Implements Schedule C, Schedule SE (92.35% base rule), and IRS Form 1040-ES formulas with standard deduction offsets.',
    faqs: [
      {
        question: 'Who needs to pay 1099 quarterly estimated taxes?',
        answer:
          'In general, anyone who expects to owe $1,000 or more in federal taxes when filing their return must make quarterly estimated tax payments to avoid IRS penalties.',
      },
      {
        question: 'What is the Self-Employment (SE) tax rate?',
        answer:
          'The self-employment tax rate is 15.3%: 12.4% for Social Security and 2.9% for Medicare. You can deduct half of your SE tax from your adjusted gross income.',
      },
    ],
  },
  {
    id: 'heic-to-jpg-converter',
    slug: 'heic-to-jpg-converter',
    name: 'HEIC to JPG / PNG Converter',
    shortDescription:
      'Convert Apple iPhone HEIC and HEIF photos to high-quality JPG or PNG images directly in your browser with zero server uploads.',
    category: 'media',
    iconName: 'Image',
    isFeatured: true,
    keywords: [
      'heic to jpg',
      'heic to png',
      'convert iphone photos',
      'heic converter online',
      'free heic to jpg',
    ],
    schemaType: 'WebApplication',
    howToSteps: [
      {
        title: 'Drop Your HEIC Photo',
        description: 'Drag and drop an iPhone .heic or .heif image into the upload box.',
      },
      {
        title: 'Select Output & Quality',
        description: 'Choose between JPEG or PNG format and adjust the image compression slider.',
      },
      {
        title: 'Instant In-Browser Conversion',
        description: 'Watch your photo decode in seconds with side-by-side file size savings.',
      },
      {
        title: 'Download Converted Image',
        description: 'Save the universally compatible JPG/PNG directly to your device.',
      },
    ],
    features: [
      {
        title: '100% Client-Side Processing',
        description: 'Your personal photos and metadata are NEVER uploaded to any external server.',
      },
      {
        title: 'JPG & PNG Export Formats',
        description: 'Switch between lightweight compressed JPEG and lossless PNG formats.',
      },
      {
        title: 'Quality & Compression Sliders',
        description: 'Fine-tune image quality from 50% to 100% to balance file size and sharpness.',
      },
      {
        title: 'High File Size Support',
        description: 'Comfortably handles large 48MP iPhone camera RAW and HEIC files up to 35MB.',
      },
    ],
    technicalDetails:
      'Utilizes client-side WebAssembly and JavaScript image decoders. Decoded frames are rendered onto an HTML5 canvas and re-encoded to JPEG/PNG in local memory.',
    faqs: [
      {
        question: 'Why does my iPhone take photos in HEIC format?',
        answer:
          'Apple uses HEIC (High Efficiency Image Container) because it provides better image quality at half the file size of standard JPEG. However, many Windows PCs and websites cannot open HEIC files without conversion.',
      },
      {
        question: 'Are my personal photos uploaded to your server?',
        answer:
          'No! All decoding and conversion happen 100% inside your browser. No files are transmitted across the internet.',
      },
    ],
  },
  {
    id: 'tiktok-hook-generator',
    slug: 'tiktok-hook-generator',
    name: 'TikTok & Reels Viral Hook Generator',
    shortDescription:
      'Generate high-retention 3-second video hooks and director scripts for TikTok, Instagram Reels, and YouTube Shorts.',
    category: 'text',
    iconName: 'Flame',
    isFeatured: true,
    keywords: [
      'tiktok hook generator',
      'viral video hooks',
      'reels script generator',
      'youtube shorts hooks',
      'video retention hooks',
    ],
    schemaType: 'WebApplication',
    howToSteps: [
      {
        title: 'Select Your Creator Niche',
        description: 'Choose from Tech & AI, Money & Finance, E-Com & Business, Fitness, Beauty, or Lifestyle.',
      },
      {
        title: 'Enter Topic Keyword',
        description: 'Optionally provide your video topic or product name to personalize the script.',
      },
      {
        title: 'Review Hook Scripts',
        description: 'Inspect proven 3-second hook lines paired with visual actions and audio suggestions.',
      },
      {
        title: 'Copy & Record',
        description: 'Copy individual hooks or the entire script library to film your next viral video.',
      },
    ],
    features: [
      {
        title: '5 Psychological Hook Frameworks',
        description: 'Generates Curiosity Gaps, Warning Angles, Secret/Hack reveals, Storytimes, and Urgency hooks.',
      },
      {
        title: 'Director Visual & Audio Cues',
        description: 'Includes camera direction (zooms, text overlays) and trending audio style tips.',
      },
      {
        title: 'Built for 3-Second Retention',
        description: 'Engineered specifically to defeat short-form algorithm swipe-away rates.',
      },
    ],
    technicalDetails:
      'Trained on analysis of top-performing short-form video hooks across TikTok and Instagram Reels with verified retention curves.',
    faqs: [
      {
        question: 'Why are the first 3 seconds of a video so important?',
        answer:
          'Algorithms on TikTok, Reels, and Shorts measure the percentage of viewers who watch past the 3-second mark. If viewers swipe away before 3 seconds, the algorithm stops distributing your video.',
      },
    ],
  },

  // --- Foundational Developer & Utility Stack ---
  {
    id: 'json-formatter',
    slug: 'json-formatter',
    name: 'JSON Formatter & Validator',
    shortDescription:
      'Format, beautify, validate, and minify JSON data online. Pinpoint syntax errors with real-time client-side parsing.',
    category: 'developer',
    iconName: 'Code2',
    isFeatured: false,
    keywords: ['json formatter', 'json validator', 'beautify json', 'minify json', 'json lint'],
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
        description: 'View clean syntax-highlighted JSON or instant error diagnostics.',
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
    ],
    technicalDetails: 'Adheres to RFC 8259 specifications. Parsing is performed in-memory via JavaScript native engines.',
    faqs: [
      {
        question: 'Does this tool store or upload my JSON data?',
        answer: 'No. All formatting, validation, and tree views execute 100% locally in your browser runtime.',
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
    isFeatured: false,
    keywords: ['base64 encode', 'base64 decode', 'base64 converter', 'url safe base64'],
    schemaType: 'WebApplication',
    howToSteps: [
      { title: 'Select Mode', description: 'Toggle between "Encode" or "Decode" mode.' },
      { title: 'Enter Text or Upload File', description: 'Type or paste plain text, or drag and drop a small file.' },
      { title: 'Copy Converted Output', description: 'Click "Copy Output" to immediately save to clipboard.' },
    ],
    features: [
      { title: 'Full UTF-8 Multibyte Support', description: 'Encodes international characters and emojis safely.' },
      { title: 'URL-Safe Base64 (RFC 4648 §5)', description: 'Compatible with JWT tokens and web query parameters.' },
    ],
    technicalDetails: 'Implements RFC 4648 standard using browser TextEncoder and TextDecoder APIs.',
    faqs: [
      {
        question: 'Can this decode JWT tokens?',
        answer: 'Yes. JWT tokens consist of three Base64URL-encoded segments.',
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
      { title: 'Choose Version & Count', description: 'Select UUID v4 or v7 and batch quantity (1 to 100).' },
      { title: 'Generate & Copy', description: 'Click "Generate New" or copy the batch directly.' },
    ],
    features: [
      { title: 'Cryptographically Secure', description: 'Generated using browser Web Crypto CSPRNG.' },
      { title: 'RFC 9562 v7 Support', description: 'Modern time-ordered UUIDs suitable for database primary keys.' },
    ],
    technicalDetails: 'Conforms to RFC 4122 (v4) and RFC 9562 (v7).',
    faqs: [
      {
        question: 'Why use UUID v7 over v4?',
        answer: 'UUID v7 encodes a Unix millisecond timestamp in the high bits, making it sortable for database indexes.',
      },
    ],
  },
  {
    id: 'hash-generator',
    slug: 'hash-generator',
    name: 'Cryptographic Hash Generator',
    shortDescription:
      'Generate secure MD5, SHA-1, SHA-256, and SHA-512 cryptographic checksums client-side.',
    category: 'developer',
    iconName: 'ShieldCheck',
    isFeatured: false,
    keywords: ['hash generator', 'sha256 generator', 'md5 generator', 'sha512', 'checksum'],
    schemaType: 'WebApplication',
    howToSteps: [
      { title: 'Input Text', description: 'Type or paste the input string you wish to hash.' },
      { title: 'Copy Hash Digest', description: 'Copy the hexadecimal hash digest or verify against a checksum.' },
    ],
    features: [
      { title: 'Native Web Crypto API', description: 'Harnesses hardware-accelerated browser cryptographic primitives.' },
      { title: 'Zero Exposure', description: 'Hashes passwords and tokens with complete privacy.' },
    ],
    technicalDetails: 'SHA hashes computed via SubtleCrypto.digest(). MD5 implemented in zero-dependency TypeScript.',
    faqs: [
      {
        question: 'Can a cryptographic hash be decrypted?',
        answer: 'No. Hashes are one-way mathematical functions and cannot be reversed.',
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
    isFeatured: false,
    keywords: ['word counter', 'character counter', 'reading time calculator', 'sentence counter'],
    schemaType: 'WebApplication',
    howToSteps: [
      { title: 'Paste Content', description: 'Input your article or caption into the text box.' },
      { title: 'View Instant Statistics', description: 'Inspect words, characters, and reading time.' },
    ],
    features: [
      { title: 'Keyword Density', description: 'Identifies the most frequent phrases in your copy.' },
      { title: 'Social Media Benchmarks', description: 'Progress bars for Twitter/X (280) and LinkedIn limits.' },
    ],
    technicalDetails: 'Uses regex tokenization and standard reading velocity formulas (200 WPM).',
    faqs: [
      {
        question: 'How is reading time calculated?',
        answer: 'Based on the average adult reading speed of 200 words per minute (WPM).',
      },
    ],
  },
  {
    id: 'case-converter',
    slug: 'case-converter',
    name: 'Text Case Converter',
    shortDescription:
      'Convert text between UPPERCASE, lowercase, Title Case, camelCase, snake_case, and kebab-case.',
    category: 'text',
    iconName: 'Type',
    isFeatured: false,
    keywords: ['case converter', 'uppercase to lowercase', 'title case generator', 'camelcase'],
    schemaType: 'WebApplication',
    howToSteps: [
      { title: 'Enter Text', description: 'Paste your string or headline.' },
      { title: 'Select Case', description: 'Click any format button to convert instantly.' },
    ],
    features: [
      { title: '8+ Case Transformations', description: 'Covers prose formats and code identifiers.' },
      { title: 'Smart Title Case', description: 'Follows Chicago Manual of Style guidelines.' },
    ],
    technicalDetails: 'Pure algorithmic string manipulation with regex word splitters.',
    faqs: [
      {
        question: 'Does Title Case keep "and" lowercase?',
        answer: 'Yes, minor articles and prepositions are preserved in lowercase.',
      },
    ],
  },
  {
    id: 'qr-code-generator',
    slug: 'qr-code-generator',
    name: 'Custom QR Code Generator',
    shortDescription:
      'Create high-resolution custom QR codes for URLs, WiFi, emails, and text in PNG or SVG vector format.',
    category: 'media',
    iconName: 'QrCode',
    isFeatured: false,
    keywords: ['qr code generator', 'free qr code', 'svg qr code', 'custom qr code'],
    schemaType: 'WebApplication',
    howToSteps: [
      { title: 'Enter Destination', description: 'Type a website URL, WiFi credentials, or text.' },
      { title: 'Download Image', description: 'Download crisp raster PNG or scalable vector SVG.' },
    ],
    features: [
      { title: 'Custom Color Styling', description: 'Personalize with high-contrast brand colors.' },
      { title: 'Adjustable Error Correction', description: 'Levels L, M, Q, and H for reliable scanning.' },
    ],
    technicalDetails: 'Generated entirely client-side using standard HTML5 Canvas and SVG DOM builders.',
    faqs: [
      {
        question: 'Do these QR codes ever expire?',
        answer: 'No! These are static QR codes and will never expire.',
      },
    ],
  },
  {
    id: 'unix-timestamp-converter',
    slug: 'unix-timestamp-converter',
    name: 'Unix Timestamp & Epoch Converter',
    shortDescription:
      'Convert Unix timestamps (seconds and milliseconds) to human-readable dates in UTC and local timezones.',
    category: 'productivity',
    iconName: 'Clock',
    isFeatured: false,
    keywords: ['unix timestamp converter', 'epoch converter', 'timestamp to date', 'epoch time'],
    schemaType: 'WebApplication',
    howToSteps: [
      { title: 'Enter Epoch or Date', description: 'Input a numeric timestamp or pick a date.' },
      { title: 'View Converted Times', description: 'Inspect representations in ISO 8601, UTC, and local time.' },
    ],
    features: [
      { title: 'Live Current Epoch Clock', description: 'Real-time updating Unix timestamp with quick copy.' },
      { title: 'Automatic Unit Detection', description: 'Distinguishes seconds from milliseconds.' },
    ],
    technicalDetails: 'Computed using native JavaScript Date and Intl.DateTimeFormat.',
    faqs: [
      {
        question: 'What is Unix Epoch time?',
        answer: 'The number of seconds that have elapsed since January 1, 1970 00:00:00 UTC.',
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
