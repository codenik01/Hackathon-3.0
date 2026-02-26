/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#6366f1', // Indigo-500 (Matches "Human/Premium" look)
                    hover: '#4f46e5',
                    light: '#818cf8',
                },
                slate: {
                    850: '#1e293b',
                    950: '#020617', // Deep dark background
                }
            },
            fontFamily: {
                sans: ['Outfit', 'sans-serif'],
                mono: ['Space Grotesk', 'monospace'],
            }
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}
