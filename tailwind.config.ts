import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB',
          hover: '#1D4ED8',
          subtle: '#EFF6FF',
          dark: '#1E40AF',
        },
        surface: {
          DEFAULT: 'var(--surface, #FFFFFF)',
          subtle: 'var(--surface-subtle, #F1F5F9)',
          border: 'var(--border, #E2E8F0)',
        },
        body: {
          DEFAULT: 'var(--text, #0F172A)',
          muted: 'var(--text-muted, #64748B)',
        },
        canvas: {
          DEFAULT: 'var(--background, #F8FAFC)',
        },
        success: {
          DEFAULT: '#16A34A',
          subtle: '#DCFCE7',
          hover: '#15803D',
        },
        warning: {
          DEFAULT: '#D97706',
          subtle: '#FEF3C7',
          hover: '#B45309',
        },
        danger: {
          DEFAULT: '#DC2626',
          subtle: '#FEE2E2',
          hover: '#B91C1C',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 3px 0 rgb(15 23 42 / 0.05), 0 1px 2px -1px rgb(15 23 42 / 0.05)',
        'card-hover': '0 4px 6px -1px rgb(15 23 42 / 0.08), 0 2px 4px -2px rgb(15 23 42 / 0.08)',
        modal: '0 20px 25px -5px rgb(15 23 42 / 0.1), 0 8px 10px -6px rgb(15 23 42 / 0.1)',
      },
      borderRadius: {
        DEFAULT: '0.375rem',
        sm: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
      },
    },
  },
  plugins: [],
};

export default config;
