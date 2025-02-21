import React, { useEffect } from 'react';
import axios from 'axios';
import PurpleQuestionsManagerUpdatedFinal from '../PurpleQuestionsManagerUpdatedFinal';

const PurpleQuestionsForm = () => {
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

    return (
        <div className="max-w-4xl mx-auto">
            <PurpleQuestionsManagerUpdatedFinal />
        </div>
    );
};

export default PurpleQuestionsForm;
