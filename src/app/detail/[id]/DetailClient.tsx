"use client";
import Image from "next/image";
import iconLike from "../../../../public/images/icons/icon-like.svg";
import iconLikeTrue from "../../../../public/images/icons/icon-like-true.svg";
import { useEffect, useState } from "react";
import Detail from "./Detail";
import Reply from "./Reply";
import { fetchDetail } from "./page";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Buying from "./Buying";
import AddCart from "./AddCart";
import { useProductStore } from "@/zustand/Store";
import plus from "../../../../public/images/icons/plus.svg";
import minus from "../../../../public/images/icons/minus.svg";
import DegreeBar from "@/components/DegreeBar";
export default function DetailClient() {
  let content;
  let { id } = useParams();

  const { data } = useQuery({
    queryKey: ["detail", id],
    queryFn: () => fetchDetail(id as string),
  });

  const { showDetail, setShowDetail, setName, setPrice, quantity, setQuantity, setBrewery } =
    useProductStore((state) => ({
      showDetail: state.showDetail,
      setShowDetail: state.setShowDetail,
      setName: state.setName,
      setPrice: state.setPrice,
      quantity: state.quantity,
      setQuantity: state.setQuantity,
      setBrewery: state.setBrewery,
    }));

  if (data) {
    if (showDetail) {
      content = <Detail data={data} />;
    } else {
      content = <Reply data={data} />;
    }
  }

  const add = () => {
    if (quantity > 99) {
      alert("상품은 100개 이상 구입할 수 없습니다.");
    } else {
      setQuantity(quantity + 1);
    }
  };
  const remove = () => {
    if (quantity < 2) {
      alert("0개 이하는 구매할 수 없습니다.");
    } else {
      setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
    if (data) {
      setName(data?.name);
      setPrice(data?.price);
      setBrewery(data?.extra?.brewery);
    }
  }, [data, setName, setPrice, setBrewery]);
  console.log(data);
  return (
    <>
      {data && (
        <div className="justify-center max-w-3xl">
          <Image
            src={`https://api.fesp.shop${data?.mainImages[0]?.path}`}
            width={428}
            height={450}
            alt="막걸리 이미지"
          />
        </div>
      )}
      <div className="relative px-10 py-8 mt-[-35px]  max-w-[428px] bg-white topRound topShadow">
        <div className="flex flex-row justify-between">
          <h1 className="flex items-center titleMedium">{data?.name}</h1>
          <div className="flex flex-col mt-3">
            <p className="subTitleLight text-darkGray text-ellipsis ">{data?.price}원</p>
            <p className="content text-darkGray text-ellipsis ">{data?.extra.brewery}</p>
          </div>
        </div>

        <div className="flex flex-row items-center w-[85px] justify-between">
          <button onClick={remove}>
            <Image src={minus} alt="마이너스 아이콘" />
          </button>
          <span className="contentMedium">{quantity}</span>
          <button onClick={add}>
            <Image src={plus} alt="플러스 아이콘" />
          </button>
        </div>
        <div className="flex flex-row gap-4 mt-3 ">
          <div className="w-[82px] h-[64px] flex flex-col items-center justify-center bg-ivory round gap-1">
            <span className="text-black contentMedium">주종</span>
            <p className="description text-gray ">{data?.extra.category}</p>
          </div>

          <div className="w-[82px] h-[64px] flex flex-col items-center justify-center bg-ivory round gap-1">
            <span className="text-black contentMedium ">도수</span>
            <p className="description text-gray">{data?.extra.taste.alcohol}도</p>
          </div>
          <div className="w-[82px] h-[64px] flex flex-col items-center justify-center bg-ivory round ">
            <span className="text-black contentMedium">용량</span>
            <p className="description text-gray">{data?.extra.volume}ml</p>
          </div>
          <div className="w-[82px] h-[64px] flex flex-col items-center justify-center bg-ivory round ">
            <span className="text-black contentMedium">소비기한</span>
            <p className="description text-gray w-[50px]">{data?.extra.useByDate}</p>
          </div>
        </div>
        <div className="p-3 mt-6 ">
          <div>
            <p>당도</p>
            <DegreeBar degree={data?.extra.taste.sweet} color="#FF8F4B" />
          </div>
          <div className="mt-3">
            <p>산미</p>
            <DegreeBar degree={data?.extra.taste.acidity} color="#FF8F4B" />
          </div>
          <div className="mt-3">
            <p>바디감</p>
            <DegreeBar degree={data?.extra.taste.body} color="#FF8F4B" />
          </div>
          <div className="mt-3">
            <p>씁쓸함</p>
            <DegreeBar degree={data?.extra.taste.bitter} color="#FF8F4B" />
          </div>
          <div className="mt-3">
            <p>탄산</p>
            <DegreeBar degree={data?.extra.taste.sparkle} color="#FF8F4B" />
          </div>
        </div>
        <div className="flex flex-row mt-5 round top-shadow bg-whiteGray ">
          <button
            className={`contentMedium w-[186px] h-[52px] flex items-center justify-center cursor-pointer  transition-colors round ${
              showDetail ? "bg-primary text-white " : "bg-whiteGray text-black"
            }`}
            onClick={() => setShowDetail(true)}
          >
            상세설명
          </button>
          <button
            className={`contentMedium w-[186px] h-[52px] flex items-center  justify-center cursor-pointer transition-colors round ${
              !showDetail ? "bg-primary text-white" : "bg-whiteGray text-black"
            }`}
            onClick={() => setShowDetail(false)}
          >
            후기
          </button>
        </div>

        {content}
        <div className="sticky bottom-0 flex flex-row gap-3 mt-5 mb-5 bg-white left-6 round">
          <AddCart data={data} />
          <Buying data={data} />
        </div>
      </div>
    </>
  );
}
