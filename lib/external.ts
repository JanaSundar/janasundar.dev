/** Whether a link leaves the site: an absolute or protocol-relative URL. */
export const isExternal = (href: string) => /^(https?:)?\/\//.test(href);

/** Attributes that open a link in a new tab. */
export const newTab = { target: '_blank', rel: 'noopener noreferrer' } as const;

/** `newTab` for external links and nothing for the rest, ready to spread onto an anchor. */
export const externalProps = (href: string) => (isExternal(href) ? newTab : {});
