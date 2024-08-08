import { twMerge } from "tailwind-merge";

function Heart({ className }: { className?: string }) {
  return (
    <svg
      width="182"
      height="155"
      viewBox="0 0 182 155"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={twMerge("", className)}
    >
      <path
        d="M159.889 6.85791C142.417 -4.82677 118.302 2.68859 109.202 7.67225C100.102 12.6559 92.9752 26.161 91.0016 26.2417C89.0279 26.3224 86.4515 21.7127 77.3514 12.6563C68.2512 3.59978 42.8618 -7.90646 20.6575 7.67312C7.4623 17.0027 0.000192306 31.7671 0.000192306 47.9807C-0.090809 82.4913 32.1236 108.759 78.8073 150.335C85.7234 156.494 96.2796 156.585 103.287 150.426C148.605 110.39 184.005 81.7667 181.912 45.1728C181.093 29.5026 172.903 15.6441 159.889 6.85791Z"
        fill="#EB7373"
      />
      <ellipse
        cx="110.385"
        cy="66.5"
        rx="8.94381"
        ry="5.79023"
        transform="rotate(20 110.385 66.5)"
        fill="#AD1C1C"
      />
      <ellipse
        cx="65.1723"
        cy="65.5"
        rx="8.68315"
        ry="5.88507"
        transform="rotate(-20 65.1723 65.5)"
        fill="#AD1C1C"
      />
      <ellipse cx="128.5" cy="80" rx="7.5" ry="6" fill="#FFD1D1" />
      <ellipse cx="50.5" cy="81" rx="7.5" ry="6" fill="#FFD1D1" />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M69.88 81.6751C70.6118 80.5043 72.1542 80.1483 73.325 80.8801C73.6285 81.0698 73.9239 81.2576 74.2133 81.4416C76.0292 82.5964 77.61 83.6015 79.501 83.9883C81.4367 84.3842 83.9721 84.146 87.5 81.5001C88.465 80.7763 89.8093 80.8449 90.6957 81.6631C93.4163 84.1744 95.9676 84.7 98.1584 84.5095C100.476 84.3079 102.589 83.2841 104.26 82.3295C105.458 81.6445 106.986 82.0609 107.671 83.2597C108.356 84.4585 107.939 85.9857 106.74 86.6707C104.911 87.716 102.024 89.1923 98.5916 89.4907C95.5187 89.7579 92.1553 89.068 88.8613 86.6293C85.0518 89.02 81.6218 89.5256 78.499 88.8869C75.623 88.2986 73.1878 86.7321 71.4234 85.5972C71.1585 85.4269 70.9088 85.2662 70.675 85.1201C69.5042 84.3883 69.1482 82.8459 69.88 81.6751Z"
        fill="#AD1C1C"
      />
    </svg>
  );
}

export default Heart;