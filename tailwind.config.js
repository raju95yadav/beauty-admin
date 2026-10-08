/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        nykaa: {
          pink: '#0D0D0D', // Parisian Onyx primary CTA
          purple: '#C5A880', // Champagne Gold brand accent
          bg: 'var(--nykaa-bg)',
          surface: 'var(--nykaa-surface)',
          text: 'var(--nykaa-text)',
          'text-muted': 'var(--nykaa-text-muted)',
          border: 'var(--nykaa-border)',
          dark: '#121214',
          card: 'var(--glass-bg)',
        },
        atelier: {
          base: '#FAF9F6', // Warm Alabaster
          surface: '#FFFFFF', // Pure Milk
          text: '#121214', // Noir Slate
          muted: '#6E6D7A', // Soft Umber
          cta: '#0D0D0D', // Parisian Onyx
          gold: '#C5A880', // Champagne Gold
          border: '#EFECE6', // Cashmere Gray
        },
        pink: {
          50: '#FAF9F6',
          100: '#EFECE6',
          200: '#E2DDD5',
          300: '#D8C7B0',
          400: '#C5A880',
          500: '#C5A880', // Champagne Gold
          600: '#0D0D0D', // Parisian Onyx
          700: '#1A1A1A',
          800: '#121214',
          900: '#0D0D0D',
        },
        rose: {
          50: '#FAF9F6',
          100: '#EFECE6',
          200: '#E2DDD5',
          300: '#D8C7B0',
          400: '#C5A880',
          500: '#C5A880',
          600: '#0D0D0D',
          700: '#1A1A1A',
          800: '#121214',
          900: '#0D0D0D',
        },
        purple: {
          50: '#FAF9F6',
          100: '#EFECE6',
          200: '#D8C7B0',
          300: '#C5A880',
          400: '#B8976C',
          500: '#C5A880',
          600: '#9E8055',
          700: '#7E633C',
          800: '#121214',
          900: '#0D0D0D',
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
