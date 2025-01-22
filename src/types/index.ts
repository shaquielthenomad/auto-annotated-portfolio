import { Config, ContentObject, PostFeedLayout, PostLayout } from './generated';
import { ComponentType } from 'react';

export * from './base';
export * from './generated';

export interface PostFeedLayout {
  posts: any[];
  showDate?: boolean;
  showAuthor?: boolean;
}

export interface PostLayout {
  title: string;
  date: string;
  author?: string;
  content: string;
}

export interface ContentObject {
  [key: string]: any;
}

export interface SVGComponentProps {
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
