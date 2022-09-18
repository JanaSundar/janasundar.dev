import * as React from 'react';
import { SVGProps } from 'react';

const RSSIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    style={{
      fill: '#000',
    }}
    {...props}
  >
    <path d="M19 20.001C19 11.729 12.271 5 4 5v2c7.168 0 13 5.832 13 13.001h2z" />
    <path d="M12 20.001h2C14 14.486 9.514 10 4 10v2c4.411 0 8 3.589 8 8.001z" />
    <circle cx={6} cy={18} r={2} />
  </svg>
);

export default RSSIcon;
