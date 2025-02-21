import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PurpleQuestionsForm = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [responses, setResponses] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    // Configure axios defaults and get token from session
    useEffect(() => {
        const setupAxios = async () => {
            try {
                axios.defaults.withCredentials = true;
                axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
                
                // Get CSRF token
                await axios.get('/sanctum/csrf-cookie');
                
                // Get token from session storage
                const token = window.sessionStorage.getItem('token');
                if (token) {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                }
            } catch (error) {
                console.error('Error setting up axios:', error);
            }
        };
        
        setupAxios();
    }, []);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                // Get CSRF cookie
                await axios.get('/sanctum/csrf-cookie');
                
                const response = await axios.get('/api/purple-questions');
                console.log('Questions loaded:', response.data);
                setQuestions(response.data);
            } catch (err) {
                console.error('Error fetching questions:', err);
                setError('Erro ao carregar as perguntas. Por favor, tente novamente.');
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, []);

    const handleChange = (id, value) => {
        console.log('Answer changed for question', id, ':', value);
        setResponses(prevResponses => ({
            ...prevResponses,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        
        try {
            const formattedResponses = {
                answers: Object.entries(responses).map(([question_id, answer]) => ({
                    question_id: parseInt(question_id),
                    answer: answer
                })).filter(answer => answer.answer !== null && answer.answer !== '')
            };

            console.log('Submitting responses:', formattedResponses);

            if (formattedResponses.answers.length === 0) {
                setError('Por favor, responda pelo menos uma pergunta antes de enviar.');
                return;
            }

            const token = window.sessionStorage.getItem('token');
            const response = await axios.post('/api/purple-question-answers', formattedResponses, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log('Submission successful:', response.data);
            
            setSuccessMessage('Respostas enviadas com sucesso! Obrigado por participar.');
            setResponses({});
            setError(null);
            e.target.reset();

            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (err) {
            console.error('Submission error:', err.response || err);
            
            if (err.response?.status === 401) {
                window.location.href = '/login';
            } else if (err.response?.data?.message) {
                setError(`Erro ao enviar respostas: ${err.response.data.message}`);
            } else {
                setError('Falha ao enviar respostas. Por favor, tente novamente.');
            }
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
    );

    if (error) return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Erro! </strong>
            <span className="block sm:inline">{error}</span>
        </div>
    );

    if (!questions || questions.length === 0) return (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Aviso! </strong>
            <span className="block sm:inline">Nenhuma pergunta encontrada.</span>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto">
            {successMessage && (
                <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                    <span className="block sm:inline">{successMessage}</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {questions.map(question => (
                    <div key={question.id} className="bg-white rounded-lg p-6 shadow-sm border border-purple-100 hover:border-purple-300 transition-colors">
                        <label className="block text-lg font-medium text-gray-900 mb-4">
                            {question.question_text}
                        </label>
                        
                        {question.question_type === 'text' && (
                            <input
                                type="text"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                                onChange={(e) => handleChange(question.id, e.target.value)}
                                placeholder="Digite sua resposta"
                            />
                        )}

                        {question.question_type === 'select' && (
                            <select
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                                onChange={(e) => handleChange(question.id, e.target.value)}
                                defaultValue=""
                            >
                                <option value="" disabled>Selecione uma opção</option>
                                {question.answer_options?.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        )}

                        {question.question_type === 'checkbox' && (
                            <div className="space-y-2">
                                {question.answer_options?.map(option => (
                                    <div key={option} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                                            onChange={(e) => handleChange(question.id, e.target.checked ? option : null)}
                                        />
                                        <label className="ml-3 text-gray-700">{option}</label>
                                    </div>
                                ))}
                            </div>
                        )}

                        {question.question_type === 'textarea' && (
                            <textarea
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                                rows="4"
                                onChange={(e) => handleChange(question.id, e.target.value)}
                                placeholder="Digite sua resposta"
                            />
                        )}

                        {question.question_type === 'select-text' && (
                            <select
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                                onChange={(e) => handleChange(question.id, e.target.value)}
                                defaultValue=""
                            >
                                <option value="" disabled>Selecione uma opção</option>
                                <option value="Yes">Sim</option>
                                <option value="No">Não</option>
                            </select>
                        )}
                    </div>
                ))}

                <div className="mt-6 flex items-center justify-between">
                    <button
                        type="submit"
                        className="w-full bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg px-8 py-3"
                    >
                        Enviar Respostas
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PurpleQuestionsForm;
