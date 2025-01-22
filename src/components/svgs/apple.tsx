// src/components/svgs/apple.tsx
import React from 'react';
import { SVGComponentProps } from '@/types/svg';

export default function Apple({ className, title = 'Apple Icon' }: SVGComponentProps) {
  return (
    <svg className={className} aria-label={title}>
      {/* SVG content */}
    </svg>
  );
}