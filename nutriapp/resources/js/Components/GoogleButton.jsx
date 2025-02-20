export default function GoogleButton({ className = '' }) {
    const handleGoogleLogin = () => {
        // Redireciona diretamente para a URL do Google OAuth
        window.location.href = 'http://localhost:8000/login/google';
    };

    return (
        <button
            onClick={handleGoogleLogin}
            type="button"
            className={`inline-flex items-center justify-center px-4 py-2 bg-white text-gray-700 
                       border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500
                       transition-all duration-300 cursor-pointer ${className}`}
        >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                    fill="currentColor"
                    d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1Z"
                />
            </svg>
            <span className="font-medium">Continuar com Google</span>
        </button>
    );
}
