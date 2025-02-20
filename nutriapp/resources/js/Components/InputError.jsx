export default function InputError({ message, className = '', ...props }) {
    return message ? (
        <p {...props} className={'text-sm text-rose-600 mt-1 font-medium ' + className}>
            {message}
        </p>
    ) : null;
}
