import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import RecipeCard from '@/Components/RecipeCard';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Index({ auth, recipes }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Receitas</h2>
                    {auth.user.permissions.includes('create recipes') && (
                        <Link href={route('recipes.create')}>
                            <PrimaryButton type="button">
                                Nova Receita
                            </PrimaryButton>
                        </Link>
                    )}
                </div>
            }
        >
            <Head title="Receitas" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {recipes.map((recipe) => (
                            <RecipeCard
                                key={recipe.id}
                                recipe={recipe}
                                canEdit={auth.user.permissions.includes('edit recipes')}
                                canDelete={auth.user.permissions.includes('delete recipes')}
                            />
                        ))}
                    </div>
                    {recipes.length === 0 && (
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900 text-center">
                                Nenhuma receita encontrada.
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
