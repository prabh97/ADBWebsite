/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'adb-blue': '#00205B',
        'adb-light-blue': '#0067B9',
        'adb-accent': '#00A0C4',
      },
    },
  },
  plugins: [],
};