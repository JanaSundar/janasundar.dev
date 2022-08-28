import Link from 'next/link';
import { AnchorHTMLAttributes } from 'react';

const CustomLink = (props: AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const href = props.href;
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));
  const className =
    'break-words underline underline-offset-4 p-0 m-0 hover:decoration-link decoration-link ease-in duration-100 decoration-solid';

  if (isInternalLink) {
    return (
      <Link href={href} passHref>
        <a className={`${className} hover:decoration-4`} {...props}>
          {props.children}
        </a>
      </Link>
    );
  }

  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className={`${className} text-link no-underline hover:underline`}
      {...props}
    />
  );
};

export default CustomLink;
