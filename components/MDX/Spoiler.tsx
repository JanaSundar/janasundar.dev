import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import React, { FC, useState } from 'react';

interface SpoilerProps {
  children: React.ReactNode;
}

const Spoiler: FC<SpoilerProps> = ({ children }) => {
  const [showSpoiler, setShowSpoiler] = useState(false);

  return (
    <div className="relative flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={clsx(
          {
            '': showSpoiler,
            'blur-sm': !showSpoiler,
          },
          'bg-blue-900/10 text-white p-4 not-prose  rounded-md'
        )}
      >
        {children}
      </motion.div>
      <AnimatePresence exitBeforeEnter>
        {!showSpoiler && (
          <motion.button
            key="button"
            onClick={() => {
              setShowSpoiler(true);
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute inset-0 z-1 text-primary shadow-md px-3 py-1 rounded-md bg-white font-bold m-auto w-fit h-fit"
          >
            Reveal
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Spoiler;
