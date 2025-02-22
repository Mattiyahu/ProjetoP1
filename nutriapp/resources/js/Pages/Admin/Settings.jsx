import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function Settings({ auth, settings }) {
    const { data, setData, post, processing, errors } = useForm({
        strapi_url: settings.strapi_url || 'http://localhost:1337',
        app_name: settings.app_name || 'NutriApp',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.settings.update'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Configurações</h2>}
        >
            <Head title="Configurações" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="mb-6">
                                <h3 className="text-lg font-medium mb-4">Configurações Gerais</h3>
                                
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Strapi URL */}
                                    <div>
                                        <InputLabel htmlFor="strapi_url" value="URL do Strapi" />
                                        <TextInput
                                            id="strapi_url"
                                            type="text"
                                            name="strapi_url"
                                            value={data.strapi_url}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('strapi_url', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.strapi_url} className="mt-2" />
                                    </div>

                                    {/* App Name */}
                                    <div>
                                        <InputLabel htmlFor="app_name" value="Nome da Aplicação" />
                                        <TextInput
                                            id="app_name"
                                            type="text"
                                            name="app_name"
                                            value={data.app_name}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('app_name', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.app_name} className="mt-2" />
                                    </div>

                                    {/* Strapi Status */}
                                    <div className="mt-6">
                                        <h4 className="text-sm font-medium text-gray-900">Status do Strapi</h4>
                                        <div className="mt-2 flex items-center">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                Conectado
                                            </span>
                                            <a
                                                href={data.strapi_url + '/admin'}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="ml-4 text-sm text-primary-600 hover:text-primary-900"
                                            >
                                                Abrir Painel do Strapi
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-end mt-6">
                                        <PrimaryButton type="submit" className="ml-4" disabled={processing}>
                                            Salvar Configurações
                                        </PrimaryButton>
                                    </div>
                                </form>
                            </div>

                            {/* Informações do Sistema */}
                            <div className="mt-8 border-t pt-6">
                                <h3 className="text-lg font-medium mb-4">Informações do Sistema</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Versão do Laravel</p>
                                        <p className="mt-1 text-sm text-gray-900">{window.laravelVersion}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Versão do PHP</p>
                                        <p className="mt-1 text-sm text-gray-900">{window.phpVersion}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
