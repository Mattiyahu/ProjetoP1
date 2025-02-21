import React from 'react';

const RecipeCard = ({ recipe }) => {
    return (
        <div className="border rounded-lg p-4 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow">
            {recipe.image_url && (
                <img
                    src={recipe.image_url}
                    alt={recipe.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                />
            )}
            <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100">{recipe.title}</h4>
            <p className="text-gray-600 dark:text-gray-400 mt-2 line-clamp-3">{recipe.description}</p>
            
            <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
                    {recipe.preparation_time}
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100">
                    {recipe.difficulty_level === 'easy' ? 'Fácil' :
                     recipe.difficulty_level === 'medium' ? 'Médio' : 'Difícil'}
                </span>
            </div>

            <div className="mt-4 space-y-2">
                <div className="collapse-content">
                    <h5 className="text-sm font-medium text-gray-900 dark:text-gray-100">Ingredientes:</h5>
                    <p className="text-gray-600 dark:text-gray-400 text-sm whitespace-pre-line">
                        {recipe.ingredients}
                    </p>
                </div>
                <div className="collapse-content">
                    <h5 className="text-sm font-medium text-gray-900 dark:text-gray-100">Instruções:</h5>
                    <p className="text-gray-600 dark:text-gray-400 text-sm whitespace-pre-line">
                        {recipe.instructions}
                    </p>
                </div>
            </div>

            <div className="mt-4 flex justify-end">
                <button
                    className="text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                    onClick={() => window.location.href = `/recipes/${recipe.id}`}
                >
                    Ver Detalhes →
                </button>
            </div>
        </div>
    );
};

export default RecipeCard;
