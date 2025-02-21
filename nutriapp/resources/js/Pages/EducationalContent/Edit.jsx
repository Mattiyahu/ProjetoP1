import React from 'react';
import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import EducationalContentForm from '../../Components/EducationalContentForm';
import { useForm } from '@inertiajs/react';

const EditEducationalContent = ({ content }) => {
    const { data, setData, put, errors } = useForm({
        title: content.title,
        body: content.body,
        content_type: content.content_type,
        status: content.status,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('educational.content.update', content.id));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Editar Conteúdo Educativo" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
                                Editar Conteúdo Educativo
                            </h2>

                            {errors && Object.keys(errors).length > 0 && (
                                <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
                                    {Object.values(errors).map((error, index) => (
                                        <div key={index}>{error}</div>
                                    ))}
                                </div>
                            )}

                            <EducationalContentForm
                                content={data}
                                onChange={handleChange}
                                onSubmit={handleSubmit}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default EditEducationalContent;
