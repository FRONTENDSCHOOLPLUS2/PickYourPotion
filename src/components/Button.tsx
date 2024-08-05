interface ButtonProps {
  children: string;
  onClick: () => {};
  className?: string; // 추가적인 css
  selected: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className, selected = false }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg focus:outline-none duration-300
        ${selected ? "bg-primary text-black" : "bg-whiteGray text-darkGray"} 
        ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
