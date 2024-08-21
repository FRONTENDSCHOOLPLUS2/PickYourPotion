"use client";
import Input from "@/components/Input";

import { useState } from "react";
import OrderedCard from "./OrderedCard";
import Button from "@/components/Button";
import Link from "next/link";
import { ProductDetail } from "../detail/[id]/page";
import PortOne from "@portone/browser-sdk/v2";
import Address from "./Address";

// const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;
// const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
// const STORE_ID = process.env.NEXT_PUBLIC_TOSS_CLIENT_STORE_ID ?? "";
// const CHANNEL_KEY = process.env.NEXT_PUBLIC_TOSS_CHANNEL_KEY;
// const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;

// async function handlePayment(data: ProductDetail) {
//   const response = await PortOne.requestPayment({
//     storeId: STORE_ID,
//     paymentId: `payment-${crypto.randomUUID()}`,
//     orderName: data.name,
//     totalAmount: 10,
//     currency: "CURRENCY_KRW",
//     channelKey: CHANNEL_KEY,
//     payMethod: "CARD",
//     redirectUrl: `${API_SERVER}/pay`,
//   })
//     .then((response) => {
//       console.log(response);
//       if (response?.transactionType === "PAYMENT") {
//         alert("결제 성공!");
//       } else {
//         alert("결제 실패: " + response?.message);
//       }
//     })
//     .catch((error) => {
//       alert("결제 중 오류가 발생했습니다: " + error.message);
//     });
// }

export default function PayPage() {
  const [currentPage, setCurrentPage] = useState<number>(0); // 결제 진행 상태 관리

  const handleNextClick = () => {
    setCurrentPage((page) => page + 1);
  };

  return (
    <div>
      <div
        className={`fixed top-14 h-[6px] bg-primary transition-width duration-700 ease-in-out`}
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
            <Address />
          </div>
          <div className="flex flex-col gap-[10px] mt-6">
            <p className="contentMedium mb-3">주문한 술</p>
            <OrderedCard />
            <OrderedCard />
            <OrderedCard />
          </div>
          <div className="mt-10 subTitleMedium">
            <p className="text-center">결제 금액</p>
            <p className="mt-3 text-center titleMedium text-primary">388,000원</p>
          </div>
          <Button onClick={() => {}} className="w-full py-5 mt-12 mb-9 contentMedium">
            {"결제"}
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
    </div>
  );
}
