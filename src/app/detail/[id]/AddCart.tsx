"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ProductDetail } from "./page";
import { errorToast } from "@/toast/errorToast";
import { InfoToast } from "@/toast/InfoToast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export async function fetchAddCart(_id: number, quantity: number, accessToken: string) {
  const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;
  const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
  const url = `${API_SERVER}/carts`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      "client-id": `${CLIENT_ID}`,
    },
    body: JSON.stringify({
      product_id: _id,
      quantity: quantity,
    }),
  });
  const resJson = await res.json();
  if (!resJson.ok) {
    throw new Error("error");
  }
  return resJson.item;
}

export default function AddCart({ data }: { data: ProductDetail }) {
  const queryClient = useQueryClient();
  const session = useSession();
  const router = useRouter();
  const token = session.data?.accessToken;

  const { mutate } = useMutation({
    mutationFn() {
      if (token) {
        return fetchAddCart(data._id, 1, token);
      } else {
        throw new Error("Access token is undefined");
      }
    },
    onSuccess(resData) {
      if (resData) {
        queryClient.invalidateQueries({
          queryKey: ["cart"],
        });
      } else {
        console.error(resData.message);
      }
    },
    onError(err) {
      console.error(err);
    },
  });

  const sessionCheckEvent = () => {
    if (token) {
      mutate();
      InfoToast("장바구니에 상품을 추가했습니다.");
    } else {
      InfoToast("장바구니 추가를 하려면 로그인해야 합니다.");
      router.push("/login");
    }
  };

  return (
    <button
      className={`contentMedium w-[124px] h-[62px] flex items-center justify-center cursor-pointe bg-whiteGray text-darkGray round`}
      onClick={sessionCheckEvent}
    >
      술바구니
      <br /> 추가
    </button>
  );
}
