import {
    Config,
    ContentObject,
    ContentObjectType,
    GlobalProps,
    PageComponentProps,
    RecentPostsSection,
    RecentProjectsSection,
    PostFeedLayout,
    ProjectFeedLayout
} from '@/types';

import { deepMapObject } from './data-utils';

// Extend the base ContentObject type with optional date
type DateContentObject = ContentObject & {
    date?: string;
};

export function resolveStaticProps(urlPath: string, allData: ContentObject[]): PageComponentProps {
    const originalPage = allData.find((obj) => obj.__metadata.urlPath === urlPath);
    const globalProps: GlobalProps = {
        site: allData.find((obj) => obj.__metadata.modelName === 'Config') as Config
    };

    function enrichContent(value: any) {
        if (value && typeof value === 'object' && value.__metadata?.modelName) {
            const type = value.__metadata.modelName as ContentObjectType;
            const resolver = PropsResolvers[type];
            return resolver ? resolver(value, allData) : value;
        }
        return value;
    }

    const enrichedPage = deepMapObject(originalPage, enrichContent) as ContentObject;
    return {
        ...enrichedPage,
        global: globalProps
    };
}

type ResolverFunction = (props: ContentObject, allData: ContentObject[]) => ContentObject;

const PropsResolvers: Partial<Record<ContentObjectType, ResolverFunction>> = {
    PostFeedLayout: (props, allData) => {
        const allPosts = getAllPostsSorted(allData);
        return {
            ...(props as PostFeedLayout),
            items: allPosts
        };
    },
    RecentPostsSection: (props, allData) => {
        const recentPosts = getAllPostsSorted(allData).slice(0, (props as RecentPostsSection).recentCount || 3);
        return {
            ...(props as RecentPostsSection),
            items: recentPosts
        };
    },
    ProjectFeedLayout: (props, allData) => {
        const allProjects = getAllProjectsSorted(allData);
        return {
            ...(props as ProjectFeedLayout),
            items: allProjects
        };
    },
    RecentProjectsSection: (props, allData) => {
        const recentProjects = getAllProjectsSorted(allData).slice(0, (props as RecentProjectsSection).recentCount || 3);
        return {
            ...(props as RecentProjectsSection),
            items: recentProjects
        };
    }
};

function getAllPostsSorted(objects: ContentObject[]) {
    return (objects as DateContentObject[])
        .filter((obj) => obj.__metadata.modelName === 'Post' && obj.date)
        .sort((a, b) => new Date(b.date!).getTime() - new Date(a.date!).getTime());
}

function getAllProjectsSorted(objects: ContentObject[]) {
    return (objects as DateContentObject[])
        .filter((obj) => obj.__metadata.modelName === 'Project' && obj.date)
        .sort((a, b) => new Date(b.date!).getTime() - new Date(a.date!).getTime());
}
