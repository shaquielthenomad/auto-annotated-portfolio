declare module 'next/image' {
  import { StaticImageData } from 'next/dist/shared/lib/get-img-props';
  import { ImgHTMLAttributes } from 'react';

  interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    src: string | StaticImageData;
    alt: string;
    width?: number;
    height?: number;
    priority?: boolean;
    placeholder?: 'blur' | 'empty';
    blurDataURL?: string;
    sizes?: string;
  }

  export default function Image(props: ImageProps): JSX.Element;
  export { StaticImageData };
}
