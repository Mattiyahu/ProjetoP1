import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PurpleQuestionsManager = () => {
    const [questions, setQuestions] = useState([]);
    const [responses, setResponses] = useState({}); // State to manage responses

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        const response = await axios.get('/api/purple-questions');
        setQuestions(response.data);
    };

    const handleResponseChange = (id, value) => {
        setResponses({ ...responses, [id]: value }); // Update response for specific question
    };

    const handleResponseSubmit = async (id) => {
        await axios.post(`/api/purple-questions/${id}/responses`, { response: responses[id] }); // Save response
        setResponses({ ...responses, [id]: '' }); // Clear response after submission
    };

    return (
        <div>
            <h2>Purple Questions</h2>
            <ul>
                {questions.map((question) => (
                    <li key={question.id}>
                        <p>{question.question}</p>
                        <input
                            type="text"
                            value={responses[question.id] || ''}
                            onChange={(e) => handleResponseChange(question.id, e.target.value)}
                            placeholder="Your response"
                        />
                        <button onClick={() => handleResponseSubmit(question.id)}>Submit Response</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PurpleQuestionsManager;
