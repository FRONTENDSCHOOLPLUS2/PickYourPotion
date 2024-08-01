import { twMerge } from "tailwind-merge";

function CartIcon({ className }: { className: string }) {
  return (
    <svg
      className={twMerge(className)}
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M27.5 12H25C25 9.2375 22.7625 7 20 7C17.2375 7 15 9.2375 15 12H12.5C11.125 12 10 13.125 10 14.5V29.5C10 30.875 11.125 32 12.5 32H27.5C28.875 32 30 30.875 30 29.5V14.5C30 13.125 28.875 12 27.5 12ZM20 9.5C21.375 9.5 22.5 10.625 22.5 12H17.5C17.5 10.625 18.625 9.5 20 9.5ZM27.5 29.5H12.5V14.5H15V17C15 17.6875 15.5625 18.25 16.25 18.25C16.9375 18.25 17.5 17.6875 17.5 17V14.5H22.5V17C22.5 17.6875 23.0625 18.25 23.75 18.25C24.4375 18.25 25 17.6875 25 17V14.5H27.5V29.5Z"
        // fill="#6F6F6F"
      />
    </svg>
  );
}

export default CartIcon;
