import Image, { ImageProps } from 'next/future/image';

export default function CustomImage({ alt, ...props }: ImageProps) {
  return <Image alt={alt} className="rounded-lg" width={1200} height={600} priority {...props} />;
}
