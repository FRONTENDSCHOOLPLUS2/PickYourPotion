import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(180deg, rgba(238, 238, 238, 0) 62.5%, rgba(6, 6, 6, 0.626) 91.67%)",
      },
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
    },
  },
  plugins: [],
};

export default config;
