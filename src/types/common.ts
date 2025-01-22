// Common type definitions to improve type safety across the project

export type Nullable<T> = T | null | undefined;

export interface GenericObject {
  [key: string]: any;
}

export interface BaseProps {
  className?: string;
  children?: React.ReactNode;
}

export type MapFunction<T, R> = (item: T, index: number) => R;

export interface Action {
  label?: string;
  url?: string;
  elementId?: string;
}

export type StringOrNumber = string | number;

export interface TypedContentObject {
  type?: string;
  __metadata?: {
    id?: string;
    modelName?: string;
  };
}
