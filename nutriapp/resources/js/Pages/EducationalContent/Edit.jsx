import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import EducationalContentForm from '@/Components/EducationalContentForm';

export default function Edit({ auth, content }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Editar Conteúdo Educativo</h2>}
        >
            <Head title="Editar Conteúdo Educativo" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <EducationalContentForm content={content} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
