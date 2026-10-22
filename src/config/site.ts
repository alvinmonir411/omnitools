export const SITE_CONFIG = {
  name: 'OmniTools',
  description:
    'Free, fast, and 100% private online developer and productivity tools. Format JSON, convert text, generate hashes, build QR codes, and more directly in your browser.',
  url: 'https://omnitools.app',
  ogImage: '/og-image.png',
  links: {
    github: 'https://github.com/omnitools',
  },
  categories: [
    {
      id: 'developer',
      name: 'Developer Tools',
      description: 'Format, validate, encode, decode, and generate code utilities client-side.',
      icon: 'Code2',
    },
    {
      id: 'text',
      name: 'Text & Content',
      description: 'Word counters, case converters, analyzers, and text manipulation utilities.',
      icon: 'FileText',
    },
    {
      id: 'media',
      name: 'Media & Graphics',
      description: 'QR code generator, color tools, and client-side image helpers.',
      icon: 'QrCode',
    },
    {
      id: 'productivity',
      name: 'Productivity & Math',
      description: 'Timestamp converters, units, calculations, and daily digital math tools.',
      icon: 'Clock',
    },
  ] as const,
};
