import { Link, router } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import DangerButton from '@/Components/DangerButton';

export default function RecipeCard({ recipe, canEdit, canDelete }) {
    const handleDelete = () => {
        if (confirm('Tem certeza que deseja excluir esta receita?')) {
            router.delete(route('recipes.destroy', recipe.id));
        }
    };

    return (
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            {recipe.image_url && (
                <div className="aspect-w-16 aspect-h-9">
                    <img
                        src={recipe.image_url}
                        alt={recipe.title}
                        className="object-cover w-full h-48"
                    />
                </div>
            )}
            <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{recipe.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{recipe.description}</p>
                
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div>
                        <span className="font-medium">Tempo:</span> {recipe.preparation_time}
                    </div>
                    <div>
                        <span className="font-medium">Dificuldade:</span>{' '}
                        {recipe.difficulty_level === 'easy' && 'Fácil'}
                        {recipe.difficulty_level === 'medium' && 'Médio'}
                        {recipe.difficulty_level === 'hard' && 'Difícil'}
                    </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                    <Link
                        href={route('recipes.show', recipe.id)}
                        className="text-blue-600 hover:text-blue-800"
                    >
                        Ver mais
                    </Link>

                    <div className="flex gap-2">
                        {canEdit && (
                            <Link href={route('recipes.edit', recipe.id)}>
                                <PrimaryButton type="button" className="text-sm">
                                    Editar
                                </PrimaryButton>
                            </Link>
                        )}

                        {canDelete && (
                            <DangerButton onClick={handleDelete} className="text-sm">
                                Excluir
                            </DangerButton>
                        )}
                    </div>
                </div>

                {recipe.user && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-500">
                            Criado por: {recipe.user.name}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
