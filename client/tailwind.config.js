/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        main: '#80ad61'
      }
    }
  },
  plugins: [require('tailwind-scrollbar-hide')],
  important: true
};
