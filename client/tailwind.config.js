/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      white: colors.white,
      green: colors.green,
      red: colors.red,
      blue: colors.blue,
      gray: colors.gray,
      primary: "#EA574A",
      secundary: "#279BB7",
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
