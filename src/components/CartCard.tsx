"use client";
import Image from "next/image";
import dummy from "../../public/community-dummy.png";
import plus from "../../public/images/icons/plus.svg";
import minus from "../../public/images/icons/minus.svg";
import { useState } from "react";

export default function CartCard() {
  const [isMinusCount, setIsMinusCount] = useState();
  const [isPlusCount, setIsPlusCount] = useState();
  const [isSelectCount, setIsSelectCount] = useState(1);
  const [isPrice, setIsPrice] = useState(13000);

  onclick = () => {};

  return (
    <div className="flex justify-between p-[10px] border-lightGray rounded-[10px] border-[1px] mb-5">
      <Image
        src={dummy}
        alt="장바구니 아이템"
        width={76}
        height={76}
        className="object-cover rounded-[8px] mr-4"
      />

      <div className="flex flex-col justify-center">
        <span className="contentMedium">로렘입숨 막걸리</span>
        <span className=" text-gray text-[12px] mt-[4px]">입생로랑 양조장</span>
        <div className=" text-[10px] text-primary border-primary mt-[2px] border-[1px] w-[40px] h-[20px] p-1 flex items-center justify-center rounded-xl">
          17도
        </div>
      </div>
      <div className="flex flex-col items-center justify-between py-2">
        <div className="flex flex-row items-center w-[85px] justify-between">
          <Image src={minus} alt="마이너스 아이콘" onClick={isMinusCount} />
          <span className="contentMedium">{isSelectCount}</span>
          <Image src={plus} alt="플러스 아이콘" onClick={} />
        </div>
        <span className="contentMedium">{isPrice}원</span>
      </div>
    </div>
  );
}
