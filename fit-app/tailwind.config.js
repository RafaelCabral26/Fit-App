/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/services/**/*.{js,ts,jsx,tsx,mdx}',

    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-josefin)"],
                mono: ["var(--font-sourcesans)"],
            },
        },
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: ["corporate", "retro", "dark", "emerald",
            {
        mytheme: {
            "primary": "#4C5B5C",
            "secondary": "#0496FF",
            "accent": "#F9E900",
            "neutral": "#1D141F",
            "base-100": "#F2F2F2",
            "info": "#93B6E1",
            "success": "#31C98C",
            "warning": "#FCC93B",
            "error": "#F53D46",
        }
            }
        ],
    }
}

