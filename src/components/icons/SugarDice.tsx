import { twMerge } from "tailwind-merge";

function SugarDice({ className }: { className: string }) {
  return (
    <svg
      width="56"
      height="121"
      viewBox="0 0 56 121"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${twMerge("", className)}`}
    >
      <path
        d="M49.1668 107.673L35.3076 119.552H1.48927V85.8448L16.3509 73.9555L49.1668 74.9499V107.673Z"
        fill="white"
        stroke="#383838"
        strokeWidth="2"
      />
      <path d="M1.5 85.7104L34.6425 87.434L49.5 74.7104" stroke="#383838" strokeWidth="2" />
      <path d="M34.6425 87.2104L35.5 119.71" stroke="#383838" strokeWidth="2" />
      <circle
        cx="7.73391"
        cy="92.6089"
        r="1"
        fill="#383838"
        stroke="#383838"
        strokeWidth="0.069895"
      />
      <circle
        cx="11.8737"
        cy="96.7486"
        r="1"
        fill="#383838"
        stroke="#383838"
        strokeWidth="0.069895"
      />
      <circle
        cx="13.9436"
        cy="92.6089"
        r="1"
        fill="#383838"
        stroke="#383838"
        strokeWidth="0.069895"
      />
      <circle
        cx="28.4329"
        cy="78.1197"
        r="1"
        fill="#383838"
        stroke="#383838"
        strokeWidth="0.069895"
      />
      <circle
        cx="36.7124"
        cy="78.1197"
        r="1"
        fill="#383838"
        stroke="#383838"
        strokeWidth="0.069895"
      />
      <circle
        cx="38.7823"
        cy="102.958"
        r="1"
        fill="#383838"
        stroke="#383838"
        strokeWidth="0.069895"
      />
      <circle
        cx="42.9221"
        cy="107.098"
        r="1"
        fill="#383838"
        stroke="#383838"
        strokeWidth="0.069895"
      />
      <circle
        cx="38.7823"
        cy="109.168"
        r="1"
        fill="#383838"
        stroke="#383838"
        strokeWidth="0.069895"
      />
      <circle
        cx="32.5726"
        cy="82.2593"
        r="1"
        fill="#383838"
        stroke="#383838"
        strokeWidth="0.069895"
      />
    </svg>
  );
}

export default SugarDice;
