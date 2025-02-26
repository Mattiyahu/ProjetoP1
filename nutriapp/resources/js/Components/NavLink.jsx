import { Link } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center px-3 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-primary-500 text-primary-600 focus:border-primary-700 font-semibold'
                    : 'border-transparent text-primary-400 hover:text-primary-600 hover:border-primary-300 focus:text-primary-600 focus:border-primary-300 ') +
                className
            }
        >
            {children}
        </Link>
    );
}
