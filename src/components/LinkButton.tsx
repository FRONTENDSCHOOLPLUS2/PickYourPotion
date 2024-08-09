import Link from "next/link";
import { ReactNode } from "react";
import { btnColor } from "./Button";
import { twMerge } from "tailwind-merge";

interface LinkButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  className?: string;
  href: string;
  color?: "fill" | "line" | "disabled";
}

export const LinkButton = ({
  children,
  className,
  href,
  color = "fill",
  ...rest
}: LinkButtonProps) => {
  return (
    <Link
      href={href}
      className={twMerge(
        `${btnColor[color]} inline-block px-4 py-2 box-border text-center rounded-lg focus:outline-none duration-300`,
        className,
      )}
      {...rest}
    >
      {children}
    </Link>
  );
};
