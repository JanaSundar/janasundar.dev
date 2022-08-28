import * as React from 'react';
import { motion, SVGMotionProps, useMotionValue, useTransform, Variants } from 'framer-motion';
import { useClipboard } from '~hooks/useClipboard';

interface ClipboardProps extends SVGMotionProps<SVGSVGElement> {
  code: string;
}

const Clipboard = ({ code, ...props }: ClipboardProps) => {
  const { hasCopied, onCopy } = useClipboard(code);
  const pathLength = useMotionValue(0);
  const opacity = useTransform(pathLength, [0.05, 0.15], [0, 1]);

  const duration = 0.4;
  const svgVariants: Variants = {
    hover: (hasCopied: boolean) => ({
      scale: hasCopied ? 1 : 1.05,
    }),
    pressed: (hasCopied: boolean) => ({
      scale: hasCopied ? 1 : 0.95,
    }),
    idle: {
      scale: 1,
    },
  };

  const boxVariants = {
    checked: { opacity: 0 },
    unchecked: { opacity: 1 },
  };

  const tickVariants = {
    pressed: (hasCopied: boolean) => ({ pathLength: hasCopied ? 0.85 : 0.05 }),
    checked: { pathLength: 1 },
    unchecked: { pathLength: 0 },
  };
  return (
    <button className="border-0 outline-none shadow-sm" aria-label="copy to clipboard" onClick={onCopy}>
      <motion.svg
        width={22}
        height={22}
        transition={{ duration, type: 'spring' }}
        variants={svgVariants}
        custom={hasCopied}
        whileHover="hover"
        whileTap="pressed"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={onCopy}
        viewBox="0 0 24 24"
        stroke="#fff"
        {...props}
      >
        <motion.path
          d="M20 6L9 17L4 12"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={false}
          animate={hasCopied ? 'checked' : 'unchecked'}
          variants={tickVariants}
          style={{ pathLength, opacity }}
          custom={hasCopied}
          transition={{ duration }}
        />

        <motion.path
          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
          strokeWidth={1}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={false}
          animate={hasCopied ? 'checked' : 'unchecked'}
          variants={boxVariants}
          custom={hasCopied}
          transition={{ duration }}
        />
      </motion.svg>
    </button>
  );
};

export default Clipboard;
