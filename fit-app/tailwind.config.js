/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/services/**/*.{js,ts,jsx,tsx,mdx}',
        './src/svgs/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-josefin)"],
                mono: ["var(--font-sourcesans)"],
            },
        },
    },
    variants: {
        fill: ['hover', 'focus'],
    },
    plugins: [
        require("daisyui"),
        require('@tailwindcss/forms')],
    daisyui: {
        themes: ["corporate", "retro", "dark", "emerald",
            {
                mytheme: {
                    "primary": "#1face1",
                    "secondary": "#e24f00",
                    "accent": "#163896",
                    "neutral": "#403F4C",
                    "base-100": "#f3f4f6",
                    "info": "#2d2d9e",
                    "success": "#187746",
                    "warning": "#F50501",
                    "error": "#ed5a8b",
                }
            }
        ],
    }
}

