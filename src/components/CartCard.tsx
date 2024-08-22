"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

import plus from "../../public/images/icons/plus.svg";
import minus from "../../public/images/icons/minus.svg";
interface CartCardProps {
  name?: string;
  brewery?: string;
  price: number;
  alcohol?: string;
  quantity: number;
  image: string;
  productPrice: number;
  setQuantity: (quantity: number) => void;
}

export default function CartCard({
  name,
  brewery,
  price,
  alcohol,
  quantity,
  image,
  setQuantity,
}: CartCardProps) {
  const [count, setCount] = useState(quantity);

  useEffect(() => {
    setCount(quantity);
  }, [quantity]);

  useEffect(() => {
    setQuantity(count);
  }, [count, setQuantity]);

  const add = () => {
    if (count > 99) {
      alert("상품은 100개 이상 구입할 수 없습니다.");
    } else {
      setCount((prev) => prev + 1);
    }
  };

  const remove = () => {
    if (count < 2) {
      alert("0개 이하로 가면 장바구니 목록에서 없어지는 방식");
    } else {
      setCount((prev) => prev - 1);
    }
  };

  return (
    <div className="flex justify-between p-[10px] border-lightGray rounded-[10px] border-[1px] mb-5">
      <Image
        src={`https://api.fesp.shop${image}`}
        alt="장바구니 아이템"
        width={76}
        height={76}
        className="object-cover rounded-[8px] mr-4"
      />
      <div className="flex flex-col justify-center grow">
        <span className="contentMedium">{name}</span>
        <span className="text-gray text-[12px] mt-[4px]">{brewery}</span>
        <div className="text-[10px] text-primary border-primary mt-[2px] border-[1px] w-[40px] h-[20px] p-1 flex items-center justify-center rounded-xl">
          {alcohol}도
        </div>
      </div>
      <div className="flex flex-col items-center justify-between py-2">
        <div className="flex flex-row items-center w-[85px] justify-between">
          <Image src={minus} alt="마이너스 아이콘" onClick={remove} />
          <span className="contentMedium">{count}</span>
          <Image src={plus} alt="플러스 아이콘" onClick={add} />
        </div>
        <span className="contentMedium">{(count * price).toLocaleString()}원</span>
      </div>
    </div>
  );
}
