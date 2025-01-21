// src/components/Annotated.tsx
import React, { PropsWithChildren } from 'react';
import { isDev } from '@/utils/common';

// Comprehensive HasAnnotation interface
interface HasAnnotation {
  annotation?: {
    label?: string;
    description?: string;
  };
  [key: string]: any; // Allow dynamic properties
}

// Constants for object ID and field path attributes
const objectIdAttr = 'data-sb-object-id';
const fieldPathAttr = 'data-sb-field-path';

// Type for content-based annotation
type AnnotatedProps = PropsWithChildren & {
  content: HasAnnotation;
};

// Type for field-level annotation
type AnnotatedFieldProps = PropsWithChildren & {
  path: string;
};

function annotationFromProps(props: HasAnnotation) {
  // Safely handle dynamic properties
  return props?.[objectIdAttr] 
    ? { [objectIdAttr]: props[objectIdAttr] } 
    : props?.[fieldPathAttr] 
    ? { [fieldPathAttr]: props[fieldPathAttr] } 
    : undefined;
}

const AnnotatedWrapperTag: React.FC<PropsWithChildren & { annotation: HasAnnotation }> = ({ 
  annotation, 
  children 
}) => {
  const annotationData = annotationFromProps(annotation);
  
  return (
    <data {...(annotationData || {})}>
      {children}
    </data>
  );
};

export const Annotated: React.FC<AnnotatedProps> = (props) => {
  const { children } = props;
  const baseResult = <>{children}</>;

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
    return <AnnotatedWrapperTag annotation={annotation}>{props.children}</AnnotatedWrapperTag>;
  }

  console.warn('Annotated: no annotation in content. Props:', props);
  return baseResult;
};

export const AnnotatedField: React.FC<AnnotatedFieldProps> = (props) => {
  const content: HasAnnotation = { [fieldPathAttr]: props.path };
  return <Annotated content={content}>{props.children}</Annotated>;
};

export default Annotated;