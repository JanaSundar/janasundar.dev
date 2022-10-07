import React, { FC, ReactNode } from 'react';

interface CodeProps {
  children: ReactNode;
}

const Code: FC<CodeProps> = ({ children }) => {
  return <code className="text-[#ff006a] bg-transparent font-normal italic inline-block not-prose">{children}</code>;
};

export default Code;
