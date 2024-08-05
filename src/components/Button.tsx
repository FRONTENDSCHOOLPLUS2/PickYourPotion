interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string; // 추가적인 css
  selected: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, className, selected = false, ...rest }) => {
  return (
    <button
      className={`px-4 py-2 rounded-lg focus:outline-none duration-300
        ${selected ? "bg-primary text-white" : "bg-whiteGray text-darkGray"} 
        ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
