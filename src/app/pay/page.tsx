"use client";
import Input from "@/components/Input";

import { useState } from "react";
import OrderedCard from "./OrderedCard";
import Button from "@/components/Button";
import Link from "next/link";

export default function PayPage() {
  const buttonLabels = [
    "간편결제",
    "현대카드",
    "네이버페이",
    "카카오페이",
    "페이코",
    "SSG페이",
    "무통장입금",
    "휴대폰결제",
  ];
  const [selected, setSelected] = useState<number>(0); // 초기상태는 0번 인덱스 버튼이 선택
  const [currentPage, setCurrentPage] = useState<number>(0); // 결제 진행 상태 관리

  const handleButtonClick = (index: number) => {
    setSelected(index);
  };

  const handleNextClick = () => {
    setCurrentPage((page) => page + 1);
  };

  return (
    <>
      <div
        className={`sticky top-0 left-0 h-[6px] bg-primary transition-width duration-700 ease-in-out`}
        style={{ width: currentPage === 1 ? "100%" : "50%" }}
      ></div>
      {currentPage === 0 ? (
        <main>
          <div className="text-black mt-9">
            <p className="text-center subTitleMedium mb-14">개인정보</p>
            <div className="flex justify-between py-2">
              <span className="contentMedium">이름</span>
              <span>박재웅</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="contentMedium">전화번호</span>
              <span>+82 10 1234 5678</span>
            </div>
            <div className="py-2">
              <span className="contentMedium">주소(필수)</span>
              <div className="flex justify-between mt-2">
                <div className="flex-grow">
                  <Input
                    placeholder="에) 광희동 2가 256"
                    type="text"
                    id="address"
                    name="address"
                    className="w-full max-w-sm md:max-w-md"
                    a11yHidden="a11y-hidden"
                  />
                  <div className="py-1 "></div>
                  <Input
                    placeholder="상세주소"
                    type="text"
                    id="detailed-address"
                    name="detailed-address"
                    className="w-full max-w-sm md:max-w-md"
                    a11yHidden="a11y-hidden"
                  />
                </div>
                <button className="w-20 h-12 ml-4 text-white rounded-lg bg-primary">검색</button>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <p className="contentMedium">주문한 술</p>
            <OrderedCard />
          </div>
          <div className="mt-10 subTitleMedium">
            <p className="text-center">결제 금액</p>
            <p className="mt-3 text-center titleMedium text-primary">388,000원</p>
          </div>
          <div className="mt-10 text-center subTitleMedium">
            <p>결제 방법</p>
            <div className="grid grid-cols-2 gap-2 px-1 mt-3 justify-items-center auto-cols-auto">
              {buttonLabels.map((item, index) => (
                <Button
                  key={index}
                  color={index === selected ? "fill" : "disabled"}
                  onClick={() => handleButtonClick(index)}
                  className="w-full py-4 content"
                >
                  {item}
                </Button>
              ))}
            </div>
          </div>
          <Button onClick={() => handleNextClick()} className="w-full py-5 mt-12 mb-9">
            {"다음"}
          </Button>
        </main>
      ) : (
        <main className="flex flex-col justify-between h-screen text-center text-black contentMedium">
          <div className="mt-20">
            <p>박재웅님,</p>
            <p className="text-primary">술상이 준비되었습니다!</p>
            <p className="">빠른 시일 내에 배송해드릴게요!!</p>
          </div>
          <Link href={"/"}>
            <Button className="w-full py-5 mb-12 contentMedium">{"확인"}</Button>
          </Link>
        </main>
      )}
    </>
  );
}
