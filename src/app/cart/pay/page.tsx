import { auth } from "@/auth";
import { fetchGetCart } from "../page";
import PayPage from "./PayPage";

export default async function page() {
  const session = await auth();
  const cartData = await fetchGetCart(session?.accessToken);

  return <PayPage cartData={cartData.item} total={cartData.cost} />;
}
