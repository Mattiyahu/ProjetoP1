import React, { useState } from 'react';
import EducationalContentForm from '../Components/EducationalContentForm';
import AuthenticatedLayout from '../Layouts/AuthenticatedLayout';

const EducationalContentPage = () => {
    const [content, setContent] = useState({
        title: '',
        slug: '',
        body: '',
        content_type: 'educational',
        status: 'draft',
        user_id: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContent((prevContent) => ({
            ...prevContent,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Submitting content:', content);
    };

    return (
        <AuthenticatedLayout>
            <div className="py-12">
                <h1 className="text-2xl font-bold">Criar Conteúdo Educativo</h1>
                <EducationalContentForm
                    content={content}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                />
            </div>
        </AuthenticatedLayout>
    );
};

export default EducationalContentPage;
