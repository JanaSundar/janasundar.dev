const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./components/**/*.{js,ts,jsx,tsx}', './layouts/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xs: '475px',
      ...defaultTheme.screens,
    },
    fontFamily: {
      sans: ['Inter Variable', ...defaultTheme.fontFamily.sans],
      mono: ['MonoLisa', ...defaultTheme.fontFamily.mono],
    },
    extend: {
      colors: {
        highlight: 'hsl(276, 68%, 75%)',
        primary: '#000212',
        code: '#0e141a',
        link: '#617bff',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
