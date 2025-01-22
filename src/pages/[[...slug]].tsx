import { GetStaticProps } from 'next';
import { allContent } from '@/utils/content';
import { PageModelType } from '@/types/generated';
import { getComponent } from '@/components/components-registry';

type Props = {
    page: PageModelType;
};

export default function Page({ page }: Props) {
    const Component = getComponent(page.type);
    return <Component {...page} />;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const slug = params?.slug ? (Array.isArray(params.slug) ? params.slug.join('/') : params.slug) : 'index';
    const page = allContent().find((page) => page.__metadata.urlPath === `/${slug}`);

    if (!page) {
        return {
            notFound: true
        };
    }

    return {
        props: {
            page
        }
    };
};

export async function getStaticPaths() {
    const paths = allContent()
        .filter((page) => page.__metadata.urlPath)
        .map((page) => ({
            params: { slug: page.__metadata.urlPath === '/' ? [] : page.__metadata.urlPath.slice(1).split('/') }
        }));

    return {
        paths,
        fallback: false
    };
}
