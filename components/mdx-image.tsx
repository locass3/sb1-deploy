import React from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

interface MDXImageProps {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
}

export const MDXImage: React.FC<MDXImageProps> = ({ src, alt, width, height }) => {
  const pathname = usePathname();

  // Check if the image source is a URL
  const isExternalImage = src.startsWith('http') || src.startsWith('https');

  // If it's not an external image, prepend the current path
  const imageSrc = isExternalImage ? src : `${pathname}${src}`;

  // Convert width and height to numbers if they're strings
  const numWidth = typeof width === 'string' ? parseInt(width, 10) : width || 800;
  const numHeight = typeof height === 'string' ? parseInt(height, 10) : height || 600;

  return (
    <div className="my-4">
      <Image
        src={imageSrc}
        alt={alt}
        width={numWidth}
        height={numHeight}
        layout="responsive"
        className="rounded-lg"
      />
    </div>
  );
};