import * as React from 'react';
import { SVGProps } from 'react';

const ShareIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-share"
    width={24}
    height={24}
    strokeWidth={1.5}
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M0 0h24v24H0z" stroke="none" />
    <circle cx={6} cy={12} r={3} />
    <circle cx={18} cy={6} r={3} />
    <circle cx={18} cy={18} r={3} />
    <path d="m8.7 10.7 6.6-3.4M8.7 13.3l6.6 3.4" />
  </svg>
);

export default ShareIcon;
