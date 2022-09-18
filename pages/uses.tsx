import Link from 'next/link';
import React, { Fragment } from 'react';
import { uses } from '~constants/index';

const Uses = () => {
  return (
    <div className="space-y-6 my-10 text-gray-500 font-mono">
      <h3 className="font-bold text-2xl lg:text-4xl font-sans text-white md:tracking-wide pb-4">Uses</h3>
      <p>A collection of stuff I use for development and in everyday life.</p>
      {Object.keys(uses).map((key) => (
        <Fragment key={key}>
          <h3 className="text-xl font-bold">{key}</h3>
          <ul className="list-disc px-8">
            {uses[key].map((item) => (
              <Link href={item.url} key={item.name} passHref>
                <a className="hover:underline underline-offset-4" target="_blank">
                  <li className="text-white py-2">{item.name}</li>
                </a>
              </Link>
            ))}
          </ul>
        </Fragment>
      ))}
    </div>
  );
};

export default Uses;

// Coding Software
// Visual Studio Code
// Sorcerer
// MonoLisa
// iTerm2
// Arc Browser
// Gear
// MacBook Pro 16" Intel Chip
// HP E22 23″ Monitor
// iPad Air
//
