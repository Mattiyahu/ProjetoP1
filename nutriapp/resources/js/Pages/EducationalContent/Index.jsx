import React from 'react';
import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';

const EducationalContentIndex = () => {
    const { auth, contents } = usePage().props;
    const canCreate = auth.user.permissions.includes('create educational content');

    return (
        <AuthenticatedLayout>
            <Head title="Conteúdo Educativo" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                                    Conteúdo Educativo
                                </h2>
                                {canCreate && (
                                    <Link
                                        href={route('educational.content.create')}
                                        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                                    >
                                        Criar Novo Conteúdo
                                    </Link>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {contents?.map((content) => (
                                    <div
                                        key={content.id}
                                        className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden"
                                    >
                                        <div className="p-6">
                                            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                                                {content.title}
                                            </h3>
                                            <div className="text-gray-600 dark:text-gray-300 mb-4">
                                                <div dangerouslySetInnerHTML={{ __html: content.body.substring(0, 150) + '...' }} />
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                                    {content.content_type}
                                                </span>
                                                <Link
                                                    href={route('educational.content.edit', content.id)}
                                                    className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
                                                >
                                                    Editar
                                                </Link>
                                            </div>
                                            <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                                Status: {content.status}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default EducationalContentIndex;
