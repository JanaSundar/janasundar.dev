import Link from 'next/link';
import React from 'react';
import Error404 from '~components/SVG/404';

const FourOhFour = () => {
  return (
    <div className="flex flex-col items-center justify-center flex-1 mx-4">
      <div className="py-8 flex flex-col gap-2 text-center">
        <p className="text-2xl sm:text-4xl font-bold tracking-wide">Oops!</p>
        <p className='text-gray-400/90'>You're lost</p>
      </div>
      <div className="max-w-[400px] w-[100%] ">
        <Error404 className="mb-8" />
      </div>
      <Link href="/" className="flex gap-2 underline underline-offset-4 font-bold">
        Return home
      </Link>
    </div>
  );
};

export default FourOhFour;
