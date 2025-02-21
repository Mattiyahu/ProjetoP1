import React from 'react';
import RichTextEditor from './RichTextEditor';

const RecipeForm = ({ recipe, onChange, onSubmit }) => {
    const handleRichTextChange = (field) => (content) => {
        onChange({
            target: {
                name: field,
                value: content
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
                    value={recipe.title}
                    onChange={onChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Descrição</label>
                <RichTextEditor
                    value={recipe.description}
                    onChange={handleRichTextChange('description')}
                    placeholder="Digite a descrição da receita..."
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Ingredientes</label>
                <RichTextEditor
                    value={recipe.ingredients}
                    onChange={handleRichTextChange('ingredients')}
                    placeholder="Liste os ingredientes..."
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Instruções</label>
                <RichTextEditor
                    value={recipe.instructions}
                    onChange={handleRichTextChange('instructions')}
                    placeholder="Descreva o modo de preparo..."
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Conteúdo Adicional</label>
                <RichTextEditor
                    value={recipe.content || ''}
                    onChange={handleRichTextChange('content')}
                    placeholder="Adicione conteúdo extra, como dicas nutricionais..."
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tempo de Preparo</label>
                <input
                    type="text"
                    name="preparation_time"
                    value={recipe.preparation_time}
                    onChange={onChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nível de Dificuldade</label>
                <select
                    name="difficulty_level"
                    value={recipe.difficulty_level}
                    onChange={onChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                >
                    <option value="easy">Fácil</option>
                    <option value="medium">Médio</option>
                    <option value="hard">Difícil</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">URL da Imagem</label>
                <input
                    type="url"
                    name="image_url"
                    value={recipe.image_url}
                    onChange={onChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                />
            </div>
            <div>
                <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    Adicionar Receita
                </button>
            </div>
        </form>
    );
};

export default RecipeForm;
