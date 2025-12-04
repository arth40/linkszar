// hero.ts
import { heroui } from '@heroui/react';
// or import from theme package if you are using individual packages.
// import { heroui } from "@heroui/theme";
export default heroui({
  themes: {
    'linkszar-light': {
      extend: 'light',
      colors: {
        primary: {
          50: '#e6f8ec',
          100: '#c5eed3',
          200: '#9fdeba',
          300: '#6ccf9b',
          400: '#3fbe7d',
          500: '#1fa864',
          600: '#178b52',
          700: '#126e41',
          800: '#0d5231',
          900: '#083b23',
          DEFAULT: '#3fbe7d',
          foreground: '#0a0a0a',
        },
        foreground: {
          DEFAULT: '#1a1a1a',
        },
        background: {
          DEFAULT: '#ffffff',
        },
        focus: '#6ccf9b',
      },
      layout: {
        disabledOpacity: '0.3',
        radius: {
          small: '4px',
          medium: '6px',
          large: '8px',
        },
        borderWidth: {
          small: '1px',
          medium: '2px',
          large: '3px',
        },
      },
    },
  },
});
