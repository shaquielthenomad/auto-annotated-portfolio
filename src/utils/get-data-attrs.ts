export function getDataAttrs(props: Record<string, any> = {}): Record<string, any> {
    return Object.entries(props).reduce((dataAttrs: Record<string, any>, [key, value]: [string, any]) => {
        if (key.startsWith('data-')) {
            dataAttrs[key] = value;
        }
        return dataAttrs;
    }, {});
}
