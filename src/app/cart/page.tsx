"use client";
import { useSession } from "next-auth/react";
import CartPage from "./CartPage";
import { useEffect, useState } from "react";

export async function fetchCart(token: string | null) {
  const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;
  const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
  const url = `${API_SERVER}/carts`;
  const res = await fetch(url, {
    headers: {
      "client-id": `${CLIENT_ID}`,
      Authorization: `Bearer ${token}`,
    },
  });
  const resJson = await res.json();
  if (!resJson.ok) {
    throw new Error("error");
  }
  return resJson.item;
}
export default function Page() {
  const session = useSession();
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const token = session?.data?.accessToken;
    const getCartData = async () => {
      if (token) {
        const data = await fetchCart(token);
        setCartData(data);
      }
    };
    getCartData();
  }, [session.data]);

  return <CartPage cartData={cartData} />;
}
