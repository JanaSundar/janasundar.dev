import { useEffect, useRef } from 'react';
import useSWR from 'swr';
import { fetcher } from '~helpers/fetcher';
import EyeIcon from './SVG/EyeIcon';
import { animate } from 'framer-motion';

interface Views {
  views: number;
  success: boolean;
}

interface Props {
  slug: string;
  isPreview: boolean;
}

export default function ViewCounter({ slug, isPreview }: Props) {
  const { data } = useSWR<Views>(`/api/views/${slug}`, fetcher);
  const views = data?.views ?? 0;
  const prevView = useRef(0);
  const nodeRef = useRef<HTMLParagraphElement>(null);

  const viewsCount = (views: number) => {
    const formatViews = new Intl.NumberFormat('en-US', {
      notation: 'compact',
      compactDisplay: 'short',
    });

    return formatViews.format(views);
  };

  useEffect(() => {
    const registerView = () =>
      fetch(`/api/views/${slug}`, {
        method: 'POST',
      });

    if (process.env.NODE_ENV === 'production' && !isPreview) {
      registerView();
    }
  }, [slug, isPreview]);

  useEffect(() => {
    const node = nodeRef.current!;

    const controls = animate(prevView.current, views, {
      duration: 0.2,
      onUpdate: (value) => {
        node.textContent = `${viewsCount(value).padStart(3, '0')} views`;
      },
    });

    prevView.current = views;

    return () => controls.stop();
  }, [views]);

  return (
    <span className="flex gap-2 items-center px-2">
      <EyeIcon />
      <p ref={nodeRef} />
    </span>
  );
}
