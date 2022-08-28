import Image, { ImageProps } from 'next/future/image';

export default function CustomImage(props: ImageProps) {
  return <Image alt={props.alt} className="rounded-lg" width={1200} height={600} priority {...props} />;
}
