import { SandpackThemeProp } from '@codesandbox/sandpack-react';
import tailwindConfig from '../tailwind.config';

const white = '#ffffff';
const pink = '#ff006a';
const lightBlue = '#44dfff';
const gray = '#5a6986aa';
const lightGreen = '#aaed36';
const darkBlue = '#0e141a';

export const Sorcerer = {
  plain: {
    color: white,
    backgroundColor: darkBlue,
  },
  styles: [
    {
      types: ['prolog', 'constant', 'builtin', 'important', 'deleted', 'type', 'attr-name', 'property'],
      style: {
        color: white,
      },
    },
    {
      types: ['inserted', 'function'],
      style: {
        color: pink,
      },
    },
    {
      types: ['changed', 'variable', 'boolean', 'script', 'spread'],
      style: {
        color: lightBlue,
      },
    },
    {
      types: ['punctuation'],
      style: {
        color: gray,
      },
    },
    {
      types: ['string', 'char', 'selector', 'symbol', 'attr-value'],
      style: {
        color: lightGreen,
      },
    },
    {
      types: ['keyword', 'number'],
      style: {
        color: white,
      },
    },
    {
      types: ['comment'],
      style: {
        color: gray,
      },
    },
    {
      types: ['tag'],
      style: {
        color: pink,
      },
    },
  ],
};

// Sandpack theme

export const SandpackSorcerer: SandpackThemeProp = {
  colors: {
    surface1: darkBlue,
    surface2: '#0e141a1f',
    surface3: `#5a69861f`,
    clickable: 'inherit',
    base: pink,
    disabled: gray,
    hover: 'inherit',
    accent: white,
  },
  syntax: {
    plain: lightBlue,
    comment: {
      color: gray,
      fontStyle: 'italic',
    },
    keyword: white,
    tag: pink,
    punctuation: gray,
    definition: pink,
    property: pink,
    static: lightBlue,
    string: lightGreen,
  },
  font: {
    body: tailwindConfig.theme?.fontFamily?.sans.join(', '),
    mono: tailwindConfig.theme?.fontFamily?.mono.join(', '),
    size: '14px',
    lineHeight: '24px',
  },
};

