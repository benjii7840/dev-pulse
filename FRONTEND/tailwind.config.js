/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        float: "float 8s infinite alternate ease-in-out",
        "float-reverse": "float-reverse 12s infinite alternate ease-in-out",
        shimmer: "shimmer 3s ease infinite",
      },
      keyframes: {
        float: {
          "0%": {
            transform: "translateY(0px) rotate(0deg)",
            opacity: "0.3",
          },
          "100%": {
            transform: "translateY(-40px) rotate(6deg)",
            opacity: "0.7",
          },
        },
        "float-reverse": {
          "0%": {
            transform: "translateY(0px) rotate(0deg)",
            opacity: "0.2",
          },
          "100%": {
            transform: "translateY(40px) rotate(-6deg)",
            opacity: "0.5",
          },
        },
        shimmer: {
          "0%": {
            "background-position": "0% 50%",
          },
          "100%": {
            "background-position": "200% 50%",
          },
        },
      },
    },
  },
  plugins: [],
};
