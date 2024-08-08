interface InputProps {
  width?: string; // tailwind처럼 사용해주세요. ex)w-72
  placeholder?: string;
  type: string;
  id: string;
  name?: string;
  className?: string;
  a11yHidden?: string; // 접근성 숨김 옵션
  children?: string; // 라벨 내용
}

const Input: React.FC<InputProps> = ({
  width,
  placeholder,
  type,
  id,
  name,
  className,
  a11yHidden,
  children,
}: InputProps) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className={a11yHidden}>
        {children}
      </label>
      <input
        className={`border-b border-lightGray py-2 focus:outline-none focus:border-primary ${width} ${className}`}
        placeholder={placeholder}
        id={id}
        name={name}
        type={type}
      />
    </div>
  );
};

export default Input;
