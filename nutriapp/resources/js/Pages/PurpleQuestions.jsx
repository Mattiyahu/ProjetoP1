import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import PurpleQuestionsForm from '@/Components/Questionnaires/PurpleQuestionsForm';

const PurpleQuestions = () => {
    const { auth } = usePage().props;

    if (!auth.user) {
        window.location.href = '/login';
        return null;
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Questionário de Saúde Mental e Alimentação
                </h2>
            }
        >
            <Head title="Questionário de Saúde Mental e Alimentação" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-xl rounded-lg">
                        <div className="bg-purple-600 px-6 py-4">
                            <h2 className="text-xl font-semibold text-white">Instruções</h2>
                            <p className="text-purple-100 mt-1">
                                Por favor, responda às perguntas abaixo com sinceridade. Não existem 
                                respostas certas ou erradas.
                            </p>
                            <p className="text-purple-100 mt-2">
                                Usuário: {auth.user.name} ({auth.user.email})
                            </p>
                        </div>
                        
                        <div className="p-6">
                            <PurpleQuestionsForm />
                        </div>
                    </div>

                    <div className="mt-8 text-center text-sm text-gray-500">
                        <p>
                            Suas respostas nos ajudarão a desenvolver melhores estratégias para 
                            promover uma alimentação saudável e bem-estar mental.
                        </p>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default PurpleQuestions;
