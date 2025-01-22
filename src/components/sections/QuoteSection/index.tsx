import * as React from 'react';
import Markdown from 'markdown-to-jsx';
import classNames from 'classnames';

import { mapStylesToClassNames as mapStyles } from '../../../utils/map-styles-to-class-names';
import Section from '../Section';

// Define an interface for the component props
interface QuoteSectionProps {
    type?: string;
    elementId?: string;
    colors?: Record<string, string>;
    quote?: string;
    name?: string;
    title?: string;
    styles?: {
        self?: Record<string, string>;
        quote?: Record<string, string>;
        name?: Record<string, string>;
        title?: Record<string, string>;
    };
}

export default function QuoteSection(props: QuoteSectionProps) {
    const { type, elementId, colors, quote, name, title, styles = {} } = props;
    return (
        <Section type={type} elementId={elementId} colors={colors} styles={styles.self}>
            <blockquote>
                {quote && (
                    <Markdown
                        options={{ forceBlock: true, forceWrapper: true }}
                        className={classNames('sb-markdown', 'text-3xl', 'sm:text-5xl', 'sm:leading-tight', styles.quote ? mapStyles(styles.quote) : null)}
                    >
                        {quote}
                    </Markdown>
                )}
                {(name || title) && (
                    <footer className="mt-8 sm:mt-10">
                        {name && <span className={classNames('block', 'text-lg', 'sm:text-xl', styles.name ? mapStyles(styles.name) : null)}>{name}</span>}
                        {title && <span className={classNames('block', 'text-lg', 'sm:text-xl', styles.title ? mapStyles(styles.title) : null)}>{title}</span>}
                    </footer>
                )}
            </blockquote>
        </Section>
    );
}
