import * as React from "react"
import { SVGProps } from "react"

const Logo = (props: SVGProps<SVGSVGElement>) => (
  <svg width={26} height={26} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="m23.291 17.887-4.476-4.476 6.058-4.326a1.52 1.52 0 0 0 .191-2.311L19.532 1.24a1.519 1.519 0 0 0-1.956-.162l-12.53 8.948a1.519 1.519 0 0 0-.191 2.31l4.295 4.296-8.59 8.59 21.98-4.777a1.518 1.518 0 0 0 .751-2.559Z"
      fill="currentcolor"
    />
  </svg>
);

export default Logo