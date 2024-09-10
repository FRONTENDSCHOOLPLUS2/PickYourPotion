"use client";
import { useState } from "react";
import Image from "next/image";

import plus from "../../public/images/icons/plus.svg";
import minus from "../../public/images/icons/minus.svg";
import itemdelete from "../../public/images/icons/icon-trash.svg";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { fetchGetCart } from "@/app/cart/page";

export interface CartCardProps {
  name?: string;
  brewery?: string;
  price: number;
  alcohol?: string;
  quantity: number;
  image: string;
  _id: number;
  handleQuantityChange: (quantity: number) => void;
}

export async function fetchChangeCart(_id: number, quantity: number, accessToken: string) {
  const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;
  const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
  const url = `${API_SERVER}/carts/${_id}`;
  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      "client-id": `${CLIENT_ID}`,
    },
    body: JSON.stringify({
      quantity: quantity,
    }),
  });
  const resJson = await res.json();
  if (!resJson.ok) {
    throw new Error("error");
  }
  return resJson.item;
}
export async function fetchDeleteCartCard(_id: number, accessToken: string) {
  const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;
  const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
  const url = `${API_SERVER}/carts/${_id}`;
  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,

      "client-id": `${CLIENT_ID}`,
    },
  });
  const resJson = await res.json();
  if (!resJson.ok) {
    throw new Error("error");
  }
  return resJson.item;
}

export default function CartCard({
  name,
  brewery,
  price,
  alcohol,
  quantity: initialQuantity,
  image,
  _id,
  handleQuantityChange,
}: CartCardProps) {
  const session = useSession();
  const router = useRouter();
  const token = session.data?.accessToken;

  // 상태를 초기 수량으로 설정
  const [quantity, setQuantity] = useState(initialQuantity);

  const productTotalPrice = quantity * price;

  const handleAddClick = async (count: number) => {
    if (!token) {
      alert("장바구니 추가를 하려면 로그인해야 합니다.");
      return router.push("/login");
    }

    const newQuantity = quantity + count;

    try {
      if (newQuantity === 0) {
        await fetchDeleteCartCard(_id, token);
        handleQuantityChange(newQuantity);
        setQuantity(newQuantity);
      } else {
        const updatedItem = await fetchChangeCart(_id, newQuantity, token);
        setQuantity(updatedItem.quantity);
        handleQuantityChange(updatedItem.quantity);
      }
    } catch (error) {
      alert("수량을 변경하는 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      {quantity !== 0 && (
        <div className="flex items-center justify-between p-[10px] border-lightGray rounded-[10px] border-[1px] mb-5">
          <Image
            src={`https://api.fesp.shop${image}`}
            alt="장바구니 아이템"
            width={76}
            height={76}
            className="rounded-[8px] w-[76px] h-[76px] object-cover mr-3"
          />
          <div className="flex flex-col justify-center grow w-auto gap-[2px]">
            <span className="contentMedium text-ellipsis line-clamp-1">{name}</span>
            <span className="text-gray text-[12px] text-ellipsis line-clamp-1">{brewery}</span>
            <div className="text-[10px] text-primary border-primary mt-[2px] border-[1px] w-[40px] h-[20px] p-1 flex items-center justify-center rounded-xl">
              {alcohol}도
            </div>
          </div>
          <div className="flex flex-col items-center justify-between py-2 ml-2 w-auto relative">
            <div className="flex flex-row items-center w-[85px] justify-between my-2">
              {quantity > 1 ? (
                <Image src={minus} alt="마이너스 아이콘" onClick={() => handleAddClick(-1)} />
              ) : (
                <Image src={itemdelete} alt="삭제 아이콘" onClick={() => handleAddClick(-1)} />
              )}
              <span className="contentMedium">{quantity}</span>
              <Image src={plus} alt="플러스 아이콘" onClick={() => handleAddClick(1)} />
            </div>
            <span className="contentMedium tracking-5percent-tight">
              {productTotalPrice.toLocaleString()} 원
            </span>
          </div>
        </div>
      )}
    </>
  );
}
