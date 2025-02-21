import { useState, useEffect } from 'react';
import ApplicationLogo from './Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    const [darkMode, setDarkMode] = useState(false);

    // Load dark mode preference from local storage
    useEffect(() => {
        const savedMode = localStorage.getItem('darkMode');
        if (savedMode === 'true') {
            setDarkMode(true);
        }
    }, []);

    const toggleDarkMode = () => {
        setDarkMode((prevMode) => {
            const newMode = !prevMode;
            localStorage.setItem('darkMode', newMode);
            return newMode;
        });
    };

    return (
        <div className={`min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 ${darkMode ? 'bg-gray-800 text-white' : 'bg-gradient-to-b from-beige-100 to-beige-200'}`}>
            <div className="mb-4">
                <Link href="/" className="flex flex-col items-center">
                    <ApplicationLogo className="w-24 h-24 fill-current text-primary" />
                    <h1 className="mt-2 text-3xl font-bold text-primary">NutriApp</h1>
                </Link>
            </div>

            <button onClick={toggleDarkMode} className="mb-4 p-2 rounded-md">
                {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>

            <div className="w-full sm:max-w-md mt-6 px-8 py-6 bg-white shadow-xl overflow-hidden sm:rounded-xl border border-beige-200">
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-primary-600 text-center">
                        Bem-vindo ao NutriApp
                    </h2>
                    <p className="mt-2 text-sm text-primary-400 text-center">
                        Seu assistente nutricional personalizado
                    </p>
                </div>
                
                <div className="space-y-6">
                    {children}
                </div>
            </div>

            <footer className="mt-8 text-center text-sm text-primary-400">
                <p>© {new Date().getFullYear()} NutriApp. Todos os direitos reservados.</p>
            </footer>
        </div>
    );
}
