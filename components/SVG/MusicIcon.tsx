import React, { SVGProps } from 'react';

function MusicIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z"></path>
      <circle cx="6" cy="17" r="3"></circle>
      <circle cx="16" cy="17" r="3"></circle>
      <path d="M9 17L9 4 19 4 19 17"></path>
      <path d="M9 8L19 8"></path>
    </svg>
  );
}

export default MusicIcon;
