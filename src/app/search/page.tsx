"use client";
import Image from "next/image";
import searchIcon from "../../../public/images/icons/icon-search.svg";
import Input from "@/components/Input";
import { useEffect, useState } from "react";
import CardItemSmall from "../CardItemSmall";
import useDebounce from "./useDebounce";

export async function fetchSearch(debounceValue: string, searchText: string) {
  const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;
  const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
  const url = `${API_SERVER}/products?keyword=${searchText}`;
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
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
  const [searchText, setSearchText] = useState("");
  const [result, setResult] = useState<any[]>([]);
  const debounceValue = useDebounce(searchText, 900);

  useEffect(() => {
    const fetchData = async () => {
      if (debounceValue) {
        try {
          const fetchedResult = await fetchSearch(debounceValue, searchText);
          setResult(fetchedResult);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchData();
  }, [debounceValue, searchText]);

  const list = result.map((data) => <CardItemSmall key={data._id} data={data} />);

  return (
    <div className="flex flex-col mx-[25px] mt-14 max-w-[428px]">
      <div className="flex">
        <p className="font-medium text-primary text-[36px]">어떤 술</p>
        <p className="text-[28px] font-light text-darkGray flex mt-1 items-center">을</p>
      </div>
      <p className="font-light text-darkGray text-[36px] mt-[-10px]">원하시나요?</p>
      <div className="flex mt-12">
        <Input type={""} id={""} width="w-full" onChange={(e) => setSearchText(e.target.value)} />
        <button className="ml-[-30px]">
          <Image src={searchIcon} width={35} height={35} alt="돋보기 버튼" />
        </button>
      </div>

      <div className="mt-8">
        {list.length > 0 ? list : <p className="text-darkGray">검색 결과가 없습니다.</p>}
      </div>
    </div>
  );
}
