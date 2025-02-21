import React, { useState } from 'react';
import axios from 'axios';

const questions = [
    {
        id: 1,
        text: 'Você já foi diagnosticado(a) com algum transtorno mental? (Se sim, qual?)',
        type: 'text',
    },
    {
        id: 2,
        text: 'Com que frequência você apresenta sintomas? (Nunca / Raramente / Às vezes / Frequentemente / Sempre)',
        type: 'select',
        options: ['Nunca', 'Raramente', 'Às vezes', 'Frequentemente', 'Sempre'],
    },
    // Add more questions as needed
];

const Questionnaire = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [responses, setResponses] = useState({});

    const handleNext = () => {
        setCurrentQuestion((prev) => prev + 1);
    };

    const handleResponseChange = (e) => {
        setResponses({
            ...responses,
            [questions[currentQuestion].id]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('/api/purple-questions', responses);
        // Handle success (e.g., show a success message or redirect)
    };

    return (
        <div>
            <h2>Pergunta {currentQuestion + 1}</h2>
            <form onSubmit={handleSubmit}>
                {questions[currentQuestion].type === 'text' ? (
                    <input
                        type="text"
                        onChange={handleResponseChange}
                        required
                    />
                ) : (
                    <select onChange={handleResponseChange} required>
                        {questions[currentQuestion].options.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                )}
                <button type="button" onClick={handleNext} disabled={currentQuestion >= questions.length - 1}>
                    Próxima
                </button>
                {currentQuestion === questions.length - 1 && (
                    <button type="submit">Enviar</button>
                )}
            </form>
        </div>
    );
};

export default Questionnaire;
