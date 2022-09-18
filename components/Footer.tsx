import Link from 'next/link';
import React from 'react';

const links = {
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
    {
      name: 'Snippets',
      route: '/snippets',
      isExternal: false,
    },
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
    <div className="shadow mt-8 p-8 border-t-[1px] border-gray-700/20 text-gray-500">
      <div className="max-w-4xl mx-auto w-full ">
        <div className="grid grid-cols-3 gap-5">
          {Object.values(links).map((val, index) => (
            <div key={index} className="flex flex-col">
              {val.map((v) => (
                <Link key={v.route} passHref href={v.route}>
                  <a {...(v.isExternal ? { target: '_blank' } : {})} className="py-1 hover:text-gray-300">
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
