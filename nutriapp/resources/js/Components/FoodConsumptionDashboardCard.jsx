import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FoodConsumptionDashboardCard = ({ auth, sections: initialSections }) => {
    const [sections, setSections] = useState(initialSections || []);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(!initialSections);
    const [error, setError] = useState(null);
    const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

    useEffect(() => {
        if (initialSections) {
            setSections(initialSections);
            setLoading(false);
            return;
        }

        const fetchSections = async () => {
            try {
                // Set up axios defaults with the auth token
                if (auth?.token) {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${auth.token}`;
                }

                const response = await axios.get('/api/r24h-questionnaire-sections');
                setSections(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load questionnaire sections');
                setLoading(false);
                console.error('Error fetching sections:', err);
            }
        };

        fetchSections();
    }, [initialSections, auth?.token]);

    const handleInputChange = (itemId, value) => {
        setAnswers(prev => ({
            ...prev,
            [itemId]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitStatus({ type: '', message: '' });
        
        try {
            const formattedAnswers = Object.entries(answers).map(([r24h_questionnaire_item_id, answer]) => ({
                r24h_questionnaire_item_id: parseInt(r24h_questionnaire_item_id),
                answer
            }));

            await axios.post('/api/r24h-questionnaire-answers', { answers: formattedAnswers });

            setSubmitStatus({
                type: 'success',
                message: 'Respostas salvas com sucesso!'
            });

            // Clear form
            setAnswers({});
        } catch (err) {
            setSubmitStatus({
                type: 'error',
                message: 'Erro ao salvar as respostas. Por favor, tente novamente.'
            });
            console.error('Error submitting answers:', err);
        }
    };

    if (loading) {
        return (
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                <div className="text-gray-900">Carregando questionário...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                <div className="text-red-600">{error}</div>
            </div>
        );
    }

    return (
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-6">Recordatório 24h</h2>
            
            {submitStatus.message && (
                <div className={`p-4 mb-4 rounded ${
                    submitStatus.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                    {submitStatus.message}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                {sections.map(section => (
                    <div key={section.id} className="mb-8">
                        <h3 className="text-xl font-medium mb-4">{section.name}</h3>
                        {section.items?.map(item => (
                            <div key={item.id} className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {item.field_name}
                                </label>
                                <input
                                    type="text"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    value={answers[item.id] || ''}
                                    onChange={(e) => handleInputChange(item.id, e.target.value)}
                                    placeholder="Digite sua resposta"
                                />
                            </div>
                        ))}
                    </div>
                ))}

                <div className="mt-6">
                    <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Salvar Consumo Alimentar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FoodConsumptionDashboardCard;
