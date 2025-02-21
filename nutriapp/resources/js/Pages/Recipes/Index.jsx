import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import RecipeForm from '../../Components/RecipeForm';
import RecipeCard from '../../Components/RecipeCard';

const Index = ({ auth }) => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newRecipe, setNewRecipe] = useState({
        title: '',
        description: '',
        ingredients: '',
        instructions: '',
        preparation_time: '',
        difficulty_level: 'medium',
        image_url: ''
    });

    useEffect(() => {
        fetchRecipes();
    }, []);

    const fetchRecipes = async () => {
        try {
            const response = await axios.get('/api/recipes');
            setRecipes(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to load recipes');
            setLoading(false);
            console.error('Error fetching recipes:', err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/recipes', newRecipe);
            setNewRecipe({
                title: '',
                description: '',
                ingredients: '',
                instructions: '',
                preparation_time: '',
                difficulty_level: 'medium',
                image_url: ''
            });
            fetchRecipes();
        } catch (err) {
            console.error('Error creating recipe:', err);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewRecipe(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Receitas Saudáveis</h2>}
        >
            <Head title="Receitas" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h3 className="text-lg font-medium mb-4">Adicionar Nova Receita</h3>
                        <RecipeForm
                            recipe={newRecipe}
                            onChange={handleInputChange}
                            onSubmit={handleSubmit}
                        />
                    </div>

                    <div className="mt-8">
                        <h3 className="text-lg font-medium mb-4">Receitas Disponíveis</h3>
                        {loading ? (
                            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
                                <p>Carregando receitas...</p>
                            </div>
                        ) : error ? (
                            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
                                <p className="text-red-600">{error}</p>
                            </div>
                        ) : (
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {recipes.map(recipe => (
                                    <RecipeCard key={recipe.id} recipe={recipe} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
