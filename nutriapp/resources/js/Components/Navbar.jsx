import { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import GoogleButton from '@/Components/GoogleButton';

export default function Navbar({ auth }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isAtTop, setIsAtTop] = useState(true);
    const { request } = usePage();

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            setIsScrolled(scrollTop > 10);
            setIsAtTop(scrollTop === 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${
            isScrolled 
                ? 'bg-white dark:bg-dark-card shadow-lg py-2' 
                : 'bg-transparent py-4'
        }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link 
                            href="/" 
                            className={`flex items-center space-x-2 transition-all duration-300 ${
                                isScrolled ? 'scale-90' : 'scale-100'
                            }`}
                        >
                            <ApplicationLogo className={`w-10 h-10 ${
                                isScrolled ? 'text-primary dark:text-dark-primary' : 'text-white dark:text-dark-text'
                            }`} />
                            <span className={`text-xl font-bold transition-colors duration-300 ${
                                isScrolled ? 'text-primary dark:text-dark-primary' : 'text-white dark:text-dark-text'
                            }`}>
                                NutriApp
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link 
                            href="#sobre"
                            className={`nav-link ${isScrolled ? 'text-primary-600 dark:text-dark-text' : 'text-white dark:text-dark-text'}`}
                        >
                            Sobre
                        </Link>
                        <Link 
                            href="#servicos"
                            className={`nav-link ${isScrolled ? 'text-primary-600 dark:text-dark-text' : 'text-white dark:text-dark-text'}`}
                        >
                            Serviços
                        </Link>
                        <Link 
                            href="#contato"
                            className={`nav-link ${isScrolled ? 'text-primary-600 dark:text-dark-text' : 'text-white dark:text-dark-text'}`}
                        >
                            Contato
                        </Link>
                        {auth?.user ? (
                            <Link
                                href={route('dashboard')}
                                className={`btn-primary ${isScrolled ? 'bg-primary dark:bg-dark-primary' : 'bg-white text-primary dark:bg-dark-card dark:text-dark-text hover:bg-beige-100'}`}
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <GoogleButton className={isScrolled ? '' : 'bg-white/90 dark:bg-dark-card/90 hover:bg-white dark:hover:bg-dark-card'} />
                                <Link
                                    href={route('register')}
                                    className={`btn-primary ${
                                        isScrolled 
                                            ? 'bg-primary dark:bg-dark-primary text-white' 
                                            : 'bg-white text-primary dark:bg-dark-card dark:text-dark-text hover:bg-beige-100'
                                    }`}
                                >
                                    Registrar
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`${isScrolled ? 'text-primary dark:text-dark-text' : 'text-white dark:text-dark-text'} p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors duration-300`}
                        >
                            <svg
                                className="h-6 w-6"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                {isOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div 
                    className={`md:hidden transition-all duration-300 ease-in-out ${
                        isOpen 
                            ? 'max-h-96 opacity-100 mt-4' 
                            : 'max-h-0 opacity-0 overflow-hidden'
                    }`}
                >
                    <div className={`rounded-lg shadow-lg ${
                        isScrolled ? 'bg-white dark:bg-dark-card' : 'bg-white/90 dark:bg-dark-card/90 backdrop-blur-md'
                    } p-4 space-y-4`}>
                        <Link 
                            href="#sobre"
                            className="mobile-nav-link"
                            onClick={() => setIsOpen(false)}
                        >
                            Sobre
                        </Link>
                        <Link 
                            href="#servicos"
                            className="mobile-nav-link"
                            onClick={() => setIsOpen(false)}
                        >
                            Serviços
                        </Link>
                        <Link 
                            href="#contato"
                            className="mobile-nav-link"
                            onClick={() => setIsOpen(false)}
                        >
                            Contato
                        </Link>
                        {auth?.user ? (
                            <Link
                                href={route('dashboard')}
                                className="btn-primary w-full text-center"
                                onClick={() => setIsOpen(false)}
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <div className="flex flex-col space-y-2">
                                <GoogleButton />
                                <Link
                                    href={route('register')}
                                    className="btn-primary w-full text-center"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Registrar
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
