const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        black: "#36343A",
        "gray-90": "#36343A",
        "gray-80": "#464251",
        "gray-70": "#54515D",
        "gray-60": "#6A6771",
        "gray-50": "#94919D",
        "gray-40": "#C8C7CC",
        gray: "#D7D6DB",
        "gray-30": "#D7D6DB",
        "gray-20": "#EDEDED",
        "gray-10": "#F5F5F5",
        "gray-5": "#FBFBFB",
        "gray-variant-70": "#4A4164",
        "gray-variant-50": "#9790A6",
        "purple-100": "#1D182E",
        "purple-90": "#231C36",
        "purple-80": "#312946",
        "purple-70": "#4F3D72",
        "purple-50": "#6B40E4",
        "purple-40": "#9371F4",
        "purple-30": "#C0ADE5",
        "purple-20": "#D5C5F5",
        "purple-10": "#EFEEF1",
      },
      fontFamily: {
        sans: ["var(--font-soehne)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};
