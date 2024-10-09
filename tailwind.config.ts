import type { Config } from "tailwindcss";
import { PluginAPI } from "tailwindcss/types/config";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      dropShadow: {
        "custom-light": "0 5px 5px rgba(0, 0, 0, 0.35)",
        // "custom-dark": "50px 5px 5px rgba(255,255,255, 0.85)",
        // '0 5px 5px rgba(1, 1, 1, 0.55)'와 같은 사용자 정의 그림자
      },
      letterSpacing: {
        "5percent-tight": "-0.05em", // 자간을 5% 줄이는 설정
      },
      lineHeight: {
        lineHeight: "1.7", // 예: 170%의 line-height
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(180deg, rgba(238, 238, 238, 0) 62.5%, rgba(6, 6, 6, 0.626) 91.67%)",
        "custom-white":
          "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 24%, rgba(255,255,255,1) 100%)",
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
      keyframes: {
        zoomIn: {
          "0%": { transform: "scale(0)" },
          "100%": { transform: "scale(1)" },
        },
        bounce: {
          "0%, 100%": {
            transform: "translateY(-55%)",
            "animation-timing-function": "cubic-bezier(0.8,0,1,1)",
          },
          "50%": {
            transform: "none",
            "animation-timing-function": "cubic-bezier(0,0,0.2,1)",
          },
        },
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
            transform: "translateX(25px) translateY(-5px) rotate(-10deg)",
            "transform-origin": "center",
            "animation-timing-function": "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
        "cheers-glass-reverse": {
          "0%, 100%": {
            transform: "translate(0)",
            "animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateX(-25px) translateY(-5px) rotate(10deg)",
            "transform-origin": "center",
            "animation-timing-function": "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
        blink: {
          "0%, 100%": {
            opacity: "0",
            "animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            opacity: "1",
            "animation-timing-function": "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
        "moving-left": {
          "0%": {
            transform: "translateX(50px)",
            opacity: "0",
            "animation-timing-function": "cubic-bezier(.17,.67,.62,.92)",
          },
          "100%": {
            transform: "translateX(0)",
            opacity: "1",
          },
        },
        "moving-top": {
          "0%": {
            transform: "translateY(50px)",
            opacity: "0",
            "animation-timing-function": "cubic-bezier(.17,.67,.62,.92)",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
        fadeout: {
          "0%": {
            opacity: "1",
          },
          "100%": {
            opacity: "0",
          },
        },
        "scale-y-0-to-100": {
          "0%": {
            transform: "scaleY(0)",
            "animation-timing-function": "cubic-bezier(.17,.67,.62,.92)",
          },
          "100%": { transform: "scaleY(1)" },
        },
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
        "wiggle-reverse": "wiggle-reverse 1s ease-in-out infinite",
        "vertical-overlay": "vertical-overlay 1.5s ease-in-out infinite",
        "custom-bounce": "custom-bounce 1.5s ease-in-out infinite",
        "cheers-glass": "cheers-glass 1.5s ease-in-out infinite",
        "cheers-glass-reverse": "cheers-glass-reverse 1.5s ease-in-out infinite",
        blink: "blink 1.5s ease-in-out infinite",
        zoomIn: "zoomIn 0.5s ease-in-out",
      },
    },
  },
  plugins: [
    function ({ addBase, theme }: PluginAPI) {
      addBase({
        ":root": {
          "--color-primary": theme("colors.primary"),
          "--color-peach": theme("colors.peach"),
          "--color-ivory": theme("colors.ivory"),
          "--color-blue": theme("colors.blue"),
          "--color-black": theme("colors.black"),
          "--color-dark-gray": theme("colors.darkGray"),
          "--color-gray": theme("colors.gray"),
          "--color-light-gray": theme("colors.lightGray"),
          "--color-white-gray": theme("colors.whiteGray"),
          "--color-error": theme("colors.error"),
        },
      });
    },
  ],
};

export default config;
