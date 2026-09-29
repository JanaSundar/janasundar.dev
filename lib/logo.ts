/**
 * The mark: a single round-capped "J". Drawn on a 100×100 canvas and optically centred, caps included.
 */
export const J_PATH = 'M 64 20 V 64 A 14 14 0 0 1 36 64';

/** App-icon colours: a light J on a near-black tile, so the icon reads on light and dark tabs alike. */
export const LOGO_TILE = { fill: '#ededed', background: '#0a0a0a' };

/** App-icon markup: the J on a solid rounded tile. Shared by the favicon and the home-screen icon. */
export function logoSvg() {
  const { fill, background } = LOGO_TILE;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="22" fill="${background}"/><path d="${J_PATH}" fill="none" stroke="${fill}" stroke-width="12" stroke-linecap="round" transform="translate(50 50) scale(0.85) translate(-50 -49)"/></svg>`;
}
