import React, { FC, useEffect } from 'react';
import { useClipboard } from '~hooks/useClipboard';
import LinkedInIcon from './SVG/LinkedInIcon';
import ShareIcon from './SVG/ShareIcon';
import TwitterIcon from './SVG/TwitterIcon';
import toast from 'react-hot-toast';

interface ShareableProps {
  url: string;
  title: string;
  type: string
}

const Shareable: FC<ShareableProps> = ({ url, title, type }) => {
  const { onCopy, hasCopied } = useClipboard(url);
  const className = 'text-gray-400/90 hover:text-gray-200 focus:outline-none';

  useEffect(() => {
    if (hasCopied) {
      toast.success('Copied');
    }
  }, [hasCopied]);

  return (
    <>
      <div className="flex gap-4 flex-col items-center w-full mt-4 p-4 rounded-md justify-center">
        <p className="text-base text-center tracking-wide font-bold text-gray-500/90">Share this {type}</p>
        <div className="flex gap-4 items-center">
          <a
            href={`https://twitter.com/intent/tweet?url=${url}&via=jana__sundar&text=${title}`}
            target="_blank"
            className={className}
            rel="noopener noreferrer"
            title="Share on twitter"
          >
            <TwitterIcon width={22} height={22} stroke="white" />
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}
            target="_blank"
            className={className}
            rel="noopener noreferrer"
            title="Share on linkedin"
          >
            <LinkedInIcon width={22} height={22} stroke="white" />
          </a>
          <button onClick={onCopy} className={className} title="copy on clipboard">
            <ShareIcon width={22} height={22} stroke="white" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Shareable;
