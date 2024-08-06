import { twMerge } from "tailwind-merge";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string; // 추가적인 css
  color?: "fill" | "line" | "disabled";
}

export const btnColor = {
  line: "border-2 border-primary",
  fill: "bg-primary text-white",
  disabled: "bg-whiteGray text-darkGray",
};

const Button: React.FC<ButtonProps> = ({
  type = "button",
  children,
  className,
  color = "fill",
  ...rest
}) => {
  // Button을 불러온 곳에서 설정한 className을 twMerge로 오버라이딩
  const mergeClass = twMerge(
    `${btnColor[color]} px-4 py-2 rounded-lg focus:outline-none duration-300`,
    className,
  );

  return (
    <button type={type} className={mergeClass} {...rest}>
      {children}
    </button>
  );
};

export default Button;
