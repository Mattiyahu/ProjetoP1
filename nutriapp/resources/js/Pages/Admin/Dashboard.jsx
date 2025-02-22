import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';

export default function AdminDashboard({ auth }) {
    const canManageContent = auth.user.roles.some(role => 
        ['admin', 'professional master', 'professional'].includes(role.name)
    );

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Painel Administrativo</h2>}
        >
            <Head title="Painel Administrativo" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-medium mb-4">Gerenciamento de Conteúdo</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {auth.user.roles.some(role => role.name === 'admin') && (
                                    <>
                                        {/* Card para Strapi Admin */}
                                        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                                            <h4 className="text-xl font-semibold mb-2">Strapi Admin</h4>
                                            <p className="text-gray-600 mb-4">
                                                Acesse o painel administrativo do Strapi para gerenciar posts e publicações.
                                            </p>
                                            <a
                                                href="http://localhost:1337/admin"
                                                target="_blank"
                                                className="inline-flex items-center px-4 py-2 bg-primary-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-primary-700 focus:bg-primary-700 active:bg-primary-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                            >
                                                Acessar Strapi
                                            </a>
                                        </div>

                                        {/* Card para Gerenciar Usuários */}
                                        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                                            <h4 className="text-xl font-semibold mb-2">Usuários</h4>
                                            <p className="text-gray-600 mb-4">
                                                Gerencie usuários, roles e permissões do sistema.
                                            </p>
                                            <Link
                                                href={route('admin.users')}
                                                className="inline-flex items-center px-4 py-2 bg-primary-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-primary-700 focus:bg-primary-700 active:bg-primary-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                            >
                                                Gerenciar Usuários
                                            </Link>
                                        </div>

                                        {/* Card para Configurações */}
                                        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                                            <h4 className="text-xl font-semibold mb-2">Configurações</h4>
                                            <p className="text-gray-600 mb-4">
                                                Configure as opções gerais do sistema.
                                            </p>
                                            <Link
                                                href={route('admin.settings')}
                                                className="inline-flex items-center px-4 py-2 bg-primary-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-primary-700 focus:bg-primary-700 active:bg-primary-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                            >
                                                Configurações
                                            </Link>
                                        </div>
                                    </>
                                )}

                                {canManageContent && (
                                    <>
                                        {/* Card para Conteúdo Educativo */}
                                        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                                            <h4 className="text-xl font-semibold mb-2">Conteúdo Educativo</h4>
                                            <p className="text-gray-600 mb-4">
                                                Crie e gerencie o conteúdo educativo para os usuários.
                                            </p>
                                            <div className="space-y-2">
                                                <a
                                                    href="http://localhost:1337/admin/content-manager/collectionType/api::educational-content.educational-content"
                                                    target="_blank"
                                                    className="inline-flex items-center px-4 py-2 bg-primary-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-primary-700 focus:bg-primary-700 active:bg-primary-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                                >
                                                    Gerenciar Conteúdo
                                                </a>
                                            </div>
                                        </div>

                                        {/* Card para Receitas */}
                                        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                                            <h4 className="text-xl font-semibold mb-2">Receitas</h4>
                                            <p className="text-gray-600 mb-4">
                                                Crie e gerencie receitas saudáveis para os usuários.
                                            </p>
                                            <div className="space-y-2">
                                                <a
                                                    href="http://localhost:1337/admin/content-manager/collectionType/api::recipe.recipe"
                                                    target="_blank"
                                                    className="inline-flex items-center px-4 py-2 bg-primary-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-primary-700 focus:bg-primary-700 active:bg-primary-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                                >
                                                    Gerenciar Receitas
                                                </a>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
