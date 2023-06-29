interface Uses {
  [x: string]: {
    name: string;
    url: string;
  }[];
}

export const uses: Uses = {
  Desktop: [
    {
      name: 'Visual Studio Code',
      url: 'https://code.visualstudio.com/',
    },
    {
      name: 'Sorcerer',
      url: 'https://marketplace.visualstudio.com/items?itemName=MarkThomasMiller.sorcerer',
    },
    {
      name: 'MonoLisa',
      url: 'https://www.monolisa.dev/',
    },
    {
      name: 'iTerm2',
      url: 'https://iterm2.com/',
    },
    {
      name: 'Arc Browser',
      url: 'https://arc.net/',
    },
    {
      name: 'Raycast',
      url: 'https://www.raycast.com/',
    },
    {
      name: 'Figma',
      url: 'https://www.figma.com/',
    },
  ],
  Hardware: [
    {
      name: 'MacBook Pro 16" Intel Chip',
      url: 'https://www.apple.com/macbook-pro-14-and-16/',
    },
    {
      name: 'HP E22 23" monitor',
      url: 'https://amzn.eu/d/2uOY3FP',
    },
    {
      name: 'iPad Air',
      url: 'https://www.apple.com/ipad-air/',
    },
    {
      name: 'OnePlus Buds Z2',
      url: 'https://www.oneplus.in/product/oneplus-buds-z2',
    },
  ],
};
