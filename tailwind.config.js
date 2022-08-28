const plugin = require('tailwindcss/plugin');
const defaultTheme = require('tailwindcss/defaultTheme');

const patterns = plugin(({ addUtilities }) => {
  addUtilities({
    '.nnnoise': {
      backgroundImage: "url('/images/nnnoise.svg')",
    },
    '.ooorganize': {
      backgroundImage: "url('/images/ooorganize.svg')",
    },
  });
});

module.exports = {
  content: ['./components/**/*.{js,ts,jsx,tsx}', './layouts/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Nunito', ...defaultTheme.fontFamily.sans],
      mono: ['MonoLisa', ...defaultTheme.fontFamily.mono],
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
  plugins: [patterns, require('@tailwindcss/typography')],
};
