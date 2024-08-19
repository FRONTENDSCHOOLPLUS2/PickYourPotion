import Image from "next/image";

import ArrowIcon from "@/../public/images/icons/icon-arrow-drop-down.svg";
import { UseFormRegisterReturn } from "react-hook-form";

interface CategoryProps {
  value: string;
  name: string;
}
[];

interface SelectProps {
  id: string;
  category: CategoryProps[];
  labelChildren?: string;
  className?: string;
  register: UseFormRegisterReturn; // 타입을 변경
  required?: boolean;
}

export default function AdminSelect({
  id,
  category,
  labelChildren,
  className,
  register,
}: SelectProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      <label htmlFor={id} className="subTitleMedium mb-3">
        {labelChildren}
      </label>
      <div className="relative">
        <select
          id={id}
          className="w-full h-16 subTitle focus:outline-none focus:border-primary border border-gray round px-5 appearance-none"
          {...register}
        >
          {category.map((item, index) => (
            <option key={index} value={item.value}>
              {item.name}
            </option>
          ))}
        </select>
        <Image src={ArrowIcon} alt="드롭박스 화살표 아이콘" className="absolute top-5 right-5" />
      </div>
    </div>
  );
}
