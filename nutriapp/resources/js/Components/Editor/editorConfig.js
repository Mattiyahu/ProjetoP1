import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { ListItemNode, ListNode } from '@lexical/list';
import { LinkNode, AutoLinkNode } from '@lexical/link';
import { CodeNode } from '@lexical/code';

const urlMatcher = /((https?:\/\/(www\.)?)|(www\.))[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
const emailMatcher = /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

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
        AutoLinkNode,
        CodeNode,
    ],
    onError(error) {
        console.error(error);
    },
    matchers: [
        (text) => {
            const match = urlMatcher.exec(text);
            if (match === null) return null;
            return {
                index: match.index,
                length: match[0].length,
                text: match[0],
                url: match[0].startsWith('www.') ? `https://${match[0]}` : match[0],
                attributes: { rel: 'noreferrer noopener', target: '_blank' },
            };
        },
        (text) => {
            const match = emailMatcher.exec(text);
            if (match === null) return null;
            return {
                index: match.index,
                length: match[0].length,
                text: match[0],
                url: `mailto:${match[0]}`,
            };
        },
    ],
};
