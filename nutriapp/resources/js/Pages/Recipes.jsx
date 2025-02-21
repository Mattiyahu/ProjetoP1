import React from 'react';
import AuthenticatedLayout from '../Layouts/AuthenticatedLayout';

const Recipes = () => {
    return (
        <AuthenticatedLayout>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Receitas</h2>
                    <p className="mt-4">Aqui você pode explorar e adicionar suas receitas saudáveis.</p>
                    {/* Add more content and functionality for recipes here */}
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Recipes;
