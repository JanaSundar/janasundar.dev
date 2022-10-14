import React, { FC } from 'react';
import { getRandomColor } from '~helpers/og';

interface Props {
  background: string | null;
  color: string | null;
  title: string;
}

const SocialImage: FC<Props> = ({ background, color, title }) => {
  return (
    <div
      style={{
        display: 'flex',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: background ?? '#000212',
        fontSize: 60,
        fontWeight: 'bold',
        fontFamily: '"Inter"',
        position: 'relative',
      }}
    >
      <div
        style={{
          display: 'flex',
          width: '75%',
          backgroundImage: color ?? getRandomColor(),
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          margin: '0 auto',
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          lineHeight: 1.4,
          letterSpacing: 2,
        }}
      >
        {title}
      </div>
    </div>
  );
};

export default SocialImage;
