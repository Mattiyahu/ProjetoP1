export default function ApplicationLogo(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Leaf shape */}
            <path
                d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="transition-all duration-300"
            />
            
            {/* Stem */}
            <path
                d="M12 2C16 2 22 6.48 22 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="transition-all duration-300"
            />
            
            {/* Inner leaf details */}
            <path
                d="M12 6C9.5 6 7 8.5 7 12C7 15.5 9.5 18 12 18C14.5 18 17 15.5 17 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                className="transition-all duration-300"
            />
            
            {/* Leaf vein */}
            <path
                d="M12 6C14 6 17 8.5 17 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                className="transition-all duration-300"
            />
            
            {/* Small leaf details */}
            <path
                d="M12 9C10.5 9 9 10.5 9 12C9 13.5 10.5 15 12 15C13.5 15 15 13.5 15 12"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                className="transition-all duration-300"
            />
            
            {/* Center dot */}
            <circle
                cx="12"
                cy="12"
                r="1"
                fill="currentColor"
                className="transition-all duration-300"
            />
        </svg>
    );
}
