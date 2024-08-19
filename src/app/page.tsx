import Link from "next/link";
import CardItemSmall from "./CardItemSmall";
import CardSwiper from "./CardSwiper";
import Navbar from "@/components/Navbar";
import { ProductDetail } from "./detail/[id]/page";

async function fetchProductList(params?: string[][]): Promise<ProductDetail[]> {
  const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;
  const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
  const searchParams = new URLSearchParams(params);
  const url = `${API_SERVER}/products?showSoldOut=true${"&" + searchParams.toString()}`;
  const res = await fetch(url, {
    headers: {
      "client-id": `${CLIENT_ID}`,
    },
  });
  const resJson = await res.json();
  if (!resJson.ok) {
    throw new Error("error");
  }
  return resJson.item;
}

export default async function Home() {
  const bestProduct = await fetchProductList([["custom", '{ "extra.isBest": true }']]);
  return (
    <>
      <Navbar />
      <main className="px-0">
        <CardSwiper />
        <section id="product-best" className="px-[25px]">
          <h2 className="mb-6 text-black subTitleMedium mt-5">베스트 상품</h2>
          <ul className="mb-3 [&>*:last-child]:mb-0 ">
            <li className="mb-3">
              <Link href="/">
                <CardItemSmall />
              </Link>
            </li>
            <li className="mb-3">
              <Link href="/">
                <CardItemSmall />
              </Link>
            </li>
            <li className="mb-3">
              <Link href="/">
                <CardItemSmall />
              </Link>
            </li>
          </ul>
        </section>
      </main>
    </>
  );
}
