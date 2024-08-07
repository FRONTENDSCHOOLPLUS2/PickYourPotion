import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        light: ["SBAggroL", "sans-serif"],
        medium: ["SBAggroM", "sans-serif"],
        bold: ["SBAggroB", "sans-serif"],
      },
      colors: {
        primary: "#FF8F4B",
        peach: "#FFBB91",
        ivory: "#FFF3E3",
        blue: "#89A9D8",
        black: "#181818",
        darkGray: "#6F6F6F",
        gray: "#929292",
        lightGray: "#d8d8d8",
        whiteGray: "#f5f5f5",
        white: "#ffffff",
        error: "#eb5757",
      },
      size: {
        size: "10",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)", "transform-origin": "center" },
          "50%": { transform: "rotate(3deg)" },
        },
        "wiggle-reverse": {
          "0%, 100%": { transform: "rotate(deg)", "transform-origin": "center" },
          "50%": { transform: "rotate(-3deg)" },
        },
        "vertical-overlay": {
          "0%": { transform: "translateY(-10px)", "transform-origin": "top", opacity: "0" },
          "50%": { opacity: "1" },
          "100%": { transform: "translateY(20px)", opacity: "0" },
        },
        "custom-bounce": {
          "0%, 100%": {
            transform: "translateY(-20px)",
            "animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(0px)",
            "animation-timing-function": "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
        "cheers-glass": {
          "0%, 100%": {
            transform: "translateX(0) translateY(0)",
            "animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateX(25px) translateY(-5px)",
            "animation-timing-function": "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
        "cheers-glass-reverse": {
          "0%, 100%": {
            transform: "translate(0)",
            "animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateX(-25px) translateY(-5px)",
            "animation-timing-function": "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
        "wiggle-reverse": "wiggle-reverse 1s ease-in-out infinite",
        "vertical-overlay": "vertical-overlay 1.5s ease-in-out infinite",
        "custom-bounce": "custom-bounce 1.5s ease-in-out infinite",
        "cheers-glass": "cheers-glass 1.5s ease-in-out infinite",
        "cheers-glass-reverse": "cheers-glass-reverse 1.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
