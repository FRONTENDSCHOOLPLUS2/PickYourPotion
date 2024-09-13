"use client";
import { ProductDetail } from "@/app/detail/[id]/page";
import Card from "@/components/Card";
import { ComboboxDemo } from "../SortDropdownMenu";
import { useEffect, useState } from "react";

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

export default function Page() {
  const [takjuProduct, setTakjuProduct] = useState<ProductDetail[]>([]);
  const [sortCriteria, setSortCriteria] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const products = await fetchProductList([["custom", '{ "extra.category": "PC01" }']]);
      setTakjuProduct(products);
    };
    fetchData();
  }, []);

  // 정렬 기준에 따른 정렬 함수
  useEffect(() => {
    let sortedProducts = [...takjuProduct];

    if (sortCriteria === "upPrice") {
      sortedProducts = sortedProducts.sort((a, b) => b.price - a.price); // 높은 가격순
    } else if (sortCriteria === "downPrice") {
      sortedProducts = sortedProducts.sort((a, b) => a.price - b.price); // 낮은 가격순
    } else if (sortCriteria === "best") {
      sortedProducts = sortedProducts.sort((a, b) => b.quantity - a.quantity); // 판매량 순 (남은 수량 많은 순)
    } else if (sortCriteria === "new") {
      sortedProducts = sortedProducts.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(), // 최신순
      );
    }

    setTakjuProduct(sortedProducts);
  }, [sortCriteria]);

  return (
    <div className="flex flex-col">
      <div className="flex justify-end mr-6">
        <ComboboxDemo onSelectSort={setSortCriteria} /> {/* 정렬 함수 전달 */}
      </div>
      <ul className="flex flex-wrap justify-start gap-4 px-[25px] pb-3">
        {takjuProduct &&
          takjuProduct.map((item) => {
            return (
              <li key={item._id} className="w-[calc(50%-8px)]">
                <Card data={item} />
              </li>
            );
          })}
      </ul>
    </div>
  );
}
