import * as React from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import { Annotated } from '@/components/Annotated';

interface ImageBlockProps {
    elementId?: string;
    className?: string;
    url: string;
    altText?: string;
    width?: number;
    height?: number;
    priority?: boolean;
}

export default function ImageBlock(props: ImageBlockProps) {
    const { 
        elementId, 
        className, 
        url, 
        altText = '', 
        width = 500,  // Add default width
        height = 300, // Add default height
        priority = false // Optional priority for above-the-fold images
    } = props;

    if (!url) {
        return null;
    }

    return (
        <Annotated content={props}>
            <Image
                id={elementId || undefined}
                className={classNames(
                    'sb-component', 
                    'sb-component-block', 
                    'sb-component-image-block', 
                    className
                )}
                src={url}
                alt={altText}
                width={width}
                height={height}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ 
                    objectFit: 'cover',
                    width: '100%',
                    height: 'auto'
                }}
                priority={priority}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gIoSUNDX1BST0ZJTEUAAQEAAAIYAAAAAAIQAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAAHRyWFlaAAABZAAAABRnWFlaAAABeAAAABRiWFlaAAABjAAAABRyVFJDAAABoAAAAChnVFJDAAABoAAAAChiVFJDAAABoAAAACh3dHB0AAAByAAAABRjcHJ0AAAB3AAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAFgAAAAcAHMAUgBHAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z3BhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABYWVogAAAAAAAA9tYAAQAAAADTLW1sdWMAAAAAAAAAAQAAAAxlblVTAAAAIAAAABwARwBvAG8AZwBsAGUAIABJAG4AYwAuACAAMgAwADEANv/bAEMAFA4PEg8NFBIQEhcVFBgeMiEeHBwZISUqKSgnJzFAMCwxJkBDQjhkXWlwYmRkYzVAMDxKbk9TUzRKRkJvbWFocP/bAEMBFRcXHhoeNyEhNUc0NTRHREBAQERAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQP/AABEIAAYACgMBIgACEQEDEQH/xAAVAAEBAAAAAAAAAAAAAAAAAAAABf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAVAQEBAAAAAAAAAAAAAAAAAAADBP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AJgAH//Z"
            />
        </Annotated>
    );
}