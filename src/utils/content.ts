import fs from 'fs';
import path from 'path';
import glob from 'glob';
import frontmatter from 'front-matter';
import { ContentObject } from '../types';
import * as types from '@/types';
import { isDev } from './common';
import { PAGE_MODEL_NAMES, PageModelType } from '@/types/generated';

type StackbitModel = Record<string, unknown>;
type StackbitField = Record<string, unknown>;

const contentBaseDir = 'content';
const pagesBaseDir = contentBaseDir + '/pages';

const allModels: StackbitModel[] = []; // Placeholder, replace with actual models if needed

function contentFilesInPath(basePath: string): string[] {
    const globPattern = path.join(basePath, '**', '*.{md,json}');
    return glob.sync(globPattern);
}

function readContent(file: string): ContentObject | null {
    const rawContent = fs.readFileSync(file, 'utf8');
    let content: ContentObject | null = null;
    
    switch (path.extname(file).substring(1)) {
        case 'md':
            const parsedMd = frontmatter<Record<string, any>>(rawContent);
            content = {
                ...parsedMd.attributes,
                content: parsedMd.body
            };
            break;
        case 'json':
            content = JSON.parse(rawContent);
            break;
    }

    return content;
}

function resolveReferences(
    content: ContentObject, 
    fileToContent: Record<string, ContentObject>
): void {
    if (!content || !content.type) return;

    const modelName = content.type;
    // Add reference resolution logic here
}

function deepClone<T>(o: T): T {
    return JSON.parse(JSON.stringify(o));
}

export function getFieldValue(
    model: StackbitModel, 
    field: string
): ContentObject | null {
    if (!model || !field) return null;
    
    const value = model[field];
    return value ? value as ContentObject : null;
}

export function allContent(): ContentObject[] {
    let objects = contentFilesInPath(contentBaseDir)
        .map((file) => readContent(file))
        .filter((obj): obj is ContentObject => obj !== null);

    const fileToContent: Record<string, ContentObject> = Object.fromEntries(
        objects.map((e) => [e.__metadata?.id, e])
    );
    
    objects.forEach((e) => resolveReferences(e, fileToContent));

    return objects.map((e) => deepClone(e));
}

export function allPages(allData: ContentObject[]): PageModelType[] {
    return allData.filter((obj): obj is PageModelType => 
        PAGE_MODEL_NAMES.includes(obj.__metadata?.modelName)
    );
}

export function resolveStaticProps(
    contentObject: ContentObject, 
    fieldName: string
): string | undefined {
    return contentObject && contentObject[fieldName] as string;
}

// Optional: Add type guard function
function isContentObject(o: unknown): o is ContentObject {
    return o !== null && typeof o === 'object';
}
