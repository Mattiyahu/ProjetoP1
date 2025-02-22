import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
    FORMAT_TEXT_COMMAND,
    FORMAT_ELEMENT_COMMAND,
    UNDO_COMMAND,
    REDO_COMMAND,
} from 'lexical';
import {
    INSERT_ORDERED_LIST_COMMAND,
    INSERT_UNORDERED_LIST_COMMAND,
} from '@lexical/list';

const Toolbar = () => {
    const [editor] = useLexicalComposerContext();

    const formatText = (format) => {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
    };

    const formatElement = (format) => {
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, format);
    };

    return (
        <div className="border-b border-gray-200 p-2 flex gap-2 flex-wrap bg-white">
            <button
                onClick={() => formatElement('h1')}
                className="px-2 py-1 rounded hover:bg-gray-100"
                title="Título 1"
            >
                H1
            </button>
            <button
                onClick={() => formatElement('h2')}
                className="px-2 py-1 rounded hover:bg-gray-100"
                title="Título 2"
            >
                H2
            </button>
            <div className="border-l border-gray-200 mx-2" />
            <button
                onClick={() => formatText('bold')}
                className="px-2 py-1 rounded hover:bg-gray-100"
                title="Negrito"
            >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"/>
                </svg>
            </button>
            <button
                onClick={() => formatText('italic')}
                className="px-2 py-1 rounded hover:bg-gray-100"
                title="Itálico"
            >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4z"/>
                </svg>
            </button>
            <button
                onClick={() => formatText('underline')}
                className="px-2 py-1 rounded hover:bg-gray-100"
                title="Sublinhado"
            >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12 17c3.31 0 6-2.69 6-6V3h-2.5v8c0 1.93-1.57 3.5-3.5 3.5S8.5 12.93 8.5 11V3H6v8c0 3.31 2.69 6 6 6zm-7 2v2h14v-2H5z"/>
                </svg>
            </button>
            <div className="border-l border-gray-200 mx-2" />
            <button
                onClick={() => editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND)}
                className="px-2 py-1 rounded hover:bg-gray-100"
                title="Lista Numerada"
            >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M2 17h2v.5H3v1h1v.5H2v1h3v-4H2v1zm1-9h1V4H2v1h1v3zm-1 3h1.8L2 13.1v.9h3v-1H3.2L5 10.9V10H2v1zm5-6v2h14V5H7zm0 14h14v-2H7v2zm0-6h14v-2H7v2z"/>
                </svg>
            </button>
            <button
                onClick={() => editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND)}
                className="px-2 py-1 rounded hover:bg-gray-100"
                title="Lista com Marcadores"
            >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z"/>
                </svg>
            </button>
            <div className="border-l border-gray-200 mx-2" />
            <button
                onClick={() => editor.dispatchCommand(UNDO_COMMAND)}
                className="px-2 py-1 rounded hover:bg-gray-100"
                title="Desfazer"
            >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z"/>
                </svg>
            </button>
            <button
                onClick={() => editor.dispatchCommand(REDO_COMMAND)}
                className="px-2 py-1 rounded hover:bg-gray-100"
                title="Refazer"
            >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16c1.05-3.19 4.05-5.5 7.6-5.5 1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6z"/>
                </svg>
            </button>
        </div>
    );
};

export default Toolbar;
