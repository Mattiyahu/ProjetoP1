import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            colors: {
                'primary': {
                    DEFAULT: '#2C5530', // Dark green
                    '50': '#E8F0E9',
                    '100': '#D1E1D3',
                    '200': '#A3C3A7',
                    '300': '#75A57B',
                    '400': '#4A7856', // Medium green
                    '500': '#2C5530',
                    '600': '#244428',
                    '700': '#1C3320',
                    '800': '#142218',
                    '900': '#0C1110',
                },
                'beige': {
                    DEFAULT: '#F5E6D3', // Light beige
                    '50': '#FFFFFF',
                    '100': '#FFF8F0', // Off-white beige
                    '200': '#F5E6D3',
                    '300': '#E8D4BB',
                    '400': '#DAC2A3',
                    '500': '#CCB08B',
                    '600': '#BE9E73',
                    '700': '#B08C5B',
                    '800': '#967544',
                    '900': '#725834',
                },
            },
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            backgroundColor: theme => ({
                ...theme('colors'),
                'page': '#FFF8F0', // Default page background
            }),
            textColor: theme => ({
                ...theme('colors'),
                'body': '#2C5530', // Default text color
            }),
        },
    },

    plugins: [forms],
};
