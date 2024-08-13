import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  id: string;
  type: string;
  labelChildren?: string;
  children?: string;
  className?: string;
  register: UseFormRegisterReturn; // 타입을 변경;
  required?: boolean;
  error?: string;
}

export default function AdminInput({
  id,
  type,
  labelChildren,
  children,
  className,
  register,
}: InputProps) {
  return (
    <div className={`${className}`}>
      <label htmlFor={id} className="subTitleMedium">
        {labelChildren}
      </label>
      <div className="flex items-center justify-between h-16 subTitle mt-3 border border-gray round px-5 focus-within:border-primary">
        <input
          id={id}
          type={type}
          className="w-full focus:outline-none text-black round"
          {...register}
        />
        <span className="">{children}</span>
      </div>
    </div>
  );
}
