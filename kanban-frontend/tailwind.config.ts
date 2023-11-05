import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    colors: {
      transparent: 'transparent',
      black: '#000112',
      'dark-bg': '#20212C',
      'dark-grey': '#2B2C37',
      'dark-lines': '#3E3F4E',
      'medium-grey': '#828FA3',
      'light-lines': '#E4EBFA',
      'light-bg': '#F4F7FD',
      'light-frost': '#E9EFFA',
      white: '#FFFFFF',
      'main-purple': '#635FC7',
      'main-purple-hover': '#A8A4FF',
      red: '#EA5555',
      'red-hover': '#FF9898',
    },
    fontFamily: {
      'Plus-Jakarta-Sans': ['Plus Jakarta Sans', 'sans-serif'],
    },
    fontSize: {
      s: ['0.75rem', '0.9375rem'],
      sm: ['0.8125rem', '1.4375rem'],
      m: ['0.9375rem', '1.1875rem'],
      l: ['1.125rem', '1.4375rem'],
      xl: ['1.5rem', '1.865rem'],
    },
    letterSpacing: {
      wide: '0.15rem',
    },
    extend: {
      spacing: {
        4.5: '1.125rem',
        7: '1.5625rem',
        15: '3.8125rem',
      },
      backgroundImage: {
        'mobile-logo': "url('/assets/logo/mobile-logo.svg')",
        'dark-desktop-logo': "url('/assets/logo/dark-desktop-logo.svg')",
        'light-desktop-logo': "url('/assets/logo/light-desktop-logo.svg')",
        'mobile-menu-toggle': "url('/assets/icons/mobile-menu-toggle.svg')",
        'mobile-board-expand': "url('/assets/icons/mobile-board-expand.svg')",
        'desktop-board-expand': "url('/assets/icons/desktop-board-expand.svg')",
        moon: "url('/assets/icons/moon.svg')",
        sun: "url('/assets/icons/sun.svg')",
      },
      boxShadow: {
        'primary-shadow': '0px 10px 20px rgba(54, 78, 126, 0.25)',
        'secondary-shadow': '0px 4px 6px rgba(54, 78, 126, 0.101545)',
      },
    },
  },
  plugins: [],
};
export default config;
