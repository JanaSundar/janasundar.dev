import { bundleMDX } from 'mdx-bundler';
import { getMDXComponent } from 'mdx-bundler/client';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import dynamic from 'next/dynamic';
import path from 'path';
import React, { FC, HTMLProps, useMemo } from 'react';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import emoji from 'remark-emoji';
import { rehypeMetaAttribute } from '~helpers/mdx';
import { getSlugs, getSnippet } from '~helpers/queries';
import NextLink from 'next/link';
import BackArrowIcon from '~components/SVG/BackArrowIcon';
import Shareable from '~components/Shareable';
import SEO from '~components/SEO';
import Step from '~components/Step';

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
    const Slugs = await getSlugs('snippets');

    const paths = Slugs.map((val) => ({ params: { slug: val.slug } }));

    return {
        paths,
        fallback: 'blocking',
    };
};

export const getStaticProps = async ({ draftMode = false, ...context }: GetStaticPropsContext) => {
    if (process.platform === 'win32') {
        process.env.ESBUILD_BINARY_PATH = path.join(process.cwd(), 'node_modules', 'esbuild', 'esbuild.exe');
    } else {
        process.env.ESBUILD_BINARY_PATH = path.join(process.cwd(), 'node_modules', 'esbuild', 'bin', 'esbuild');
    }

    const { slug } = context.params!;

    const post = await getSnippet(slug as string, draftMode);

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
    });

    return {
        props: {
            ...result,
            ...rest,
            draftMode,
        },
        revalidate: 300,
    };
};

const Snippet: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
    slug,
    title,
    code,
    draftMode,
}) => {
    const Component = useMemo(() => getMDXComponent(code), [code]);

    return (
        <>
            {draftMode && (
                <p className="p-4 border-white border-4 rounded-md text-white">
                    This is a preview page.{' '}
                    <NextLink href="/api/exit-preview" className="underline font-bold text-link duration-200 transition-colors">
                        Click here
                    </NextLink>{' '}
                    to exit preview mode.
                </p>
            )}
            <SEO title={title} description={''} />
            <div className="prose prose-invert prose-base w-full px-4 md:prose-xl md:prose-p:text-lg md:prose-li:text-lg prose-p:leading-relaxed md:prose-p:leading-8 prose-pre:text-base md:prose-pre:text-lg mx-auto prose-p:tracking-wide md:prose-p:tracking-wider prose-p:text-gray-400/90 py-4">
                <NextLink href="/snippets" className="flex items-center no-underline group text-base tracking-wider font-bold text-link">
                    <BackArrowIcon className="group-hover:-translate-x-1 ease-linear duration-100" /> <span>back</span>
                </NextLink>
                <div className="not-prose py-8 space-y-6">
                    <h1 className='uppercase tracking-widest text-[#44dfff] text-center'>Snippet</h1>
                    <h1 className="text-3xl xs:text-4xl sm:text-5xl font-sans font-bold text-center">
                        {title}
                    </h1>
                </div>
                <article>
                    <Component
                        components={{
                            pre: CodeBlock,
                            code: Code,
                            a: Link,
                            Sandpack,
                            Callout,
                            Alert,
                            Image,
                            Step,
                            hr: (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHRElement>, HTMLHRElement>) => <Hr {...props} />,
                        } as any}
                    />
                </article>
            </div>
            <Shareable url={slug} title={title} type="snippet" />
        </>
    );
};

export default Snippet;
