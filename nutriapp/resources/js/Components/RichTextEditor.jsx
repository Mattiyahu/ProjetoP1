import React from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { AutoLinkNode } from '@lexical/link';
import { editorConfig } from './Editor/editorConfig';
import { convertToHtml, convertFromHtml, sanitizeHtml } from './Editor/utils/html';
import Toolbar from './Editor/Toolbar';
import AutoLinkPlugin from './Editor/plugins/AutoLinkPlugin';
import MarkdownPlugin from './Editor/plugins/MarkdownPlugin';

function PlaceholderPlugin({ placeholder }) {
    const [editor] = useLexicalComposerContext();
    const [isEditorEmpty, setIsEditorEmpty] = React.useState(true);

    React.useEffect(() => {
        return editor.registerUpdateListener(({ editorState }) => {
            editorState.read(() => {
                const root = editor.getRootElement();
                const isEmpty = root?.textContent?.trim().length === 0;
                setIsEditorEmpty(isEmpty);
            });
        });
    }, [editor]);

    if (!isEditorEmpty) {
        return null;
    }

    return <div className="editor-placeholder">{placeholder}</div>;
}

function InitialStatePlugin({ initialContent }) {
    const [editor] = useLexicalComposerContext();

    React.useEffect(() => {
        if (initialContent) {
            try {
                const sanitizedContent = sanitizeHtml(initialContent);
                convertFromHtml(sanitizedContent, editor);
            } catch (error) {
                console.error('Error setting initial content:', error);
            }
        }
    }, [editor, initialContent]);

    return null;
}

const RichTextEditor = ({ 
    value, 
    onChange, 
    placeholder = 'Comece a escrever...',
    className = ''
}) => {
    const config = {
        ...editorConfig,
        nodes: [...editorConfig.nodes, AutoLinkNode],
        onError: (error) => {
            console.error('Editor Error:', error);
        },
    };

    const handleChange = (editorState) => {
        if (onChange) {
            try {
                editorState.read(() => {
                    const html = convertToHtml(editorState);
                    const sanitizedHtml = sanitizeHtml(html);
                    onChange(sanitizedHtml);
                });
            } catch (error) {
                console.error('Error handling editor change:', error);
            }
        }
    };

    return (
        <div className={`lexical-editor-wrapper ${className}`}>
            <LexicalComposer initialConfig={config}>
                <div className="editor-shell">
                    <Toolbar />
                    <div className="editor-container">
                        <RichTextPlugin
                            contentEditable={
                                <ContentEditable className="editor-input" />
                            }
                            placeholder={
                                <PlaceholderPlugin placeholder={placeholder} />
                            }
                            ErrorBoundary={({ error }) => (
                                <div className="editor-error">
                                    <p>Erro ao carregar o editor:</p>
                                    <pre>{error.toString()}</pre>
                                </div>
                            )}
                        />
                        <InitialStatePlugin initialContent={value} />
                        <HistoryPlugin />
                        <ListPlugin />
                        <LinkPlugin />
                        <AutoLinkPlugin />
                        <MarkdownPlugin />
                        <OnChangePlugin onChange={handleChange} />
                    </div>
                </div>
            </LexicalComposer>
        </div>
    );
};

export default RichTextEditor;
