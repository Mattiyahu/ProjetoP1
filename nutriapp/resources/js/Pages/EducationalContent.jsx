import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EducationalContentForm from '../Components/EducationalContentForm';
import AuthenticatedLayout from '../Layouts/AuthenticatedLayout';

const EducationalContentPage = () => {
    const [contents, setContents] = useState([]);
    const [content, setContent] = useState({
        title: '',
        summary: '',
        content: '',
        category: 'nutrition',
        image_url: '',
        tags: '',
        status: 'draft'
    });

    // Função para buscar conteúdos do Strapi
    const fetchContents = async () => {
        try {
            const response = await axios.get('http://localhost:1337/api/posts');
            setContents(response.data.data);
        } catch (error) {
            console.error('Erro ao buscar conteúdos:', error);
        }
    };

    useEffect(() => {
        fetchContents();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContent(prevContent => ({
            ...prevContent,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:1337/api/posts', {
                data: content
            });
            console.log('Conteúdo criado:', response.data);
            fetchContents(); // Atualiza a lista após criar
            setContent({ // Limpa o formulário
                title: '',
                summary: '',
                content: '',
                category: 'nutrition',
                image_url: '',
                tags: '',
                status: 'draft'
            });
        } catch (error) {
            console.error('Erro ao criar conteúdo:', error);
        }
    };

    return (
        <AuthenticatedLayout>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h1 className="text-2xl font-bold mb-6">Gerenciar Conteúdo Educativo</h1>
                        
                        {/* Formulário de criação */}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold mb-4">Criar Novo Conteúdo</h2>
                            <EducationalContentForm
                                content={content}
                                onChange={handleChange}
                                onSubmit={handleSubmit}
                            />
                        </div>

                        {/* Lista de conteúdos */}
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Conteúdos Existentes</h2>
                            <div className="grid gap-4">
                                {contents.map((item) => (
                                    <div key={item.id} className="border p-4 rounded-lg">
                                        <h3 className="text-lg font-medium">{item.attributes.title}</h3>
                                        <p className="text-gray-600">{item.attributes.summary}</p>
                                        <div className="mt-2">
                                            <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                                                {item.attributes.category}
                                            </span>
                                            <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                                                {item.attributes.status}
                                            </span>
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

export default EducationalContentPage;
