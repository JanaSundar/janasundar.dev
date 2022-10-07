import clsx from 'clsx';
import React, { FC } from 'react';

interface CalloutProps {
  children: React.ReactNode;
  type: 'info' | 'warning' | 'success' | 'error';
  title?: string;
}

const Callout: FC<CalloutProps> = ({ children, type = 'info', title }) => {
  return (
    <aside
      className={`px-6 py-2 rounded-r-md text-lg leading-relaxed border-l-4 backdrop-blur-3xl ${clsx(
        {
          'bg-green-400/10 border-l-green-600': type === 'success',
          'bg-blue-400/10 border-l-blue-600': type === 'info',
          'bg-orange-400/10 border-l-orange-600': type === 'warning',
          'bg-red-400/10 border-l-red-600': type === 'error',
        }
      )}`}
    >
      {title && <p className="py-2 font-bold">{title}</p>}
      {children}
    </aside>
  );
};

export default Callout;
