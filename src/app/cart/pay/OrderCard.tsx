"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import plus from "@/../public/images/icons/plus.svg";
import minus from "@/../public/images/icons/minus.svg";
import { InfoToast } from "@/toast/InfoToast";

export interface CartCardProps {
  name?: string;
  brewery?: string;
  price: number;
  alcohol?: string;
  quantity: number;
  image: string;
  setQuantity: (quantity: number) => void;
  extra?: { brewery: string; taste?: { alcohol: string }[] }[];
}

export default function OrderCard({
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
    if (count !== quantity) {
      setQuantity(count);
    }
  }, [count]);

  const add = () => {
    if (count >= 99) {
      alert("상품은 100개 이상 구입할 수 없습니다.");
    } else {
      setCount((prev) => prev + 1);
    }
  };

  const remove = () => {
    if (count <= 1) {
      InfoToast("1개 이하로는 주문할 수 없습니다.");
    } else {
      setCount((prev) => prev - 1);
    }
  };

  return (
    <div className="flex items-center justify-between p-[10px] border-lightGray rounded-[10px] border-[1px] mb-5">
      <Image
        src={`https://api.fesp.shop${image}`}
        alt="장바구니 아이템"
        width={76}
        height={76}
        className="rounded-[8px] w-[76px] h-[76px] object-cover mr-3"
      />
      <div className="flex flex-col justify-center grow w-auto">
        <span className="contentMedium text-ellipsis line-clamp-1">{name}</span>
        <span className="text-gray text-[12px] mt-[4px] text-ellipsis line-clamp-1">{brewery}</span>
        <div className="text-[10px] text-primary border-primary mt-[2px] border-[1px] w-[40px] h-[20px] p-1 flex items-center justify-center rounded-xl">
          {alcohol}도
        </div>
      </div>
      <div className="flex flex-col items-center justify-between py-2 ml-2 w-auto">
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
