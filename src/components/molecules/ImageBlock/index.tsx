// src/components/molecules/ImageBlock/index.tsx
import React from 'react';
import Image from 'next/image';
import classNames from 'classnames';

// Define the HasAnnotation type with more flexibility
interface HasAnnotation {
  annotation?: {
    label?: string;
    description?: string;
    [key: string]: any;
  };
  [key: string]: any;
}

// Update ImageBlockProps to extend HasAnnotation
interface ImageBlockProps extends HasAnnotation, React.HTMLAttributes<HTMLDivElement> {
  url?: string | null;
  alt?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
  style?: React.CSSProperties;
  className?: string;
  'data-sb-object-id'?: string;
  'data-sb-field-path'?: string;
}

export default function ImageBlock(props: ImageBlockProps) {
  const {
    url,
    alt = '',
    width = 800,
    height = 600,
    priority = false,
    className,
    sizes = '(max-width: 768px) 100vw, 50vw',
    annotation,
    style,
    ...divProps
  } = props;

  // More robust URL handling
  if (!url || url.trim() === '') {
    return null;
  }

  // Fallback for blurDataURL
  const blurPlaceholder = `data:image/svg+xml;base64,${toBase64(shimmer(width, height))}`;

  return (
    <div 
      className={classNames(className, 'relative')} 
      style={style}
      aria-label={annotation?.label}
      {...divProps}
    >
      <Image
        src={url}
        alt={alt || annotation?.description || 'Image'}
        width={width}
        height={height}
        priority={priority}
        sizes={sizes}
        className="object-cover"
        placeholder="blur"
        blurDataURL={blurPlaceholder}
        onError={(e) => {
          console.error('Image loading error:', e);
          e.currentTarget.src = blurPlaceholder; // Fallback to placeholder
        }}
      />
      {annotation?.description && (
        <p className="text-sm text-gray-500 mt-2">
          {annotation.description}
        </p>
      )}
    </div>
  );
}

// Utility function for shimmer effect
function shimmer(w: number, h: number): string {
  return `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;
}

// Base64 encoding utility with error handling
function toBase64(str: string): string {
  try {
    return typeof window === 'undefined'
      ? Buffer.from(str).toString('base64')
      : window.btoa(str);
  } catch (error) {
    console.error('Base64 encoding error:', error);
    return ''; // Fallback to empty string
  }
}