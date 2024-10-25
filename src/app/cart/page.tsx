import { useSession } from "next-auth/react";
import CartPage from "./CartPage";
import { auth } from "@/auth";

export default async function Page() {
  const session = await auth();
  const token = session?.accessToken;

  return <CartPage token={token} />;
}
