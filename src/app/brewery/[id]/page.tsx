"use client";

import location from "../../../../public/images/icons/icon-location.png";
import globe from "../../../../public/images/icons/icon-globe.png";
import teller from "../../../../public/images/icons/icon-teller.png";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Activity {
  title: string;
  description: string;
  price: number;
}
interface Brewery {
  title: string;
  location: string;
  phone: string;
  link: string;
  reservation: boolean;
  id: number;
  main: string;
  content: string;
  mainImage: string;
  activity: Activity[];
}

export default function Page({ params }: { params: { id: number } }) {
  const id = Number(params.id); // URL에서 id 가져오기 및 숫자로 변환
  const [brewery, setBrewery] = useState<Brewery | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBreweryData = async () => {
      try {
        const response = await fetch("/brewery.json"); // 퍼블릭 디렉토리에서 JSON 파일 가져오기
        const data = await response.json();

        // id에서 1을 빼고 인덱스로 사용
        const index = Number(id) - 1; // id를 숫자로 변환 후 1을 뺌
        if (index >= 0 && index < data.brewery.length) {
          const foundBrewery = data.brewery[index]; // 해당 인덱스의 객체 가져오기
          setBrewery(foundBrewery);
        } else {
          setBrewery(null); // 인덱스가 유효하지 않으면 null 설정
        }
      } catch (error) {
        console.error("Error fetching the brewery data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBreweryData();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!brewery) return <div>Brewery not found.</div>;

  return (
    <>
      <div className="justify-center h-[428px] w-full overflow-hidden relative">
        <Image
          src={brewery.mainImage}
          width={428}
          height={450}
          alt="막걸리 이미지"
          className="absolute object-cover w-full h-full"
        />
        <div className="dark-shadow absolute w-full h-40 bottom-0"></div>
        <div className="absolute bottom-11 left-7 pl-200 ">
          <div className="flex flex-col">
            <span className="text-white drop-shadow-custom-light text-[38px] font-bold tracking-5percent-tight">
              {brewery.title}
            </span>
            <span className="text-white drop-shadow-custom-light mt-[-6px]">
              {brewery.location}
            </span>
          </div>
        </div>
      </div>
      <div className="relative px-8 py-[52px] mt-[-35px]  max-w-[428px] bg-white topRound">
        <div className="flex flex-row justify-between">
          <h1 className="flex items-center titleMedium">양조장 소개</h1>
        </div>
        <p className="black text-ellipsis mt-2.5 text-sm leading-lineHeight tracking-5percent-tight">
          {brewery.content}
        </p>
        <table className="mt-3">
          <tbody className="contentMedium">
            <tr className="mt-1">
              <td className="pr-1 black">대표술</td>
              <td>:</td>
              <td className="pl-1 text-slate-900 content tracking-5percent-tight">
                {brewery.main}
              </td>
            </tr>
            <tr className="mt-1">
              <td className=" pr-1 black">전화번호</td>
              <td>:</td>
              <td className="pl-1 text-slate-900 content tracking-5percent-tight">
                {brewery.phone}
              </td>
            </tr>
          </tbody>
        </table>
        <ul className="flex flex-row justify-between mt-5">
          <li className="flex border round py-3 px-4 ">
            <Link href={brewery.location} className="flex flex-row items-center justify-center">
              <Image src={location} alt="" width={24} height={24} className="p-1" />
              <span className="flex text-[14px] ml-1">지도보기</span>
            </Link>
          </li>
          <li className="flex border round py-3 px-4 ">
            <Link href={brewery.link} className="flex  items-center justify-center">
              <Image src={globe} alt="" width={24} height={24} className="p-1" />
              <span className="flex text-[14px] ml-1">홈페이지</span>
            </Link>
          </li>
          <li className="flex border round py-3 px-4 items-center justify-center">
            <Link
              href={`tel:${brewery.phone}`}
              className="flex flex-row items-center justify-center"
            >
              <Image src={teller} alt="" width={24} height={24} className="p-1" />
              <span className="flex text-[14px] ml-1">전화걸기</span>
            </Link>
          </li>
        </ul>
        <ul className="flex flex-col space-y-8 mt-8">
          {brewery.activity && brewery.activity.length > 0 ? (
            brewery.activity.map((act, subIndex) => (
              <li key={subIndex} className="flex flex-col mt-3">
                <div className="border w-full py-6 px-7 rounded-[20px]">
                  <span className="subTitleMedium">{act.title}</span>
                  <p className="text-sm mt-3 leading-lineHeight tracking-5percent-tight">
                    {act.description}
                  </p>
                  <span className="flex justify-end mt-3 contentMedium">{act.price}원</span>
                </div>
              </li>
            ))
          ) : (
            <p></p> // 액티비티가 없을 경우 표시
          )}
        </ul>
      </div>
    </>
  );
}
