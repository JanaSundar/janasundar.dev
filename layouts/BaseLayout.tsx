import type { FC } from 'react';
import React from 'react';

interface BaseLayoutProps {
  children: React.ReactNode;
}

const BaseLayout: FC<BaseLayoutProps> = ({ children }) => {
  return (
    <>
      {/* <div className="pointer-events-none fixed inset-0 z-[-1] mix-blend-color-dodge nnnoise" />
      <div className="pointer-events-none fixed inset-0 z-[-1] bg-center opacity-30 mix-blend-color-dodge ooorganize" /> */}
      <main className="max-w-4xl mx-auto px-4">{children}</main>
    </>
  );
};

export default BaseLayout;
