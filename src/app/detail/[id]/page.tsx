"use client";
import Image from "next/image";
import Link from "next/link";
import dummyImage from "../../../../public/community-dummy.png";
import detailDummy from "../../../../public/detail_dummy.png";
import smallDummyImage from "../../../../public/community-dummy-small.png";
import iconLike from "../../../../public/images/icons/icon-like.svg";

import { useState } from "react";
export default function page() {
  const [showDetail, setShowDetail] = useState(true);
  const [like, setLike] = useState(false);

  const handleToggle = () => {
    setShowDetail(!showDetail);
  };
  const handlLike = () => {
    setShowDetail(!showDetail);
  };
  //   if(showDetail === true){

  //   }
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
            <p className="description text-ellipsis w-[33px] h-[28px]">증류식 소주</p>
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
        <div className="my-5">
          <Image src={detailDummy} width={428} height={450} alt="막걸리 이미지" />
        </div>
        <div>
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
        <div className="pt-5 pb-5 border-y-[0.5px] border-gray">
          <form>
            <input />
            <button type="submit">전송</button>
          </form>
          <div className="flex flex-row justify-between ">
            <p className="subTitleMedium">혈중 알콜농도 면허 취소</p>
            <button>
              <Image src={iconLike} width={25} height={22} alt="찜하기" />
            </button>
          </div>
          <div className="flex flex-row">
            <p className="description text-darkGray">@alcholfreeindechihae</p>
            <p className="description text-darkGray">2020년 10월 21일</p>
          </div>
          <p className="leading-5 description text-darkGray">
            어제 이 술마시고 오늘 저녁에 운전하다가 면허 취소 당했어요... 하지만 정말 맛은 좋고 끝에
            달달한 맛이 너무 달콤 합니다. 다들 이거 마시고 행복한 연애 하세요 ㅎㅎ 맛꿀마
          </p>
          <Image src={dummyImage} width={348} height={228} alt="막걸리 이미지" />
        </div>
      </div>
    </div>
  );
}
