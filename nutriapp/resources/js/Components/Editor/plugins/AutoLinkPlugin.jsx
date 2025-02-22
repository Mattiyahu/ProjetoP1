import { AutoLinkNode } from '@lexical/link';
import { AutoLinkPlugin as LexicalAutoLinkPlugin } from '@lexical/react/LexicalAutoLinkPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect } from 'react';

const urlMatcher = (text) => {
    const urlRegex = /((https?:\/\/(www\.)?)|(www\.))[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/gi;
    const match = urlRegex.exec(text);
    if (match === null) {
        return null;
    }
    const fullMatch = match[0];
    return {
        index: match.index,
        length: fullMatch.length,
        text: fullMatch,
        url: fullMatch.startsWith('www.') ? `https://${fullMatch}` : fullMatch,
        attributes: { rel: 'noreferrer noopener', target: '_blank' },
    };
};

const emailMatcher = (text) => {
    const emailRegex = /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/gi;
    const match = emailRegex.exec(text);
    if (match === null) {
        return null;
    }
    const fullMatch = match[0];
    return {
        index: match.index,
        length: fullMatch.length,
        text: fullMatch,
        url: `mailto:${fullMatch}`,
    };
};

function RegisterAutoLinkNode() {
    const [editor] = useLexicalComposerContext();
    
    useEffect(() => {
        if (!editor.hasNodes([AutoLinkNode])) {
            editor.registerNodes([AutoLinkNode]);
        }
    }, [editor]);

    return null;
}

export default function AutoLinkPlugin() {
    return (
        <>
            <RegisterAutoLinkNode />
            <LexicalAutoLinkPlugin matchers={[urlMatcher, emailMatcher]} />
        </>
    );
}
