"use client";

import { ProductDetail } from "@/app/detail/[id]/page";
import Card from "@/components/Card";
import { ComboboxDemo } from "../SortDropdownMenu";
import { useEffect, useState } from "react";
import Pagination from "@/components/Pagination";

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
  const [spiritProduct, setSpiritProduct] = useState<ProductDetail[]>([]);
  const [sortItem, setSortItem] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(0);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      const products = await fetchProductList([["custom", '{ "extra.category": "PC03" }']]);
      setSpiritProduct(products);
    };
    fetchData();
  }, []);

  useEffect(() => {
    let sortedProducts = [...spiritProduct];

    if (sortItem === "upPrice") {
      sortedProducts = sortedProducts.sort((a, b) => b.price - a.price); // 높은 가격순
    } else if (sortItem === "downPrice") {
      sortedProducts = sortedProducts.sort((a, b) => a.price - b.price); // 낮은 가격순
    } else if (sortItem === "best") {
      sortedProducts = sortedProducts.sort((a, b) => a.quantity - b.quantity); // 판매량 순 (남은 수량 많은 순)
    } else if (sortItem === "new") {
      sortedProducts = sortedProducts.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(), // 최신순
      );
    }

    setSpiritProduct(sortedProducts);
  }, [sortItem]);

  const paginatedProducts = spiritProduct.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage,
  );

  const handlePageChange = (selectedPage: number) => {
    setCurrentPage(selectedPage); // 선택한 페이지로 변경
  };
  return (
    <div className="flex flex-col pb-3">
      <div className="flex justify-end mr-6">
        <ComboboxDemo onSelectSort={setSortItem} />
      </div>
      <ul className="flex flex-wrap justify-start gap-4 px-[25px] pb-3">
        {paginatedProducts &&
          paginatedProducts.map((item) => {
            return (
              <li key={item._id} className="w-[calc(50%-8px)]">
                <Card data={item} />
              </li>
            );
          })}
      </ul>
      <Pagination
        pageCount={Math.ceil(spiritProduct.length / itemsPerPage)} // 총 페이지 수 계산
        onPageChange={handlePageChange} // 페이지 변경 시 실행
      />
    </div>
  );
}
