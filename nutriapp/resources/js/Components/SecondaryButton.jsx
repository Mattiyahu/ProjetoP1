import { Link } from '@inertiajs/react';

export default function SecondaryButton({ type = 'button', className = '', disabled, children, href, ...props }) {
    const classes = `btn-secondary ${className}`;

    if (href) {
        return (
            <Link
                href={href}
                className={classes}
                {...props}
            >
                {children}
            </Link>
        );
    }

    return (
        <button
            {...props}
            type={type}
            className={classes}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
