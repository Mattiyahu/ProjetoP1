import React from 'react';
import RichTextEditor from './RichTextEditor';

const EducationalContentForm = ({ content, onChange, onSubmit }) => {
    const handleRichTextChange = (field) => (value) => {
        onChange({
            target: {
                name: field,
                value
            }
        });
    };

    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Título</label>
                <input
                    type="text"
                    name="title"
                    value={content.title}
                    onChange={onChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Conteúdo</label>
                <RichTextEditor
                    value={content.body}
                    onChange={handleRichTextChange('body')}
                    placeholder="Digite o conteúdo educativo..."
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tipo de Conteúdo</label>
                <select
                    name="content_type"
                    value={content.content_type}
                    onChange={onChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                >
                    <option value="educational">Educacional</option>
                    <option value="nutritional">Nutricional</option>
                    <option value="health">Saúde</option>
                    <option value="lifestyle">Estilo de Vida</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                <select
                    name="status"
                    value={content.status}
                    onChange={onChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                >
                    <option value="draft">Rascunho</option>
                    <option value="published">Publicado</option>
                </select>
            </div>

            <div>
                <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    {content.id ? 'Atualizar Conteúdo' : 'Criar Conteúdo'}
                </button>
            </div>
        </form>
    );
};

export default EducationalContentForm;
