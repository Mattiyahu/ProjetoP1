import { $generateHtmlFromNodes, $generateNodesFromDOM } from '@lexical/html';
import { $getRoot, $createParagraphNode, $createTextNode } from 'lexical';

export function convertToHtml(editorState) {
    if (!editorState) return '';
    
    let html = '';
    try {
        // Get the text content directly from the editor state
        const textContent = editorState.read(() => {
            const root = $getRoot();
            return root.getTextContent();
        });

        // Convert text content to simple HTML paragraphs
        html = textContent
            .split('\n')
            .filter(line => line.trim())
            .map(line => `<p>${line}</p>`)
            .join('');
    } catch (error) {
        console.error('Error generating HTML:', error);
        html = '';
    }
    return html;
}

export function convertFromHtml(html, editor) {
    if (!editor) return;

    editor.update(() => {
        try {
            if (!html) {
                const paragraph = $createParagraphNode();
                paragraph.append($createTextNode(''));
                $getRoot().append(paragraph);
                return;
            }

            // Convert HTML to plain text
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;
            const text = tempDiv.textContent || tempDiv.innerText || '';

            // Create a new paragraph with the text
            const root = $getRoot();
            root.clear();
            const paragraph = $createParagraphNode();
            paragraph.append($createTextNode(text));
            root.append(paragraph);
        } catch (error) {
            console.error('Error converting from HTML:', error);
            const paragraph = $createParagraphNode();
            paragraph.append($createTextNode(''));
            $getRoot().append(paragraph);
        }
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
