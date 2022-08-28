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
    },
    revalidate: 300,
  };
};

const Post: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ code }) => {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  return (
    <div className="prose prose-invert prose-xl prose-p:text-gray-400/90 py-4">
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
