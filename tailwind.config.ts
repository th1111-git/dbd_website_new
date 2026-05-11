import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // All colours reference CSS variables so dark ↔ light swaps automatically.
      // The <alpha-value> placeholder lets Tailwind opacity modifiers (bg-accent/10) work.
      colors: {
        'bg-base':       'rgb(var(--c-bg-base)       / <alpha-value>)',
        'bg-surface':    'rgb(var(--c-bg-surface)    / <alpha-value>)',
        'bg-elevated':   'rgb(var(--c-bg-elevated)   / <alpha-value>)',
        'border':        'rgb(var(--c-border)        / <alpha-value>)',
        'border-subtle': 'rgb(var(--c-border-subtle) / <alpha-value>)',
        'text-primary':  'rgb(var(--c-text-primary)  / <alpha-value>)',
        'text-secondary':'rgb(var(--c-text-secondary)/ <alpha-value>)',
        'text-muted':    'rgb(var(--c-text-muted)    / <alpha-value>)',
        'accent':        'rgb(var(--c-accent)        / <alpha-value>)',
        'accent-dim':    'rgb(var(--c-accent-dim)    / <alpha-value>)',
        'mono':          'rgb(var(--c-mono)          / <alpha-value>)',
        'mono-dim':      'rgb(var(--c-mono-dim)      / <alpha-value>)',
      },
      fontFamily: {
        sans:    ['var(--font-inter)',    'sans-serif'],
        mono:    ['var(--font-mono)',     'monospace'],
        display: ['var(--font-display)', 'sans-serif'],
      },
      animation: {
        blink: 'blink 1s step-end infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%':       { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}

export default config
