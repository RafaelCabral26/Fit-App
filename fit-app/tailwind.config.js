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
        // 👇 Add CSS variables
        sans: ["var(--font-josefin)"],
        mono: ["var(--font-sourcesans)"],
      },
    },
  },
  plugins: [require("daisyui")],
    daisyui: {
        themes:["corporate", "retro", "dark", "emerald"]
    }
}

