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
        primary: "#F29963",
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
    },
  },
  plugins: [],
};

export default config;
