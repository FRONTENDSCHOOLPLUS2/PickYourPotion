"use client";

import PortOne from "@portone/browser-sdk/v2";
import Address from "./Address";
import { useEffect, useState } from "react";
import { useProductStore } from "@/zustand/Store";
import { useSession } from "next-auth/react";

import Button from "@/components/Button";
import CartCard from "@/components/CartCard";
import ProgressBar from "./ProgressBar";
import PaymentCompleted from "./complete/page";

const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;
const DOMAIN = process.env.NEXT_PUBLIC_API_NEXT_SERVER;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
const STORE_ID = process.env.NEXT_PUBLIC_TOSS_CLIENT_STORE_ID ?? "";
const CHANNEL_KEY = process.env.NEXT_PUBLIC_TOSS_CHANNEL_KEY;

export default function PayPage() {
  const { data: session } = useSession();
  const token = session?.accessToken;

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [addressFilled, setAddressFilled] = useState<boolean>(false); // 주소 입력 상태 관리
  const [isMounted, setIsMounted] = useState<boolean>(false); // 컴포넌트가 마운트되었는지 확인

  const { _id, name, brewery, alcohol, price, quantity, setQuantity, image } = useProductStore(
    (state) => ({
      _id: state._id,
      name: state.name,
      brewery: state.brewery,
      alcohol: state.alcohol,
      price: state.price,
      quantity: state.quantity,
      setQuantity: state.setQuantity,
      image: state.image,
    }),
  );

  const data = { _id, name, price, quantity, brewery };

  // const totalAmount = price * (quantity ?? 1);
  // const formattedAmount = new Intl.NumberFormat("ko-KR").format(totalAmount);

  useEffect(() => {
    setIsMounted(true); // 컴포넌트가 마운트된 후에만 렌더링
  }, []);

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
          products: [
            {
              _id: data._id,
              quantity: data.quantity,
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error("주문 정보 전송에 실패했습니다.");
      }
    } catch (error: any) {
      console.error("오류 발생:", error.message);
    }
  };

  const handlePayment = async () => {
    const totalAmount = data.price * (data.quantity ?? 1);

    try {
      const response = await PortOne.requestPayment({
        storeId: STORE_ID,
        paymentId: `payment-${crypto.randomUUID()}`,
        orderName: data.name,
        totalAmount: totalAmount,
        currency: "CURRENCY_KRW",
        channelKey: CHANNEL_KEY,
        payMethod: "CARD",
        redirectUrl: `${DOMAIN}/pay/payments?productId=${data._id}&quantity=${data.quantity}`,
      });

      if (response?.code === "FAILURE_TYPE_PG") {
        alert("결제 실패: " + response?.message);
      } else {
        // 결제 성공 시 주문 정보 서버로 전송 후 페이지 전환
        if (token) {
          await fetchOrder();
          setCurrentPage(1);
        } else {
          console.error("토큰이 없습니다.");
        }
      }
    } catch (error: any) {
      alert("결제 중 오류가 발생했습니다: " + error.message);
    }
  };

  if (!isMounted) {
    return null; // 클라이언트에서 마운트되기 전에는 아무것도 렌더링하지 않음
  }

  return (
    <div className="h-screen">
      <ProgressBar currentPage={currentPage} />
      {currentPage === 0 ? (
        <main>
          <div className="text-black mt-9">
            <p className="text-center subTitleMedium mb-14">개인정보</p>
            <div className="flex justify-between py-2">
              <span className="contentMedium">이름</span>
              <span>{session?.user?.name}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="contentMedium">전화번호</span>
              <span>+82 10 1234 5678</span>
            </div>
            <Address setAddressFilled={setAddressFilled} />
          </div>
          <div className="flex flex-col gap-[10px] mt-6">
            <p className="contentMedium mb-3">담은 술</p>
            <CartCard
              name={name}
              brewery={brewery}
              price={price}
              alcohol={alcohol}
              quantity={quantity}
              image={image}
              setQuantity={setQuantity}
            />
          </div>
          <div className="mt-10 subTitleMedium">
            <p className="text-center">결제 금액</p>
            <p className="mt-3 text-center titleMedium text-primary">
              {(price * quantity).toLocaleString()}원
            </p>
          </div>
          {addressFilled ? (
            <Button onClick={handlePayment} className={`w-full py-5 mt-12 mb-9 contentMedium`}>
              {"결제"}
            </Button>
          ) : (
            <Button
              onClick={() => {
                alert("주소를 입력해주세요.");
              }}
              className={`w-full py-5 mt-12 mb-9 contentMedium cursor-not-allowed`}
              color="disabled"
            >
              {"결제"}
            </Button>
          )}
        </main>
      ) : (
        <PaymentCompleted />
      )}
    </div>
  );
}
