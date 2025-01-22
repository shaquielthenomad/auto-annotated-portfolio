import * as React from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css';
import { funky } from 'react-syntax-highlighter/dist/cjs/styles/prism';

SyntaxHighlighter.registerLanguage('javascript', js);
SyntaxHighlighter.registerLanguage('css', css);

interface CodeBlockProps {
    className?: string;
    children: React.ReactNode;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ className, children }) => {
    let lang = 'text'; // default monospaced text
    if (className && className.startsWith('lang-')) {
        lang = className.replace('lang-', '');
    }
    return (
        <SyntaxHighlighter language={lang} style={funky} wrapLongLines>
            {children}
        </SyntaxHighlighter>
    );
};

interface HighlightedPreBlockProps {
    children: React.ReactNode;
    [key: string]: any;
}

// markdown-to-jsx uses <pre><code/></pre> for code blocks.
const HighlightedPreBlock: React.FC<HighlightedPreBlockProps> = ({ children, ...rest }) => {
    if ('type' in children && children['type'] === 'code') {
        return CodeBlock(children['props']);
    }
    return <pre {...rest}>{children}</pre>;
};

export default HighlightedPreBlock;
