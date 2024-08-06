import Link from "next/link";
import { ReactNode } from "react";
import { btnColor } from "./Button";

interface LinkButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  href: string;
  color?: "fill" | "line" | "disabled";
}

export const LinkButton = ({ children, href, color = "fill", ...rest }: LinkButtonProps) => {
  return (
    <Link
      href={href}
      className={`${btnColor[color]} px-4 py-2 box-border text-center rounded-lg focus:outline-none duration-300`}
      {...rest}
    >
      {children}
    </Link>
  );
};
