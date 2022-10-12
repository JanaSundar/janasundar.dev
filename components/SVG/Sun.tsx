import React from 'react';
import { motion, SVGMotionProps } from 'framer-motion';

function SunIcon(props: SVGMotionProps<SVGSVGElement>) {
  return (
    <motion.svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" {...props}>
      <motion.path
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M12 16a4 4 0 100-8 4 4 0 000 8zM3 12h1m8-9v1m8 8h1m-9 8v1M5.6 5.6l.7.7m12.1-.7l-.7.7m0 11.4l.7.7m-12.1-.7l-.7.7"
        initial={{
          pathLength: 0,
          opacity: 0,
          rotate: '45deg',
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

export default SunIcon;
