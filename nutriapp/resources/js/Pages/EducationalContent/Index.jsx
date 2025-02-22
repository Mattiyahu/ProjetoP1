import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import DangerButton from '@/Components/DangerButton';

export default function Index({ auth, contents }) {
    const handleDelete = (id) => {
        if (confirm('Tem certeza que deseja excluir este conteúdo?')) {
            router.delete(route('educational.content.destroy', id));
        }
    };

    const getContentTypeLabel = (type) => {
        switch (type) {
            case 'article':
                return 'Artigo';
            case 'guide':
                return 'Guia';
            case 'tip':
                return 'Dica';
            default:
                return type;
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Conteúdo Educativo
                    </h2>
                    {auth.user.permissions.includes('create educational content') && (
                        <Link href={route('educational.content.create')}>
                            <PrimaryButton type="button">
                                Novo Conteúdo
                            </PrimaryButton>
                        </Link>
                    )}
                </div>
            }
        >
            <Head title="Conteúdo Educativo" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {contents.length > 0 ? (
                                <div className="space-y-6">
                                    {contents.map((content) => (
                                        <div
                                            key={content.id}
                                            className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0"
                                        >
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="text-xl font-semibold mb-2">
                                                        {content.title}
                                                    </h3>
                                                    <div className="flex gap-4 text-sm text-gray-500 mb-4">
                                                        <span>
                                                            Tipo: {getContentTypeLabel(content.content_type)}
                                                        </span>
                                                        <span>
                                                            Status: {content.status === 'published' ? 'Publicado' : 'Rascunho'}
                                                        </span>
                                                        {content.user && (
                                                            <span>
                                                                Autor: {content.user.name}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: content.body }} />
                                                </div>
                                                <div className="flex gap-2">
                                                    {auth.user.permissions.includes('edit educational content') && (
                                                        <Link href={route('educational.content.edit', content.id)}>
                                                            <PrimaryButton type="button" className="text-sm">
                                                                Editar
                                                            </PrimaryButton>
                                                        </Link>
                                                    )}
                                                    {auth.user.permissions.includes('delete educational content') && (
                                                        <DangerButton
                                                            onClick={() => handleDelete(content.id)}
                                                            className="text-sm"
                                                        >
                                                            Excluir
                                                        </DangerButton>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center text-gray-500">
                                    Nenhum conteúdo educativo encontrado.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
