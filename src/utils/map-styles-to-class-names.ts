type TailwindMapValue = {
    [key: string]: string;
} | ((value: any) => string);

const TAILWIND_MAP: Record<string, TailwindMapValue> = {
    alignItems: {
        'flex-start': 'items-start',
        'flex-end': 'items-end',
        center: 'items-center'
    },
    backgroundPosition: {
        bottom: 'bg-bottom',
        center: 'bg-center',
        left: 'bg-left',
        'left-bottom': 'bg-left-bottom',
        'left-top': 'bg-left-top',
        right: 'bg-right',
        'right-bottom': 'bg-right-bottom',
        'right-top': 'bg-right-top',
        top: 'bg-top'
    },
    backgroundRepeat: {
        repeat: 'bg-repeat',
        'repeat-x': 'bg-repeat-x',
        'repeat-y': 'bg-repeat-y',
        'no-repeat': 'bg-no-repeat'
    },
    backgroundSize: {
        auto: 'bg-auto',
        cover: 'bg-cover',
        contain: 'bg-contain'
    },
    borderRadius: {
        none: 'rounded-none',
        'xx-small': 'rounded-sm',
        'x-small': 'rounded',
        small: 'rounded-md',
        medium: 'rounded-lg',
        large: 'rounded-xl',
        'x-large': 'rounded-2xl',
        'xx-large': 'rounded-3xl',
        full: 'rounded-full'
    },
    borderStyle: {
        none: 'border-none',
        solid: 'border-solid',
        dashed: 'border-dashed',
        dotted: 'border-dotted',
        double: 'border-double'
    },
    fontStyle: {
        italic: 'italic'
    },
    fontWeight: {
        400: 'font-normal',
        500: 'font-medium',
        700: 'font-bold'
    },
    height: {
        auto: 'min-h-0',
        screen: 'min-h-screen'
    },
    justifyContent: {
        'flex-start': 'justify-start',
        'flex-end': 'justify-end',
        center: 'justify-center'
    },
    margin: (value: any) => {
        // for tailwind margins - ['twt0:16', 'twb0:16'], the value will be array ['mt-0', 'mb-4']
        if (Array.isArray(value)) {
            return value.join(' ');
        }
        // for regular margins - ['x0:8', 'y0:16'], the value will be object: { left: 4, top: 10 }
        // this object can not be converted into classes and needs to be handled differently
        console.warn('cannot convert "margin" style field value to class name');
        return '';
    },
    padding: (value: any) => {
        // for tailwind paddings - ['twt0:16', 'twb0:16'], the value will be array ['pt-0', 'pb-4']
        if (Array.isArray(value)) {
            return value.join(' ');
        }
        // for regular paddings - ['x0:8', 'y0:16'], the value will be object: { left: 4, top: 10 }
        // this object can not be converted into classes and needs to be handled differently
        console.warn('cannot convert "padding" style field value to class name');
        return '';
    },
    textAlign: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
        justify: 'text-justify'
    },
    textDecoration: {
        underline: 'underline',
        'line-through': 'line-through'
    },
    width: {
        narrow: 'max-w-5xl',
        wide: 'max-w-7xl',
        full: 'max-w-full'
    }
};

export function mapStylesToClassNames(styles: Record<string, any>): string {
    return Object.entries(styles)
        .map(([prop, value]) => {
            const mapEntry = TAILWIND_MAP[prop];
            if (mapEntry) {
                if (typeof mapEntry === 'function') {
                    return mapEntry(value);
                } else if (typeof value === 'string' && value in mapEntry) {
                    return mapEntry[value];
                }
            }
            // if prop or value don't exist in the map, use the value as is,
            // useful for direct color values.
            return value;
        })
        .filter(Boolean)
        .join(' ');
}
