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
          50: '#ECEEFB',
          100: '#D2D6F5',
          200: '#B0B7EE',
          300: '#8791E4',
          400: '#5F6BD8',
          500: '#3D4FD1',
          600: '#3140B0',
          700: '#26328A',
          800: '#1C2565',
          900: '#141B47',
          DEFAULT: '#3D4FD1',
          foreground: '#F7F3EA',
        },
        foreground: {
          DEFAULT: '#191712',
        },
        background: {
          DEFAULT: '#F7F3EA',
        },
        focus: '#3D4FD1',
      },
      layout: {
        disabledOpacity: '0.4',
        radius: {
          small: '8px',
          medium: '12px',
          large: '18px',
        },
        borderWidth: {
          small: '1px',
          medium: '1.5px',
          large: '2px',
        },
      },
    },
  },
});
