import { InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import React, { FC } from 'react'
import { getContents } from '~helpers/queries';

export const getStaticProps = async () => {
  const snippets = await getContents('snippets');

  return {
    props: {
      snippets,
    },
  };
};


const Snippets: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ snippets }) => {
  return (
    <div className="space-y-6 my-10">
      <h3 className="font-bold text-2xl lg:text-4xl font-sans md:tracking-wide pb-8">Snippets</h3>
      <div className='snippets'>
        {snippets.map(snippet => (
          <Link key={snippet.slug} href={`/snippets/${snippet.slug}`}>
            <div className='cursor-pointer h-[200px] my-auto flex justify-center items-center shadow-md ring-2  rounded-md px-4 py-2 ring-slate-200/10 bg-slate-100/[0.01] backdrop-blur-xl'>
              <h4 className='flex-1 text-center text-xl tracking-wide font-bold'>{'useDebounce'}</h4>
            </div>
          </Link>
        ))}
        {snippets.length === 0 ? <p className="text-xl py-4 text-gray-400/90">No post found</p> : null}
      </div>
    </div>
  );
}

export default Snippets