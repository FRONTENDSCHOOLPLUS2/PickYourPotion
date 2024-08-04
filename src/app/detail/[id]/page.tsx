"use client";
import Image from "next/image";
import Link from "next/link";
import dummyImage from "../../../../public/community-dummy.png";
import detailDummy from "../../../../public/detail_dummy.png";
import smallDummyImage from "../../../../public/community-dummy-small.png";
import iconLike from "../../../../public/images/icons/icon-like.svg";

import { useState } from "react";
import Detail from "./detail";
import Reply from "./reply";
export default function page() {
  const [showDetail, setShowDetail] = useState(true);

  const handleToggle = () => {
    setShowDetail(!showDetail);
  };
  const handlLike = () => {
    setShowDetail(!showDetail);
  };
  let content;
  if (showDetail) {
    content = <Detail />;
  } else {
    content = <Reply />;
  }
  return (
    <div className="flex flex-col ">
      <div className="justify-center max-w-3xl">
        <Image src={dummyImage} width={428} height={450} alt="막걸리 이미지" />
      </div>
      <div className="relative px-10 py-8 mt-[-30px]  max-w-[428px] bg-white topRound topShadow">
        <h1 className="title">복순도가 소주</h1>
        <p className="content text-darkGray text-ellipsis mt-2.5">
          Lorem Ipsum is simply dummy text of the printing and
        </p>
        <p className="content text-darkGray text-ellipsis mt-2.5">양조장 이름</p>
        <div className="flex flex-row mt-3">
          <div className="w-[82px] h-[64px] flex flex-col items-center justify-center bg-ivory mr-4 round ">
            <span className="text-black contentMedium">주종</span>
            <p className="description text-center">
              증류식 <br />
            </p>
            <p className="description m-auto">소주</p>
          </div>
          <div className="w-[82px] h-[64px] flex flex-col items-center justify-center bg-ivory mr-4 round ">
            <span className="text-black contentMedium">도수</span>
            <p className="description">10도</p>
          </div>
          <div className="w-[82px] h-[64px] flex flex-col items-center justify-center bg-ivory mr-4 round ">
            <span className="text-black contentMedium">용량</span>
            <p className="description">1L</p>
          </div>
          <div className="w-[82px] h-[64px] flex flex-col items-center justify-center bg-ivory mr-4 round ">
            <span className="text-black contentMedium">소비기한</span>
            <p className="description">무제한</p>
          </div>
        </div>
        <div className="flex flex-row mt-5 border-2 round border-whiteGray bg-whiteGray ">
          <button
            className={`contentMedium w-[186px] h-[52px] flex items-center justify-center cursor-pointer transition-colors round ${
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
        <div className="fixed bottom-0 flex flex-row gap-3 py-6 mt-5 mb-5 bg-white left-6 round">
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
    </div>
  );
}
