// src/types/svg.ts
import * as React from 'react';

export interface SVGComponentProps extends React.SVGProps<SVGSVGElement> {
  title?: string;
  className?: string;
}