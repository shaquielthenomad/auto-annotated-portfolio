// src/components/Annotated.tsx
import * as React from 'react';
import { isDev } from '../utils/common';

// Constants for object ID and field path attributes
const OBJECT_ID_ATTR = 'data-sb-object-id' as const;
const FIELD_PATH_ATTR = 'data-sb-field-path' as const;

// Comprehensive HasAnnotation interface with controlled dynamic properties
interface HasAnnotation {
  annotation?: {
    label?: string;
    description?: string;
  };
  [OBJECT_ID_ATTR]?: string;
  [FIELD_PATH_ATTR]?: string;
}

// Type for content-based annotation
type AnnotatedProps = React.PropsWithChildren<{
  content: HasAnnotation;
}>;

// Type for field-level annotation
type AnnotatedFieldProps = React.PropsWithChildren<{
  path: string;
}>;

function annotationFromProps(props: HasAnnotation): Record<string, string> | undefined {
  // Check for direct attribute assignments first
  if (props[OBJECT_ID_ATTR]) {
    return { [OBJECT_ID_ATTR]: props[OBJECT_ID_ATTR] };
  }
  
  if (props[FIELD_PATH_ATTR]) {
    return { [FIELD_PATH_ATTR]: props[FIELD_PATH_ATTR] };
  }
  
  // Then check annotation object
  const { annotation } = props;
  if (annotation?.label) {
    return { [OBJECT_ID_ATTR]: annotation.label };
  }
  
  if (annotation?.description) {
    return { [FIELD_PATH_ATTR]: annotation.description };
  }
  
  return undefined;
}

const AnnotatedWrapperTag: React.FC<React.PropsWithChildren<{ 
  annotation: HasAnnotation 
}>> = ({ 
  annotation, 
  children 
}) => {
  const annotationData = annotationFromProps(annotation);
  
  return React.createElement('data', annotationData || {}, children);
};

export const Annotated: React.FC<AnnotatedProps> = (
  props: AnnotatedProps
): React.ReactElement => {
  const { children } = props;
  const baseResult = React.createElement(React.Fragment, null, children);

  // Development mode checks
  if (!isDev) {
    return baseResult;
  }

  if (!props.content) {
    console.warn('Annotated: no content property. Props:', props);
    return baseResult;
  }

  if (!children || (Array.isArray(children) && children.length !== 1)) {
    console.log('Annotated: provide a single child. Given:', children);
    return baseResult;
  }

  const annotation = annotationFromProps(props.content);
  if (annotation) {
    return React.createElement(AnnotatedWrapperTag, { annotation: props.content }, props.children);
  }

  console.warn('Annotated: no annotation in content. Props:', props);
  return baseResult;
};

export const AnnotatedField: React.FC<AnnotatedFieldProps> = (
  props: AnnotatedFieldProps
): React.ReactElement => {
  const content: HasAnnotation = { [FIELD_PATH_ATTR]: props.path };
  return React.createElement(Annotated, { content }, props.children);
};

export default Annotated;