/** @type {import('tailwindcss').Config} */
// const withMT = require("@material-tailwind/react/utils/withMT");
import withMT from "@material-tailwind/react/utils/withMT";
export default withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#F6F6F6",
        secondary: "#FFA500",
        danger: "#FF0000",
      },
      fontFamily: {
        sans: ["Inter", "Arial", "sans-serif"],
      },
      boxShadow: {
        default: "0px 10px 20px 0px rgba(0, 0, 0, 0.07)",
      },
    },
  },
  plugins: [],
});
