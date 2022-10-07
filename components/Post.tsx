import { format } from 'date-fns';
import Link from 'next/link';
import React, { FC } from 'react';

interface Props {
  title: string;
  date: string;
  description: string;
  showDescription?: boolean;
  slug: string;
}

const Post: FC<Props> = ({ title, date, description, showDescription = false, slug }) => {
  return (
    <div className="pb-4 leading-relaxed flex gap-4 text-gray-400/90">
      <Link href={`/blog/${slug}`} passHref>
        <a className="flex gap-4">
          <p className="font-mono min-w-[80px]">{format(new Date(date), 'dd MMM')}</p>
          <div className="text-lg">
            <p className="text-white hover:underline underline-offset-4">{title}</p>
            {showDescription ? <p className="py-4">{description}</p> : null}
          </div>
        </a>
      </Link>
    </div>
  );
};

export default Post;
