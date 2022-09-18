import React, { SVGProps } from 'react';

function BackArrowIcon(props: SVGProps<SVGSVGElement>) {
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
      <path d="M5 12L19 12"></path>
      <path d="M5 12L9 16"></path>
      <path d="M5 12L9 8"></path>
    </svg>
  );
}

export default BackArrowIcon;
