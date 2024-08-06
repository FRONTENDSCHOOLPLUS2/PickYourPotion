"use client";
import Image from "next/image";
import iconLike from "../../../../public/images/icons/icon-like.svg";
import iconLikeTrue from "../../../../public/images/icons/icon-like-true.svg";
import { useState } from "react";
import Detail from "./detail";
import Reply from "./reply";
import { ProductDetail } from "./page";

export default async function DetailClient({ data }: { data: ProductDetail }) {
  let content;
  let likeBtn;
  const [showDetail, setShowDetail] = useState(true);
  const [like, setLike] = useState(false);

  const handleToggle = () => {
    setShowDetail(!showDetail);
  };
  const handleLike = () => {
    setLike(!like);
  };

  if (showDetail) {
    content = <Detail data={data} />;
  } else {
    content = <Reply />;
  }

  if (like) {
    likeBtn = iconLikeTrue;
  } else {
    likeBtn = iconLike;
  }
  console.log(data);
  return (
    <>
      <div className="justify-center max-w-3xl">
        <Image
          src={`https://api.fesp.shop${data.mainImages[0]?.path}`}
          width={428}
          height={450}
          alt="막걸리 이미지"
        />
      </div>
      <div className="relative px-10 py-8 mt-[-35px]  max-w-[428px] bg-white topRound topShadow">
        <div className="flex flex-row justify-between">
          <h1 className="flex items-center title">{data.name}</h1>
          <button onClick={handleLike}>
            <Image src={likeBtn} width={32} height={22} alt="막걸리 이미지" />
            <p className="flex justify-center description text-darkGray">4472</p>
          </button>
        </div>
        <p className="content text-darkGray text-ellipsis mt-2.5">{data.price}원</p>
        <p className="content text-darkGray text-ellipsis mt-2.5">
          Lorem Ipsum is simply dummy text of the printing and
        </p>
        <p className="content text-darkGray text-ellipsis mt-2.5">복순도가 양조장</p>

        <div className="flex flex-row gap-4 mt-3 ">
          <div className="w-[82px] h-[64px] flex flex-col items-center justify-center bg-ivory round">
            <span className="mt-2 text-black contentMedium">주종</span>
            <p className="description text-gray mt-[-2px]">증류식</p>
            <p className="description text-gray mt-[-6px]">소주</p>
          </div>

          <div className="w-[82px] h-[64px] flex flex-col items-center justify-center bg-ivory round gap-1">
            <span className="text-black contentMedium ">도수</span>
            <p className="description text-gray">10도</p>
          </div>
          <div className="w-[82px] h-[64px] flex flex-col items-center justify-center bg-ivory round ">
            <span className="text-black contentMedium">용량</span>
            <p className="description text-gray">1L</p>
          </div>
          <div className="w-[82px] h-[64px] flex flex-col items-center justify-center bg-ivory round ">
            <span className="text-black contentMedium">소비기한</span>
            <p className="description text-gray">무제한</p>
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
          <button
            className={`contentMedium w-[124px] h-[62px] flex items-center justify-center cursor-pointe bg-whiteGray text-darkGray round`}
          >
            술바구니
            <br /> 추가
          </button>
          <button
            className={`contentMedium w-[244px] h-[62px] flex items-center  justify-center cursor-pointer bg-primary text-white round `}
          >
            구매하기
          </button>
        </div>
      </div>
    </>
  );
}
