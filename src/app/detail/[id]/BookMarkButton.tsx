"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import heart from "../../../../public/images/icons/icon-like.svg";
import heartActive from "../../../../public/images/icons/icon-like-true.svg";
import { InfoToast } from "@/toast/InfoToast";
import Image from "next/image";
interface BookMarkButtonProps {
  token: string | undefined;
  productId: string | string[];
  className?: string;
}
export async function addBookmark(productId: number, token: string | undefined) {
  const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;
  const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
  const url = `${API_SERVER}/bookmarks/product`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "client-id": `${CLIENT_ID}`,
    },
    body: JSON.stringify({
      target_id: productId,
    }),
  });
  const resJson = await res.json();
  if (!resJson.ok) {
    throw new Error("error");
  }
  return resJson.item;
}
export async function deleteBookmark(productId: number, token: string | undefined) {
  const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;
  const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
  const url = `${API_SERVER}/bookmarks/${productId}`;
  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "client-id": `${CLIENT_ID}`,
    },
  });
  const resJson = await res.json();

  if (!resJson.ok) {
    throw new Error("error");
  }
  return resJson.item;
}
export async function getBookmark(token: string | undefined) {
  const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;
  const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
  const url = `${API_SERVER}/bookmarks/product`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "client-id": `${CLIENT_ID}`,
    },
  });
  const resJson = await res.json();

  if (!resJson.ok) {
    throw new Error("error");
  }
  return resJson.item;
}

export default function BookMarkButton({ token, productId }: BookMarkButtonProps) {
  const queryClient = useQueryClient();
  const [bookId, setBookId] = useState<number | null>(null);
  const { data: book } = useQuery({
    queryKey: ["book"],
    queryFn: () => getBookmark(token),
  });

  useEffect(() => {
    book?.map((v: { product: { _id: number }; _id: number }) => {
      if (v.product._id === Number(productId)) {
        setBookId(v._id);
      }
    });
  }, [productId, token, book]);

  const handleAddBookmark = () => {
    addBookmark(Number(productId), token);
    setBookId(bookId);
    InfoToast("상품을 찜했습니다.");
    queryClient.invalidateQueries({ queryKey: ["book"] });
  };
  const handleDeleteBookmark = () => {
    if (bookId !== null) {
      deleteBookmark(bookId, token);
    }
    setBookId(null);
    InfoToast("상품 찜을 취소했습니다.");
    queryClient.invalidateQueries({ queryKey: ["book"] });
  };
  return (
    <div>
      {bookId ? (
        <button onClick={handleDeleteBookmark}>
          <Image src={heartActive} width={40} height={40} alt="찜하기 버튼" priority={true} />
        </button>
      ) : (
        <button onClick={handleAddBookmark}>
          <Image src={heart} width={40} height={40} alt="찜하기 버튼" priority={true} />
        </button>
      )}
    </div>
  );
}
