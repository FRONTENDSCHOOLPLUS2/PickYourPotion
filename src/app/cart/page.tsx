"use client";
import { useSession } from "next-auth/react";
import CartPage from "./CartPage";

export async function fetchCart(token: string | undefined) {
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
  console.log(session);
  console.log(session.data);
  const token = session.data?.accessToken;
  const data = fetchCart(token);
  // console.log(session.data?.accessToken);

  return <CartPage data={data} />;
}
