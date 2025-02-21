import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PurpleQuestionsManager = () => {
    const [questions, setQuestions] = useState([]);
    const [responses, setResponses] = useState({}); // State to manage responses
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        const response = await axios.get('/api/purple-questions');
        setQuestions(response.data);
        setLoading(false);
    };

    const handleResponseChange = (id, value) => {
        setResponses({ ...responses, [id]: value }); // Update response for specific question
    };

    const handleResponseSubmit = async (id) => {
        setSubmitting(true);
        setSubmitError(null);
        try {
            await axios.post(`/api/purple-questions/${id}/responses`, { response: responses[id] }); // Save response
            setResponses({ ...responses, [id]: '' }); // Clear response after submission
        } catch (error) {
            setSubmitError('Erro ao enviar a resposta.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Perguntas Roxas</h1>
            {loading ? (
                <div>Carregando...</div>
            ) : (
                <div>
                    {questions.map((question) => (
                        <div key={question.id} className="mb-4">
                            <p className="font-semibold">{question.question}</p>
                            <input
                                type="text"
                                value={responses[question.id] || ''}
                                onChange={(e) => handleResponseChange(question.id, e.target.value)}
                                placeholder="Sua resposta"
                                className="border p-2 rounded"
                            />
                            <button 
                                onClick={() => handleResponseSubmit(question.id)} 
                                disabled={submitting}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
                            >
                                {submitting ? 'Enviando...' : 'Enviar Resposta'}
                            </button>
                        </div>
                    ))}
                    {submitError && <p className="text-red-500">{submitError}</p>}
                </div>
            )}
        </div>
    );
};

export default PurpleQuestionsManager;
