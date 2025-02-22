import { useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { TRANSFORMERS } from '@lexical/markdown';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';

const MARKDOWN_TRANSFORMERS = [
    ...TRANSFORMERS,
    {
        dependencies: [],
        export: () => null,
        regExp: /^(\*|\-|\+)\s/,
        replace: (textNode) => {
            const parent = textNode.getParent();
            if (parent && parent.getType() === 'list-item') {
                return null;
            }
            return {
                node: textNode,
                start: 0,
                end: textNode.getTextContent().length,
            };
        },
        type: 'element',
    },
];

export default function MarkdownPlugin() {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        return editor.registerUpdateListener(({ editorState }) => {
            editorState.read(() => {
                // You can add custom markdown handling here if needed
            });
        });
    }, [editor]);

    return <MarkdownShortcutPlugin transformers={MARKDOWN_TRANSFORMERS} />;
}
