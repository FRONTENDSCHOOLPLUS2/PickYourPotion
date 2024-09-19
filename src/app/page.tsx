import Link from "next/link";
import CardItemSmall from "./CardItemSmall";
import CardSwiper from "./CardSwiper";
import { ProductDetail } from "./detail/[id]/page";
import Banner from "./Banner";
import Footer from "@/components/layout/Footer";
import { Metadata } from "next";
import Card from "@/components/Card";
import { auth } from "@/auth";
import { getUserInfo, updateAdminIsAdult } from "./adult/action";

export const metadata: Metadata = {
  title: "조지주 메인",
  openGraph: {
    title: "전통주 쇼핑몰 조지주",
    description: "당신이 원하는 술을 가질 수 있는 쇼핑몰, 조지주",
    url: "/",
  },
};

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
  const session = await auth();
  const token = session?.accessToken;
  const userId = session?.user?.id;
  if (userId === "2" && token) {
    const adminInfo = await getUserInfo(userId);
    const adminExtraInfo = adminInfo.item.extra;
    const adminAdultFalse = await updateAdminIsAdult(userId, adminExtraInfo, token);
  }

  const bestProduct = await fetchProductList([
    ["sort", '{"buyQuantity": -1}'],
    ["limit", "4"],
  ]);
  const newSortProduct = await fetchProductList([
    ["sort", '{ "createdAt": -1 }'],
    ["limit", "5"],
  ]);
  // const newProduct = await fetchProductList([["custom", '{ "extra.isNew": true }']]);
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
      <main className="px-0 bg-white">
        <CardSwiper data={newSortProduct} />
        <section id="product-best" className="mb-12 px-[25px]">
          <h2 className="mt-5 text-black subTitleMedium">베스트 상품</h2>
          <p className="mb-6 text-gray">최근 판매량이 가장 많은 상품이예요.</p>
          <ul className="flex flex-row flex-wrap gap-3 mb-3">
            {bestProduct &&
              bestProduct.map((item, index) => {
                return (
                  <li className="mb-3 w-[calc(50%-6px)]" key={item._id}>
                    <Card data={item} rate={index + 1} />
                  </li>
                );
              })}
          </ul>
        </section>
        <Banner />
        <section id="product-takju" className="relative mb-12 px-[25px]">
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
          <Link href={"/market/raw"} className="absolute right-[25px] top-1 description text-gray">
            더보기 &gt;
          </Link>
        </section>
        <section id="product-yakju" className="relative mb-12 px-[25px]">
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
          <Link
            href={"/market/refined"}
            className="absolute right-[25px] top-1 description text-gray"
          >
            더보기 &gt;
          </Link>
        </section>
        <section id="product-spirit" className="relative mb-12 px-[25px]">
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
          <Link
            href={"/market/liquor"}
            className="absolute right-[25px] top-1 description text-gray"
          >
            더보기 &gt;
          </Link>
        </section>
        <section id="product-wine" className="relative mb-12 px-[25px]">
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
          <Link
            href={"/market/fruit"}
            className="absolute right-[25px] top-1 description text-gray"
          >
            더보기 &gt;
          </Link>
        </section>
        {/* <section id="review-list" className="mb-12 px-[25px]">
          <h2 className="mt-5 mb-6 text-black subTitleMedium">실시간 리뷰</h2>
          <div className="flex flex-wrap justify-between gap-3 review-wrapper">
            <div className="w-[calc(50%-6px)]">
              <ReviewCardItem />
            </div>
            <div className="w-[calc(50%-6px)]">
              <ReviewCardItem />
            </div>
            <div className="w-[calc(50%-6px)]">
              <ReviewCardItem />
            </div>
            <div className="w-[calc(50%-6px)]">
              <ReviewCardItem />
            </div>
          </div>
        </section> */}
      </main>
      <Footer />
    </>
  );
}
