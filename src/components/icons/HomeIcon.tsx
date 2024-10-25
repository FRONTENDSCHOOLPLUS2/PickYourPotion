import { twMerge } from "tailwind-merge";

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={twMerge("fill-black", className)}
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_1712_1259)">
        <path d="M17.6 32V23.5294H22.4V32H28.4V20.7059H32L20 8L8 20.7059H11.6V32H17.6Z" />
      </g>
      <defs>
        <clipPath id="clip0_1712_1259">
          <rect width="40" height="40" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default HomeIcon;
