import { $generateHtmlFromNodes, $generateNodesFromDOM } from '@lexical/html';
import { $getRoot, $createParagraphNode, $createTextNode } from 'lexical';

export function convertToHtml(editorState) {
    let html = '';
    editorState.read(() => {
        html = $generateHtmlFromNodes(editorState);
    });
    return html;
}

export function convertFromHtml(html, editor) {
    editor.update(() => {
        if (!html) {
            const paragraph = $createParagraphNode();
            paragraph.append($createTextNode(''));
            $getRoot().append(paragraph);
            return;
        }

        const parser = new DOMParser();
        const dom = parser.parseFromString(html, 'text/html');
        const nodes = $generateNodesFromDOM(editor, dom);
        
        const root = $getRoot();
        root.clear();
        nodes.forEach((node) => root.append(node));
    });
}

export function sanitizeHtml(html) {
    if (!html) return '';
    
    // Basic XSS prevention
    return html
        .replace(/javascript:/gi, '')
        .replace(/on\w+=/gi, '')
        .replace(/data:/gi, '')
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
}

export function isValidHtml(html) {
    if (!html) return false;
    
    try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        return Array.from(doc.body.childNodes).some(node => 
            node.nodeType === 1 || 
            (node.nodeType === 3 && node.textContent.trim().length > 0)
        );
    } catch (e) {
        return false;
    }
}
