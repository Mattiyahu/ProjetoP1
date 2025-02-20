import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <input
            {...props}
            type={type}
            className={
                'w-full border-beige-300 bg-white text-primary-700 placeholder-primary-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:ring-opacity-50 rounded-lg shadow-sm transition duration-200 ease-in-out ' +
                className
            }
            ref={input}
        />
    );
});
