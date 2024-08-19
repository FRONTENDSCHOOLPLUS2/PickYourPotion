import Link from "next/link";
import CardItemSmall from "./CardItemSmall";
import CardSwiper from "./CardSwiper";
import Navbar from "@/components/Navbar";
import { ProductDetail } from "./detail/[id]/page";
import ReviewCardItem from "@/components/ReviewCardItem";

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
  const takjuProduct = await fetchProductList([
    ["custom", '{ "extra.category": "PC01" }'],
    ["limit", "3"],
  ]);
  const yakjuProduct = await fetchProductList([
    ["custom", '{ "extra.category": "PC02" }'],
    ["limit", "3"],
  ]);
  const spiritProduct = await fetchProductList([
    ["custom", '{ "extra.category": "PC03" }'],
    ["limit", "3"],
  ]);
  const wineProduct = await fetchProductList([
    ["custom", '{ "extra.category": "PC04" }'],
    ["limit", "3"],
  ]);

  return (
    <>
      <Navbar />
      <main className="px-0">
        <CardSwiper />
        <div className="px-[25px]">
          <section id="product-best" className="mb-12">
            <h2 className="mt-5 mb-6 text-black subTitleMedium">베스트 상품</h2>
            <ul className="mb-3 [&>*:last-child]:mb-0 ">
              {bestProduct &&
                bestProduct.map((item) => {
                  return (
                    <li className="mb-3" key={item._id}>
                      <CardItemSmall data={item} />
                    </li>
                  );
                })}
            </ul>
          </section>
          <section id="product-takju" className="relative mb-12">
            <h2 className="mt-5 mb-6 text-black subTitleMedium">탁주</h2>
            <ul className="mb-3 [&>*:last-child]:mb-0 ">
              {takjuProduct &&
                takjuProduct.map((item) => {
                  return (
                    <li className="mb-3" key={item._id}>
                      <CardItemSmall data={item} />
                    </li>
                  );
                })}
            </ul>
            <Link href={"/market/raw"} className="absolute right-0 top-1 description text-gray">
              더보기 &gt;
            </Link>
          </section>
          <section id="product-yakju" className="relative mb-12">
            <h2 className="mt-5 mb-6 text-black subTitleMedium">약・청주</h2>
            <ul className="mb-3 [&>*:last-child]:mb-0 ">
              {yakjuProduct &&
                yakjuProduct.map((item) => {
                  return (
                    <li className="mb-3" key={item._id}>
                      <CardItemSmall data={item} />
                    </li>
                  );
                })}
            </ul>
            <Link href={"/market/refined"} className="absolute right-0 top-1 description text-gray">
              더보기 &gt;
            </Link>
          </section>
          <section id="product-spirit" className="relative mb-12">
            <h2 className="mt-5 mb-6 text-black subTitleMedium">증류주</h2>
            <ul className="mb-3 [&>*:last-child]:mb-0 ">
              {spiritProduct &&
                spiritProduct.map((item) => {
                  return (
                    <li className="mb-3" key={item._id}>
                      <CardItemSmall data={item} />
                    </li>
                  );
                })}
            </ul>
            <Link href={"/market/liquor"} className="absolute right-0 top-1 description text-gray">
              더보기 &gt;
            </Link>
          </section>
          <section id="product-wine" className="relative mb-12">
            <h2 className="mt-5 mb-6 text-black subTitleMedium">과실주</h2>
            <ul className="mb-3 [&>*:last-child]:mb-0 ">
              {wineProduct &&
                wineProduct.map((item) => {
                  return (
                    <li className="mb-3" key={item._id}>
                      <CardItemSmall data={item} />
                    </li>
                  );
                })}
            </ul>
            <Link href={"/market/fruit"} className="absolute right-0 top-1 description text-gray">
              더보기 &gt;
            </Link>
          </section>
          <section id="review-list" className="mb-12">
            <h2 className="mt-5 mb-6 text-black subTitleMedium">실시간 리뷰</h2>
            <div className="flex flex-wrap justify-between gap-y-3 review-wrapper">
              <ReviewCardItem />
              <ReviewCardItem />
              <ReviewCardItem />
              <ReviewCardItem />
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
