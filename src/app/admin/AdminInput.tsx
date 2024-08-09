interface InputProps {
  id: string;
  name: string;
  type: string;
  labelChildren?: string;
  children?: string;
  className?: string;
}

export default function AdminInput({
  id,
  name,
  type,
  labelChildren,
  children,
  className,
}: InputProps) {
  return (
    <div className={`${className}`}>
      <label htmlFor={id} className="subTitleMedium">
        {labelChildren}
      </label>
      <div className="flex items-center justify-between h-16 subTitle mt-3 border border-gray round px-5 focus-within:border-primary">
        <input
          id={id}
          name={name}
          type={type}
          className="w-full focus:outline-none text-black round"
        />
        <span className="">{children}</span>
      </div>
    </div>
  );
}
