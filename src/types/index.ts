import { Config } from './generated';
import { ComponentType } from 'react';

export * from './base';
export * from './generated';

export type ContentObject = {
  [key: string]: any;
}

export type PostFeedLayout = {
  posts: any[];
  showDate?: boolean;
  showAuthor?: boolean;
}

export type PostLayout = {
  title: string;
  date: string;
  author?: string;
  content: string;
}

export type SVGComponentProps = {
  className?: string;
  title?: string;
}

export type ComponentRegistry = {
  [key: string]: ComponentType<any>;
}

export type GlobalProps = {
    site: Config;
};

export type PageComponentProps = ContentObject & {
    global: GlobalProps;
};
