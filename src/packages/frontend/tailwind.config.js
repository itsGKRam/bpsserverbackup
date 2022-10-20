/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'bps-', // prefix for tailwind classes
  corePlugins: {
    preflight: false,
  },
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
