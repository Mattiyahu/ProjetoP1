import React from 'react';
import RichTextEditor from './RichTextEditor';
import InputError from './InputError';
import InputLabel from './InputLabel';
import TextInput from './TextInput';
import PrimaryButton from './PrimaryButton';

export default function EducationalContentForm({ content, onChange, onSubmit }) {
    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div>
                <InputLabel htmlFor="title" value="Título" />
                <TextInput
                    id="title"
                    type="text"
                    name="title"
                    value={content.title}
                    className="mt-1 block w-full"
                    onChange={onChange}
                    required
                />
            </div>

            <div>
                <InputLabel htmlFor="summary" value="Resumo" />
                <textarea
                    id="summary"
                    name="summary"
                    value={content.summary}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    rows="3"
                    onChange={onChange}
                    required
                />
            </div>

            <div>
                <InputLabel htmlFor="content" value="Conteúdo" />
                <RichTextEditor
                    value={content.content}
                    onChange={(value) => onChange({ target: { name: 'content', value } })}
                    placeholder="Escreva o conteúdo aqui..."
                />
            </div>

            <div>
                <InputLabel htmlFor="category" value="Categoria" />
                <select
                    id="category"
                    name="category"
                    value={content.category}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    onChange={onChange}
                >
                    <option value="nutrition">Nutrição</option>
                    <option value="health">Saúde</option>
                    <option value="wellness">Bem-estar</option>
                    <option value="diet">Dieta</option>
                    <option value="lifestyle">Estilo de Vida</option>
                </select>
            </div>

            <div>
                <InputLabel htmlFor="image_url" value="URL da Imagem" />
                <TextInput
                    id="image_url"
                    type="url"
                    name="image_url"
                    value={content.image_url}
                    className="mt-1 block w-full"
                    onChange={onChange}
                />
            </div>

            <div>
                <InputLabel htmlFor="tags" value="Tags (separadas por vírgula)" />
                <TextInput
                    id="tags"
                    type="text"
                    name="tags"
                    value={content.tags}
                    className="mt-1 block w-full"
                    onChange={onChange}
                />
            </div>

            <div>
                <InputLabel htmlFor="status" value="Status" />
                <select
                    id="status"
                    name="status"
                    value={content.status}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    onChange={onChange}
                >
                    <option value="draft">Rascunho</option>
                    <option value="published">Publicado</option>
                </select>
            </div>

            <div className="flex items-center justify-end">
                <PrimaryButton type="submit">
                    {content.id ? 'Atualizar Conteúdo' : 'Criar Conteúdo'}
                </PrimaryButton>
            </div>
        </form>
    );
}
