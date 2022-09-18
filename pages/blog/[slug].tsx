import { bundleMDX } from 'mdx-bundler';
import { getMDXComponent } from 'mdx-bundler/client';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import dynamic from 'next/dynamic';
import path from 'path';
import React, { FC, useMemo } from 'react';
import readingTime from 'reading-time';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import emoji from 'remark-emoji';
import { CodeBlock, Link, Callout, Alert, Image } from '~components/MDX';
import { rehypeMetaAttribute } from '~helpers/mdx';
import { getAllSlugs, getSinglePost } from '~helpers/queries';
import { format } from 'date-fns';
import NextLink from 'next/link';
import BackArrowIcon from '~components/SVG/BackArrowIcon';
import WatchIcon from '~components/SVG/WatchIcon';
import CalendarIcon from '~components/SVG/CalendarIcon';

const Sandpack = dynamic(() => import('~components/MDX/Sandpack'), { ssr: false });

export const getStaticPaths = async () => {
  const Slugs = await getAllSlugs();

  const paths = Slugs.map((val) => ({ params: { slug: val.slug } }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  if (process.platform === 'win32') {
    process.env.ESBUILD_BINARY_PATH = path.join(process.cwd(), 'node_modules', 'esbuild', 'esbuild.exe');
  } else {
    process.env.ESBUILD_BINARY_PATH = path.join(process.cwd(), 'node_modules', 'esbuild', 'bin', 'esbuild');
  }

  const { slug } = context.params!;

  const post = await getSinglePost(slug as string);

  const result = await bundleMDX({
    source: post.content,
    mdxOptions(options) {
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeMetaAttribute,
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            properties: {
              className: ['anchor'],
            },
            test: ['h1', 'h2', 'h3'],
          },
        ],
      ];
      options.remarkPlugins = [...(options.remarkPlugins ?? []), emoji];
      return options;
    },
    ...(post.files ? { files: post.files } : {}),
  });

  const timeToRead = readingTime(post.content).text;

  const imageData = {
    title: post.title,
    tags: timeToRead + ',' + post.tags.map(({ tag }) => tag).join(','),
    slug: slug as string,
  };

  return {
    props: {
      ...result,
      timeToRead,
      tags: post.tags,
      seo: { description: result.frontmatter.description, title: result.frontmatter.title, imageData },
      updatedAt: post.updatedAt,
    },
    revalidate: 300,
  };
};

const Post: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ updatedAt, timeToRead, seo, code }) => {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  return (
    <div className="prose prose-invert prose-base w-full px-4 md:prose-xl mx-auto prose-p:text-gray-400/90 py-4">
      <NextLink href="/blog" passHref>
        <a className="flex items-center no-underline text-gray-500 group">
          <BackArrowIcon className="group-hover:-translate-x-1 ease-linear duration-100" /> <span>back</span>
        </a>
      </NextLink>
      <div className="not-prose py-8 space-y-6">
        <h1 className="text-3xl sm:text-5xl font-sans font-bold">{seo.title}</h1>
        <div className="text-gray-500 flex text-base items-center justify-start gap-2">
          <p className="flex items-center gap-1">
            <WatchIcon />
            {timeToRead}
          </p>
          <p className="flex items-center gap-1">
            <CalendarIcon />
            {format(new Date(updatedAt), 'MMM dd, yyyy')}
          </p>
        </div>
      </div>
      <Component
        components={{
          pre: CodeBlock as any,
          a: Link,
          Sandpack,
          Callout,
          Alert,
          Image,
        }}
      />
    </div>
  );
};

export default Post;
