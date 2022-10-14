import { bundleMDX } from 'mdx-bundler';
import { getMDXComponent } from 'mdx-bundler/client';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import dynamic from 'next/dynamic';
import path from 'path';
import React, { FC, HTMLProps, useMemo } from 'react';
import readingTime from 'reading-time';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import emoji from 'remark-emoji';
import { rehypeMetaAttribute } from '~helpers/mdx';
import { getAllSlugs, getSinglePost } from '~helpers/queries';
import { format, formatDistanceToNow, isEqual } from 'date-fns';
import NextLink from 'next/link';
import BackArrowIcon from '~components/SVG/BackArrowIcon';
import WatchIcon from '~components/SVG/WatchIcon';
import CalendarIcon from '~components/SVG/CalendarIcon';
import Shareable from '~components/Shareable';
import Newsletter from '~components/Newsletter';
import ViewCounter from '~components/ViewCounter';
import SEO from '~components/SEO';

const Sandpack = dynamic(() => import('~components/MDX/Sandpack'), { ssr: false });
const CodeBlock = dynamic(() => import('~components/MDX/CodeBlock'), { ssr: false });
const Link = dynamic(() => import('~components/MDX/CustomLink'), { ssr: false });
const Callout = dynamic(() => import('~components/MDX/Callout'), { ssr: false });
const Alert = dynamic(() => import('~components/MDX/Alert'), { ssr: false });
const Image = dynamic(() => import('~components/MDX/Image'), { ssr: false });
const Code = dynamic(() => import('~components/MDX/Code'), { ssr: false });

const Hr = (props: HTMLProps<HTMLHRElement>) => (
  <hr
    className="my-12 w-full border-none text-center h-10 before:content-['∿∿∿'] before:text-gray-100 before:text-2xl"
    {...props}
  ></hr>
);

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

  const { content, ...rest } = post;

  const result = await bundleMDX({
    source: content,
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

  return {
    props: {
      ...result,
      timeToRead,
      ...rest,
    },
    revalidate: 300,
  };
};

const Post: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  slug,
  createdAt,
  updatedAt,
  timeToRead,
  title,
  code,
}) => {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  const isUpdated = !isEqual(new Date(createdAt), new Date(updatedAt));

  return (
    <>
      <SEO title={title} />
      <div className="prose prose-invert prose-base w-full px-4 md:prose-xl md:prose-p:text-lg md:prose-li:text-lg prose-p:leading-relaxed md:prose-p:leading-8 prose-pre:text-base md:prose-pre:text-lg mx-auto prose-p:tracking-wide md:prose-p:tracking-wider prose-p:text-gray-400/90 py-4">
        <NextLink href="/blog" passHref>
          <a className="flex items-center no-underline group text-base tracking-wider font-bold text-link">
            <BackArrowIcon className="group-hover:-translate-x-1 ease-linear duration-100" /> <span>back</span>
          </a>
        </NextLink>
        <div className="not-prose py-8 space-y-6">
          <h1 className="text-3xl xs:text-4xl sm:text-5xl font-sans font-bold">{title}</h1>
          <div className="text-gray-500 flex text-base flex-wrap items-center justify-between gap-2">
            <p className="flex items-center gap-1">
              <CalendarIcon />
              <span>{format(new Date(createdAt), 'MMM dd, yyyy')}</span>
              {isUpdated ? (
                <span className="hidden sm:block">( updated {formatDistanceToNow(new Date(updatedAt))} ago )</span>
              ) : null}
            </p>
            <div className="flex gap-2 py-4 sm:py-0">
              <p className="flex items-center gap-1">
                <WatchIcon />
                <span>{timeToRead}</span>
              </p>
              <ViewCounter slug={slug} />
            </div>
          </div>
        </div>
        <article>
          <Component
            components={{
              pre: CodeBlock as any,
              code: Code as any,
              a: Link,
              Sandpack,
              Callout,
              Alert,
              Image,
              hr: (props) => <Hr {...props} />,
            }}
          />
        </article>
      </div>
      <Shareable url={slug} title={title} />
      <Newsletter />
    </>
  );
};

export default Post;
