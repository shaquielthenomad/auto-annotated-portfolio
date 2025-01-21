// src/types/global.ts
import React from 'react';

export type AnyObject = { [key: string]: any };

export type PropsWithClassName = {
  className?: string;
};

export type MapFunction<T, R = any> = (item: T, index: number) => R;

export type ReactComponentProps<T = AnyObject> = React.PropsWithChildren<T>;

export interface HasAnnotation {
  annotation?: {
    label?: string;
    description?: string;
  };
  [key: string]: any;
}

export type NullableString = string | null | undefined;