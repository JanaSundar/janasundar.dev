import { motion, SVGMotionProps } from 'framer-motion';
import React from 'react';

function MoonIcon(props: SVGMotionProps<SVGSVGElement>) {
  return (
    <motion.svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" {...props}>
      <motion.path
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M12 3h.393a7.5 7.5 0 007.92 12.446A9 9 0 1112 2.992V3z"
        initial={{
          pathLength: 0,
          opacity: 0,
          rotate: '-45deg',
        }}
        animate={{
          pathLength: 1,
          opacity: 1,
          rotate: '0deg',
        }}
        transition={{
          type: 'spring',
        }}
      />
    </motion.svg>
  );
}

export default MoonIcon;
