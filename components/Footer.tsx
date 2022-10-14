import Link from 'next/link';
import React from 'react';

interface Links {
  [x: string]: { name: string; route: string; isExternal: boolean }[];
}

const links: Links = {
  pages: [
    {
      name: 'Home',
      route: '/',
      isExternal: false,
    },
    {
      name: 'Blog',
      route: '/blog',
      isExternal: false,
    },
    // {
    //   name: 'Snippets',
    //   route: '/snippets',
    //   isExternal: false,
    // },
  ],
  social: [
    {
      name: 'Twitter',
      route: 'https://twitter.com/jana__sundar',
      isExternal: true,
    },
    {
      name: 'Github',
      route: 'http://github.com/janasundar',
      isExternal: true,
    },
    {
      name: 'LinkedIn',
      route: 'https://www.linkedin.com/in/janasundar/',
      isExternal: true,
    },
    {
      name: 'Contact',
      route: 'mailto:mailtojana23@gmail.com',
      isExternal: false,
    },
  ],
  others: [
    {
      name: 'RSS',
      route: '/rss.xml',
      isExternal: false,
    },
    {
      name: 'Uses',
      route: '/uses',
      isExternal: false,
    },
  ],
};

const Footer = () => {
  return (
    <div className="shadow mt-8 p-8 border-t-[1px] border-gray-700/40 text-gray-400/90">
      <div className="max-w-4xl mx-auto w-full ">
        <div className="grid grid-cols-3 justify-items-center text-sm xs:text-base gap-5">
          {Object.keys(links).map((key) => (
            <div key={key} className="flex flex-col">
              {links[key].map((v) => (
                <Link key={v.route} href={v.route} passHref>
                  <a
                    className="py-1 hover:text-gray-100"
                    {...(v.isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    {v.name}
                  </a>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
