/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'bps-',
  corePlugins: {
    preflight: false,
  },
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'media',
  theme: {
    extend: {},
    screens: {
      sm: '640px',
      tablet: '640px',
      md: '768px',
      lg: '1024px',
      laptop: '1024px',
      xl: '1280px',
      desktop: '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [],
};
