import * as React from 'react';
import classNames from 'classnames';
import { Annotated } from '@/components/Annotated';

// Define a strict type for color schemes
type ColorScheme = 'colors-a' | 'colors-b' | 'colors-c' | 'colors-d' | 'colors-e';

// Define an interface for QuoteSection props with strict typing
interface QuoteSectionProps {
    title?: string;
    subtitle?: string;
    quote: string;
    name?: string;
    colors?: ColorScheme;
    backgroundImage?: {
        src: string;
        alt?: string;
    };
    styles?: React.CSSProperties;
}

const QuoteSection: React.FC<QuoteSectionProps> = (props) => {
    const { title, subtitle, quote, name, colors = 'colors-a', backgroundImage, styles } = props;

    return (
        <Annotated content={props}>
            <section className={classNames('sb-section', colors)} style={styles}>
                {backgroundImage && (
                    <div className="sb-bg-image absolute inset-0">
                        <img src={backgroundImage.src} alt={backgroundImage.alt || 'Background'} className="w-full h-full object-cover" />
                    </div>
                )}
                <div className="sb-section-content relative">
                    {title && <h2 className="sb-section-title">{title}</h2>}
                    {subtitle && <p className="sb-section-subtitle">{subtitle}</p>}
                    <blockquote className="sb-quote">
                        <p>{quote}</p>
                        {name && <cite className="sb-quote-name">{name}</cite>}
                    </blockquote>
                </div>
            </section>
        </Annotated>
    );
};

export default QuoteSection;
