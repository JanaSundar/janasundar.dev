import { getAllPosts } from '~helpers/queries';
import { InferGetStaticPropsType } from 'next';
import React, { FC, useMemo, useState } from 'react';
import Post from '~components/Post';
import { AnimatePresence, motion } from 'framer-motion';
import { Fragment } from 'react';

export const getStaticProps = async () => {
  const posts = await getAllPosts();
  return {
    props: {
      posts,
    },
  };
};

const Posts: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ posts }) => {
  const [searchvalue, setSearchValue] = useState('');
  let year = 0;

  const filteredpost = useMemo(() => {
    return posts.filter((post) => post.title.toLowerCase().includes(searchvalue.toLowerCase()));
  }, [searchvalue, posts]);

  return (
    <motion.div className="space-y-6 my-10">
      <h3 className="font-bold text-2xl lg:text-4xl font-sans md:tracking-wide pb-8">Blog</h3>
      <div className="relative w-full md:w-1/2 mb-4">
        <input
          aria-label="Search articles"
          type="text"
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search articles"
          className="block w-full px-4 py-2 text-gray-100 bg-gray-700 border rounded-md border-gray-900 focus:outline-none"
        />
        <svg
          className="absolute w-5 h-5 right-3 top-3 text-gray-300"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <AnimatePresence initial={false} mode="popLayout">
        {filteredpost.map(({ title, description, createdAt, slug }) => {
          const currentYear = new Date(createdAt).getFullYear();
          let printYear: boolean;

          if (currentYear !== year) {
            printYear = true;
            year = currentYear;
          } else {
            printYear = false;
          }

          return (
            <Fragment key={slug}>
              {printYear && <h1 className="text-xl font-mono pb-4">{currentYear}</h1>}
              <Post key={title} {...{ title, description, date: createdAt, showDescription: true, slug }} />
            </Fragment>
          );
        })}
      </AnimatePresence>
    </motion.div>
  );
};

export default Posts;
