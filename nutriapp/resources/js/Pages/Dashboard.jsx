import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import axios from 'axios';
import { useEffect } from 'react';

export default function Dashboard({ auth, token }) {
    useEffect(() => {
        const setupAuth = async () => {
            try {
                // Store the token in sessionStorage if it exists
                if (token) {
                    window.sessionStorage.setItem('token', token);
                    
                    // Set up axios defaults
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    axios.defaults.withCredentials = true;
                    
                    // Get CSRF token
                    await axios.get('/sanctum/csrf-cookie');
                }
            } catch (error) {
                console.error('Error setting up auth:', error);
            }
        };
        
        setupAuth();
    }, [token]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                                    Saúde Mental
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-4">
                                    Responda ao questionário sobre sua saúde mental.
                                </p>
                                <Link
                                    href="/purple-questions"
                                    className="inline-flex items-center px-4 py-2 bg-purple-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-purple-700 focus:bg-purple-700 active:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                >
                                    Acessar Questionário
                                </Link>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                                    Acompanhamento Alimentar
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-4">
                                    Registre seu consumo alimentar diário e acompanhe seus hábitos.
                                </p>
                                <Link
                                    href="/food-tracking"
                                    className="inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700 focus:bg-green-700 active:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                >
                                    Registrar Alimentação
                                </Link>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                                    Recordatório 24h
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-4">
                                    Registre seu consumo alimentar nas últimas 24 horas.
                                </p>
                                <Link
                                    href="/r24h-questionnaire"
                                    className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                >
                                    Preencher Recordatório
                                </Link>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                                    Receitas Saudáveis
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-4">
                                    Explore receitas nutritivas e saudáveis para seu dia a dia.
                                </p>
                                <Link
                                    href="/recipes"
                                    className="inline-flex items-center px-4 py-2 bg-orange-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-orange-700 focus:bg-orange-700 active:bg-orange-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                >
                                    Ver Receitas
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
