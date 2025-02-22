import { useForm } from '@inertiajs/react';
import RichTextEditor from '@/Components/RichTextEditor';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

export default function EducationalContentForm({ content = null }) {
    const { data, setData, post, put, processing, errors } = useForm({
        title: content?.title || '',
        summary: content?.summary || '',
        content: content?.content || '',
        category: content?.category || 'nutrition',
        image_url: content?.image_url || '',
        tags: content?.tags || ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (content) {
            put(route('educational-content.update', content.id));
        } else {
            post(route('educational-content.store'));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <InputLabel htmlFor="title" value="Título" />
                <TextInput
                    id="title"
                    type="text"
                    name="title"
                    value={data.title}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('title', e.target.value)}
                />
                <InputError message={errors.title} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="summary" value="Resumo" />
                <textarea
                    id="summary"
                    name="summary"
                    value={data.summary}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    rows="3"
                    onChange={(e) => setData('summary', e.target.value)}
                />
                <InputError message={errors.summary} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="content" value="Conteúdo" />
                <RichTextEditor
                    value={data.content}
                    onChange={(content) => setData('content', content)}
                    placeholder="Escreva o conteúdo do artigo aqui..."
                />
                <InputError message={errors.content} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="category" value="Categoria" />
                <select
                    id="category"
                    name="category"
                    value={data.category}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    onChange={(e) => setData('category', e.target.value)}
                >
                    <option value="nutrition">Nutrição</option>
                    <option value="health">Saúde</option>
                    <option value="wellness">Bem-estar</option>
                    <option value="diet">Dieta</option>
                    <option value="lifestyle">Estilo de Vida</option>
                </select>
                <InputError message={errors.category} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="image_url" value="URL da Imagem" />
                <TextInput
                    id="image_url"
                    type="url"
                    name="image_url"
                    value={data.image_url}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('image_url', e.target.value)}
                />
                <InputError message={errors.image_url} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="tags" value="Tags (separadas por vírgula)" />
                <TextInput
                    id="tags"
                    type="text"
                    name="tags"
                    value={data.tags}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('tags', e.target.value)}
                />
                <InputError message={errors.tags} className="mt-2" />
            </div>

            <div className="flex items-center justify-end">
                <PrimaryButton type="submit" className="ml-4" disabled={processing}>
                    {content ? 'Atualizar Conteúdo' : 'Criar Conteúdo'}
                </PrimaryButton>
            </div>
        </form>
    );
}
