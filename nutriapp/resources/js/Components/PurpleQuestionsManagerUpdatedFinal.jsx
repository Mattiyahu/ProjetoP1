import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PurpleQuestionsManagerUpdatedFinal = ({ auth }) => {
    const [questions, setQuestions] = useState([]);
    const [currentSection, setCurrentSection] = useState(0);
    const [responses, setResponses] = useState({});
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        const setupAxios = () => {
            axios.defaults.withCredentials = true;
            axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
            axios.defaults.headers.common['Accept'] = 'application/json';
            
            // Get CSRF token from meta tag
            const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
            if (token) {
                axios.defaults.headers.common['X-CSRF-TOKEN'] = token;
            }

            fetchQuestions();
        };

        setupAxios();
    }, []);

    const fetchQuestions = async () => {
        try {
            const response = await axios.get('/api/purple-questions');
            const groupedQuestions = groupQuestionsIntoSections(response.data);
            setQuestions(groupedQuestions);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching questions:', error);
            setSubmitError('Erro ao carregar as perguntas.');
            setLoading(false);
        }
    };

    const groupQuestionsIntoSections = (questions) => {
        const sections = [];
        for (let i = 0; i < questions.length; i += 5) {
            sections.push(questions.slice(i, i + 5));
        }
        return sections;
    };

    const handleResponseChange = (id, value) => {
        setResponses(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async () => {
        setSubmitting(true);
        setSubmitError(null);
        try {
            await axios.post('/api/purple-question-answers', {
                answers: Object.entries(responses).map(([questionId, answer]) => ({
                    question_id: parseInt(questionId),
                    answer: answer
                }))
            });
            setSubmitted(true);
        } catch (error) {
            console.error('Error submitting answers:', error);
            setSubmitError('Erro ao enviar as respostas.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleSectionChange = (direction) => {
        setFadeOut(true);
        setTimeout(() => {
            if (direction === 'next' && currentSection < questions.length - 1) {
                setCurrentSection(prev => prev + 1);
            } else if (direction === 'prev' && currentSection > 0) {
                setCurrentSection(prev => prev - 1);
            }
            setFadeOut(false);
        }, 300);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#F5F5DC] to-[#E8F5E9]">
                <div className="p-8 rounded-lg bg-white shadow-lg">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"></div>
                    <p className="mt-4 text-gray-600 text-center">Carregando questionário...</p>
                </div>
            </div>
        );
    }

    if (submitted) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#F5F5DC] to-[#E8F5E9]">
                <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-md mx-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-green-700 mb-4">Questionário Concluído!</h2>
                    <p className="text-gray-600">Suas respostas foram enviadas com sucesso. Obrigado pela sua participação!</p>
                </div>
            </div>
        );
    }

    const sectionColors = {
        even: 'from-[#F5F5DC] to-[#F8F8DC]', // Beige gradient
        odd: 'from-[#E8F5E9] to-[#C8E6C9]'   // Green gradient
    };

    return (
        <div className={`min-h-screen bg-gradient-to-br transition-all duration-500 ${currentSection % 2 === 0 ? sectionColors.even : sectionColors.odd}`}>
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-3xl mx-auto">
                    {/* Progress bar */}
                    <div className="mb-8 bg-white rounded-xl p-6 shadow-lg">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-gray-700 font-medium">Seu Progresso</span>
                            <span className="text-green-600 font-semibold">
                                {Math.round(((currentSection + 1) / questions.length) * 100)}%
                            </span>
                        </div>
                        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500 rounded-full"
                                style={{ width: `${((currentSection + 1) / questions.length) * 100}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Questions */}
                    <div className={`bg-white rounded-xl shadow-xl p-8 mb-6 transition-all duration-300 transform ${fadeOut ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
                        <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center">
                            <span className="bg-green-100 text-green-600 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">
                                {currentSection + 1}
                            </span>
                            <span>Seção {currentSection + 1} de {questions.length}</span>
                        </h2>
                        
                        {questions[currentSection]?.map((question, index) => (
                            <div key={question.id} className="mb-8 last:mb-0">
                                <div className="flex items-start mb-4">
                                    <span className="bg-gray-100 text-gray-600 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 text-sm flex-shrink-0">
                                        {index + 1}
                                    </span>
                                    <label className="block text-gray-700 font-medium leading-relaxed">
                                        {question.question_text}
                                    </label>
                                </div>
                                
                                {question.question_type === 'text' && (
                                    <div className="ml-9">
                                        <input
                                            type="text"
                                            value={responses[question.id] || ''}
                                            onChange={(e) => handleResponseChange(question.id, e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                                            placeholder="Digite sua resposta"
                                        />
                                    </div>
                                )}

                                {question.question_type === 'select' && (
                                    <div className="ml-9">
                                        <select
                                            value={responses[question.id] || ''}
                                            onChange={(e) => handleResponseChange(question.id, e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 bg-white"
                                        >
                                            <option value="">Selecione uma opção</option>
                                            {question.answer_options?.map(option => (
                                                <option key={option} value={option}>{option}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                {question.question_type === 'checkbox' && (
                                    <div className="ml-9 space-y-3">
                                        {question.answer_options?.map(option => (
                                            <div key={option} className="flex items-center bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                                                <input
                                                    type="checkbox"
                                                    checked={responses[question.id] === option}
                                                    onChange={(e) => handleResponseChange(question.id, e.target.checked ? option : null)}
                                                    className="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded transition-all duration-200"
                                                />
                                                <label className="ml-3 text-gray-700 select-none">{option}</label>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {question.question_type === 'textarea' && (
                                    <div className="ml-9">
                                        <textarea
                                            value={responses[question.id] || ''}
                                            onChange={(e) => handleResponseChange(question.id, e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                                            rows="4"
                                            placeholder="Digite sua resposta"
                                        />
                                    </div>
                                )}

                                {question.question_type === 'select-text' && (
                                    <div className="ml-9">
                                        <select
                                            value={responses[question.id] || ''}
                                            onChange={(e) => handleResponseChange(question.id, e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 bg-white"
                                        >
                                            <option value="">Selecione uma opção</option>
                                            <option value="Yes">Sim</option>
                                            <option value="No">Não</option>
                                        </select>
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Navigation buttons */}
                        <div className="flex justify-between mt-12 pt-6 border-t border-gray-100">
                            <button
                                onClick={() => handleSectionChange('prev')}
                                disabled={currentSection === 0}
                                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center
                                    ${currentSection === 0 
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300 shadow-sm'}`}
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                </svg>
                                Anterior
                            </button>

                            {currentSection === questions.length - 1 ? (
                                <button
                                    onClick={handleSubmit}
                                    disabled={submitting}
                                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center"
                                >
                                    {submitting ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Enviando...
                                        </>
                                    ) : (
                                        <>
                                            Finalizar
                                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </>
                                    )}
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleSectionChange('next')}
                                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center"
                                >
                                    Próximo
                                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>

                    {submitError && (
                        <div className="mt-4 p-4 bg-red-50 border border-red-100 text-red-700 rounded-lg flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {submitError}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PurpleQuestionsManagerUpdatedFinal;
