export default {
  '*.{js,jsx,ts,tsx,mjs,cjs}': ['oxlint --fix', 'oxfmt'],
  '*.{json,css,md}': ['oxfmt'],
};
