import { useForm } from '@inertiajs/react';
import RichTextEditor from '@/Components/RichTextEditor';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

export default function RecipeForm({ recipe = null, action }) {
    const { data, setData, post, put, processing, errors } = useForm({
        title: recipe?.title || '',
        description: recipe?.description || '',
        ingredients: recipe?.ingredients || '',
        instructions: recipe?.instructions || '',
        preparation_time: recipe?.preparation_time || '',
        difficulty_level: recipe?.difficulty_level || 'easy',
        image_url: recipe?.image_url || '',
        content: recipe?.content || ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (recipe) {
            put(route('recipes.update', recipe.id));
        } else {
            post(route('recipes.store'));
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
                <InputLabel htmlFor="description" value="Descrição" />
                <textarea
                    id="description"
                    name="description"
                    value={data.description}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    rows="3"
                    onChange={(e) => setData('description', e.target.value)}
                />
                <InputError message={errors.description} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="ingredients" value="Ingredientes" />
                <RichTextEditor
                    value={data.ingredients}
                    onChange={(content) => setData('ingredients', content)}
                    placeholder="Liste os ingredientes aqui..."
                />
                <InputError message={errors.ingredients} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="instructions" value="Instruções" />
                <RichTextEditor
                    value={data.instructions}
                    onChange={(content) => setData('instructions', content)}
                    placeholder="Descreva o modo de preparo..."
                />
                <InputError message={errors.instructions} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="preparation_time" value="Tempo de Preparo" />
                <TextInput
                    id="preparation_time"
                    type="text"
                    name="preparation_time"
                    value={data.preparation_time}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('preparation_time', e.target.value)}
                />
                <InputError message={errors.preparation_time} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="difficulty_level" value="Nível de Dificuldade" />
                <select
                    id="difficulty_level"
                    name="difficulty_level"
                    value={data.difficulty_level}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    onChange={(e) => setData('difficulty_level', e.target.value)}
                >
                    <option value="easy">Fácil</option>
                    <option value="medium">Médio</option>
                    <option value="hard">Difícil</option>
                </select>
                <InputError message={errors.difficulty_level} className="mt-2" />
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
                <InputLabel htmlFor="content" value="Conteúdo Adicional" />
                <RichTextEditor
                    value={data.content}
                    onChange={(content) => setData('content', content)}
                    placeholder="Informações adicionais sobre a receita..."
                />
                <InputError message={errors.content} className="mt-2" />
            </div>

            <div className="flex items-center justify-end">
                <PrimaryButton type="submit" className="ml-4" disabled={processing}>
                    {recipe ? 'Atualizar Receita' : 'Criar Receita'}
                </PrimaryButton>
            </div>
        </form>
    );
}
