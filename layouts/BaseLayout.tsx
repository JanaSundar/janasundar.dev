import type { FC } from 'react';
import React from 'react';
import Footer from '~components/Footer';
import Navbar from '~components/Navbar';
import { motion } from 'framer-motion';

interface BaseLayoutProps {
  children: React.ReactNode;
}

const BaseLayout: FC<BaseLayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <motion.main layoutScroll className="max-w-4xl w-full mx-auto px-4 flex-1 flex flex-col">
        {children}
      </motion.main>
      <Footer />
    </>
  );
};

export default BaseLayout;
