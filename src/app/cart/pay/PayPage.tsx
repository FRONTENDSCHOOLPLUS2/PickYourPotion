"use client";

import PortOne from "@portone/browser-sdk/v2";
import Address from "./Address";
import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { errorToast } from "@/toast/errorToast";
import Button from "@/components/Button";
import ProgressBar from "./ProgressBar";
import PaymentCompleted from "./complete/page";
import { InfoToast } from "@/toast/InfoToast";
import OrderCard from "./OrderCard";
import { CartPageProps } from "../CartPage";

const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;
const DOMAIN = process.env.NEXT_PUBLIC_API_NEXT_SERVER;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
const STORE_ID = process.env.NEXT_PUBLIC_TOSS_CLIENT_STORE_ID ?? "";
const CHANNEL_KEY = process.env.NEXT_PUBLIC_TOSS_CHANNEL_KEY;

export default function PayPage({ item, token }: CartPageProps) {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [addressFilled, setAddressFilled] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [shippingFees, setShippingFees] = useState<number>(0);
  const [updatedCartData, setUpdatedCartData] = useState(item);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const { data: session } = useSession();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const newTotalPrice = updatedCartData.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );
    setTotalPrice(newTotalPrice);

    if (newTotalPrice < 30000) {
      setShippingFees(3000);
    } else {
      setShippingFees(0);
    }
  }, [updatedCartData]);

  const fetchOrder = async () => {
    try {
      const response = await fetch(`${API_SERVER}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "client-id": `${CLIENT_ID}`,
        },
        body: JSON.stringify({
          products: updatedCartData.map((v) => ({
            _id: v.product._id,
            quantity: v.quantity,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("주문 정보 전송에 실패했습니다.");
      }
    } catch (error: any) {
      errorToast(error.message);
    }
  };
  async function fetchCleanUpCart() {
    try {
      const response = await fetch(`${API_SERVER}/carts/cleanup`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "client-id": `${CLIENT_ID}`,
        },
      });

      if (!response.ok) {
        throw new Error("장바구니 비우기를 실패하였습니다.");
      }
    } catch (error: any) {
      console.error("오류 발생:", error.message);
    }
  }
  const handlePayment = async () => {
    try {
      const response = await PortOne.requestPayment({
        storeId: STORE_ID,
        paymentId: `payment-${crypto.randomUUID()}`,
        orderName: "장바구니 구매",
        totalAmount: totalPrice + shippingFees,
        currency: "CURRENCY_KRW",
        channelKey: CHANNEL_KEY,
        payMethod: "CARD",
        redirectUrl: `${DOMAIN}/cart/pay/payments?productId=${updatedCartData.map((item) => item.product._id).join("&productId=")}&quantity=${updatedCartData.map((item) => item.quantity).join("&quantity=")}`,
      });

      if (response?.code === "FAILURE_TYPE_PG") {
        errorToast("결제 실패: " + response?.message);
      } else {
        if (token) {
          await fetchOrder();
          await fetchCleanUpCart();
          setCurrentPage(1);
        } else {
          console.error("토큰이 없습니다.");
        }
      }
    } catch (error: any) {
      errorToast("결제 중 오류가 발생했습니다.");
    }
  };

  const handleQuantityChange = useCallback(
    (productId: number, newQuantity: number) => {
      setUpdatedCartData((prevCartData) =>
        prevCartData.map((item) =>
          item._id === productId ? { ...item, quantity: newQuantity } : item,
        ),
      );
    },
    [updatedCartData],
  );

  if (!isMounted) {
    return null;
  }

  return (
    <div className="h-screen">
      <ProgressBar currentPage={currentPage} />
      {currentPage === 0 ? (
        <main className="text-black">
          <h2 className="mt-10 contentMedium">개인 정보</h2>
          <div className="flex flex-col gap-3 mt-5">
            <div className="flex justify-between content">
              <p className="text-darkGray">이름</p>
              <p>{session?.user?.name}</p>
            </div>
            <div className="flex justify-between content">
              <p className="text-darkGray">전화번호</p>
              <p>+82 10 1234 5678</p>
            </div>
            <div className="mt-10">
              <Address setAddressFilled={setAddressFilled} />
            </div>
          </div>
          <div className="flex flex-col gap-5 mt-10">
            <h2 className="contentMedium">담은 술</h2>
            {updatedCartData.map((v) => (
              <OrderCard
                key={v._id}
                name={v.product.name}
                brewery={v.product.extra.brewery}
                price={v.product.price}
                alcohol={v.product.extra.taste.alcohol}
                quantity={v.quantity}
                image={v.product.image.path}
                setQuantity={(quantity) => handleQuantityChange(v._id, quantity)}
              />
            ))}
          </div>
          <h2 className="mt-5 contentMedium">결제 정보</h2>
          <div className="flex flex-col gap-3 mt-5">
            <div className="flex justify-between content">
              <p className="text-darkGray">상품금액</p>
              <p>{totalPrice.toLocaleString()}원</p>
            </div>
            <div className="flex justify-between content">
              <p className="text-darkGray">배송비</p>
              <p>{shippingFees.toLocaleString()}원</p>
            </div>
            <div className="flex justify-between content">
              <p className="text-darkGray">결제방법</p>
              <p>토스페이</p>
            </div>
            <div className="flex justify-between content">
              <p className="text-darkGray">결제금액</p>
              <p className="text-primary">{(totalPrice + shippingFees).toLocaleString()}원</p>
            </div>
          </div>
          {addressFilled ? (
            <Button onClick={handlePayment} className={`w-full py-5 mt-12 mb-9 contentMedium`}>
              {`${(totalPrice + shippingFees).toLocaleString()}원 결제`}
            </Button>
          ) : (
            <Button
              onClick={() => InfoToast("주소를 입력해 주세요.")}
              className={`w-full py-5 mt-12 mb-9 contentMedium cursor-not-allowed`}
              color="disabled"
            >
              {`${(totalPrice + shippingFees).toLocaleString()}원 결제`}
            </Button>
          )}
        </main>
      ) : (
        <PaymentCompleted />
      )}
    </div>
  );
}
