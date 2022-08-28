import { getAllPosts } from '~helpers/queries';
import { InferGetStaticPropsType } from 'next';
import React, { FC } from 'react';
import Link from 'next/link';

export const getStaticProps = async () => {
  const posts = await getAllPosts();
  return {
    props: {
      posts,
    },
  };
};

const Posts: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ posts }) => {
  return (
    <div className="space-y-6 my-10">
      <h3 className="font-bold text-2xl lg:text-4xl font-sans md:tracking-wide">All Posts</h3>
      {posts.map((post) => {
        return (
          <Link key={post.slug} href={`/blog/${post.slug}`} passHref>
            <a>{post.title}</a>
          </Link>
        );
      })}
    </div>
  );
};

export default Posts;
