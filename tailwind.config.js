const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./components/**/*.{js,ts,jsx,tsx}', './layouts/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xs: '475px',
      ...defaultTheme.screens,
    },
    fontFamily: {
      sans: ['Wotfard', ...defaultTheme.fontFamily.sans],
      mono: ['MonoLisa', ...defaultTheme.fontFamily.mono],
      poppins: ['Poppins'],
    },
    extend: {
      colors: {
        highlight: 'hsl(276, 68%, 75%)',
        primary: '#121212',
        code: '#0e141a',
        link: '#617bff',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
