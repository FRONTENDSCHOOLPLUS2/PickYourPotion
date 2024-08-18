import PortOne from "@portone/browser-sdk/v2";
import React from "react";
import { ProductDetail } from "./page";

function handlePayment(data: ProductDetail) {
  const STORE_ID = process.env.NEXT_PUBLIC_TOSS_CLIENT_STORE_ID ?? "";
  const CHANNEL_KEY = process.env.NEXT_PUBLIC_TOSS_CHANNEL_KEY;
  const response = PortOne.requestPayment({
    storeId: STORE_ID,
    paymentId: "testlzza7wm0",
    orderName: data.name,
    totalAmount: 1000,
    currency: "CURRENCY_KRW",
    channelKey: CHANNEL_KEY,
    payMethod: "CARD",
    card: {},
  });
}
export default function Buying({ data }: { data: ProductDetail }) {
  return (
    <button
      className={`contentMedium w-[244px] h-[62px] flex items-center justify-center cursor-pointer bg-primary text-white round`}
      onClick={() => handlePayment(data)}
    >
      구매하기
    </button>
  );
}
