const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#2C5530',
                    50: '#8FBE94',
                    100: '#82B688',
                    200: '#67A66E',
                    300: '#519357',
                    400: '#3C7041',
                    500: '#2C5530',
                    600: '#1C3A1F',
                    700: '#0D1F0E',
                    800: '#000000',
                    900: '#000000',
                    950: '#000000'
                },
                beige: {
                    DEFAULT: '#F5E6D3',
                    50: '#FFFFFF',
                    100: '#FFF8F0',
                    200: '#F5E6D3',
                    300: '#EAD0B0',
                    400: '#DFBA8D',
                    500: '#D4A46A',
                    600: '#C98E47',
                    700: '#AB7432',
                    800: '#7F5625',
                    900: '#533818',
                    950: '#3D2912'
                },
                dark: {
                    bg: '#1a1a1a',
                    card: '#2d2d2d',
                    text: '#e0e0e0',
                    border: '#404040',
                    primary: '#4A7856',
                    accent: '#D4A46A'
                }
            },
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
        },
    },

    plugins: [require('@tailwindcss/forms')],
};
