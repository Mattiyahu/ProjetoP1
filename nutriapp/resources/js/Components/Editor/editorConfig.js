import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { ListItemNode, ListNode } from '@lexical/list';
import { LinkNode } from '@lexical/link';
import { CodeNode } from '@lexical/code';

export const editorConfig = {
    namespace: 'NutriAppEditor',
    theme: {
        text: {
            bold: 'font-bold',
            italic: 'italic',
            underline: 'underline',
        },
        heading: {
            h1: 'text-3xl font-bold mb-4',
            h2: 'text-2xl font-bold mb-3',
            h3: 'text-xl font-bold mb-2',
        },
        list: {
            ul: 'list-disc ml-4 mb-4',
            ol: 'list-decimal ml-4 mb-4',
            listitem: 'mb-1',
        },
        link: 'text-blue-600 hover:text-blue-800 underline',
        quote: 'border-l-4 border-gray-300 pl-4 italic my-4',
        code: 'bg-gray-100 rounded p-1 font-mono text-sm',
    },
    nodes: [
        HeadingNode,
        QuoteNode,
        ListItemNode,
        ListNode,
        LinkNode,
        CodeNode,
    ],
    onError(error) {
        console.error(error);
    },
};
