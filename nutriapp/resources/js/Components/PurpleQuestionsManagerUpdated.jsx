import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PurpleQuestionsManager = () => {
    const [questions, setQuestions] = useState([]);
    const [newQuestion, setNewQuestion] = useState('');
    const [responses, setResponses] = useState({}); // State to manage responses
    const [editingQuestion, setEditingQuestion] = useState(null);

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        const response = await axios.get('/api/purple-questions');
        setQuestions(response.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingQuestion) {
            await axios.put(`/api/purple-questions/${editingQuestion.id}`, { question: newQuestion });
        } else {
            await axios.post('/api/purple-questions', { question: newQuestion });
        }
        setNewQuestion('');
        setEditingQuestion(null);
        fetchQuestions();
    };

    const handleResponseChange = (id, value) => {
        setResponses({ ...responses, [id]: value }); // Update response for specific question
    };

    const handleResponseSubmit = async (id) => {
        await axios.post(`/api/purple-questions/${id}/responses`, { response: responses[id] }); // Save response
        setResponses({ ...responses, [id]: '' }); // Clear response after submission
    };

    const handleEdit = (question) => {
        setNewQuestion(question.question);
        setEditingQuestion(question);
    };

    const handleDelete = async (id) => {
        await axios.delete(`/api/purple-questions/${id}`);
        fetchQuestions();
    };

    return (
        <div>
            <h2>Purple Questions</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    placeholder="Enter a new question"
                    required
                />
                <button type="submit">{editingQuestion ? 'Update' : 'Add'}</button>
            </form>
            <ul>
                {questions.map((question) => (
                    <li key={question.id}>
                        {question.question}
                        <input
                            type="text"
                            value={responses[question.id] || ''}
                            onChange={(e) => handleResponseChange(question.id, e.target.value)}
                            placeholder="Your response"
                        />
                        <button onClick={() => handleResponseSubmit(question.id)}>Submit Response</button>
                        <button onClick={() => handleEdit(question)}>Edit</button>
                        <button onClick={() => handleDelete(question.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PurpleQuestionsManager;
