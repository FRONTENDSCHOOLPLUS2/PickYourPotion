import { auth } from "@/auth";
import { fetchGetCart } from "../page";
import PayPage from "./PayPage";

export default async function page() {
  const session = await auth();
  const token = session?.accessToken;
  const cartData = await fetchGetCart(session?.accessToken);

  return <PayPage item={cartData.item} token={token} />;
}
