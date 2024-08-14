import { PortOne } from "@team-mintc/portone-v2";
import React from "react";

export default function Buying() {
  const storeId = process.env.TOSS_CLIENT_STORE_ID ?? "defaultStoreId";

  const handlePayment = () => {
    PortOne.requestPayment({
      storeId,
      isTestChannel: true,
      redirectUrl: "http://192.168.50.27:3000/payment/redirect",
      orderName: "소주",
      totalAmount: 100,
      pgProvider: "PG_PROVIDER_TOSSPAYMENTS",
      payMethod: "CARD",
      paymentId: "1",
      taxFreeAmount: 0,
      customer: {
        customerId: "조지주seller",
        fullName: "박재웅",
        phoneNumber: "1670-5176",
        email: "test@portone.io",
        zipcode: "04783",
      },
      windowType: {
        pc: "IFRAME",
        mobile: "REDIRECTION",
      },
      noticeUrls: ["http://192.168.50.27:3000/api/payment/hook"],
      confirmUrl: "http://192.168.50.27:3000/payment/confirm",
      appScheme: "portone://",
      isCulturalExpense: false,
      currency: "CURRENCY_KRW",
      locale: "KO_KR",
    });
  };

  return (
    <button
      className={`contentMedium w-[244px] h-[62px] flex items-center justify-center cursor-pointer bg-primary text-white round`}
      onClick={handlePayment}
    >
      구매하기
    </button>
  );
}
