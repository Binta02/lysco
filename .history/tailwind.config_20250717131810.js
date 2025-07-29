/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "lysco-turquoise": "#06b6d4",
        "lysco-pink": "#ec4899",
      },
    },
  },
  plugins: [],
};
