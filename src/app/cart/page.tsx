import CartPage from "./CartPage";
import { auth } from "@/auth";

export async function fetchGetCart(token: string | undefined) {
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
    console.error(Error);
  }
  return resJson;
}
export default async function Page() {
  const session = await auth();
  const cartData = await fetchGetCart(session?.accessToken);

  return <CartPage cartData={cartData.item} total={cartData.cost} />;
}
