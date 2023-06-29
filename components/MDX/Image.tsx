import clsx from 'clsx';
import Image, { ImageProps } from 'next/image';
import React from 'react';

interface customImageProps extends ImageProps {
  caption?: string;
  to: string;
  textAlign: 'left' | 'center';
  hasLink: boolean;
  showBorder: boolean;
}

export default function CustomImage({
  alt,
  caption,
  to,
  textAlign = 'center',
  hasLink,
  showBorder,
  ...props
}: customImageProps) {
  const [isLoading, setLoading] = React.useState(true);

  return (
    <figure
      className={clsx('relative flex flex-col overflow-hidden rounded-lg', {
        'animate-pulse': isLoading,
        'p-1 bg-gray-700': showBorder,
      })}
    >
      <Image
        alt={alt ?? 'Blog Image'}
        className={clsx(
          'rounded-lg shadow duration-700 ease-in-out ',
          isLoading ? 'blur-lg grayscale' : 'blur-0 grayscale-0'
        )}
        width={1200}
        height={600}
        loading="lazy"
        onLoadingComplete={() => setLoading(false)}
        {...props}
      />
      {caption && (
        <figcaption
          className={clsx({
            'text-center': textAlign === 'center',
            'text-left': textAlign === 'left',
          })}
        >
          {hasLink ? 'From ' : caption}
          {hasLink ? (
            <a href={to} target="_blank" rel="noopener noreferrer" className="capitalize text-link underline-offset-2">
              {caption}
            </a>
          ) : null}
        </figcaption>
      )}
    </figure>
  );
}
