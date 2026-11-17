/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/config/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        legal: {
          50: "#f0f4f9",
          100: "#dbe4f0",
          200: "#bacde2",
          300: "#8eb0d0",
          400: "#5c8ebc",
          500: "#3d73a7",
          600: "#2d5a8a",
          700: "#254870",
          800: "#1e3756",
          900: "#132338",
          950: "#09121e",
        },
        navy: {
          800: "#0d1b2a",
          850: "#0b1622",
          900: "#08111a",
          950: "#050b11",
        },
        gold: {
          400: "#facc15",
          500: "#eab308",
          600: "#ca8a04",
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
