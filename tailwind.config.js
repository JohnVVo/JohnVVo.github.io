/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"],
  theme: {
    extend: {
      colors: {
        gray: {
          DEFAULT: "#1f2937",
        },
      },
      fontFamily: {
        sans: ["Spectral", "sans-serif"],
      },
    },
  },
  plugins: [],
};
