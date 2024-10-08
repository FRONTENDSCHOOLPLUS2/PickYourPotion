"use client";

import PortOne from "@portone/browser-sdk/v2";
import Address from "./Address";
import { useEffect, useState } from "react";
import { useProductStore } from "@/zustand/Store";
import { useSession } from "next-auth/react";

import { errorToast } from "@/toast/errorToast";
import Button from "@/components/Button";
import ProgressBar from "./ProgressBar";
import PaymentCompleted from "./complete/page";
import { InfoToast } from "@/toast/InfoToast";
import OrderCard from "./OrderCard";
import { useRouter } from "next/navigation";

const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;
const DOMAIN = process.env.NEXT_PUBLIC_API_NEXT_SERVER;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
const STORE_ID = process.env.NEXT_PUBLIC_TOSS_CLIENT_STORE_ID ?? "";
const CHANNEL_KEY = process.env.NEXT_PUBLIC_TOSS_CHANNEL_KEY;

export default function PayPage() {
  const { data: session } = useSession();
  const token = session?.accessToken;
  const router = useRouter();
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

  const [totalPrice, setTotalPrice] = useState<number>(price * quantity);
  const [shippingFees, setShippingFees] = useState<number>(0);

  const data = { _id, name, price, quantity, brewery };

  useEffect(() => {
    setIsMounted(true); // 컴포넌트가 마운트된 후에만 렌더링
  }, []);

  useEffect(() => {
    // 수량 변경 시 총 상품 금액과 배송비를 재계산
    const newTotalPrice = price * quantity;
    setTotalPrice(newTotalPrice);

    if (newTotalPrice < 30000) {
      setShippingFees(3000);
    } else {
      setShippingFees(0);
    }
  }, [price, quantity]); // price 또는 quantity가 변경될 때마다 계산

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
      errorToast(error.message);
    }
  };

  const handlePayment = async () => {
    try {
      const response = await PortOne.requestPayment({
        storeId: STORE_ID,
        paymentId: `payment-${crypto.randomUUID()}`,
        orderName: data.name,
        totalAmount: totalPrice + shippingFees,
        currency: "CURRENCY_KRW",
        channelKey: CHANNEL_KEY,
        payMethod: "CARD",
        redirectUrl: `${DOMAIN}/pay/payments?productId=${data._id}&quantity=${data.quantity}`,
      });

      if (response?.code === "FAILURE_TYPE_PG") {
        errorToast("결제 실패: " + response?.message);
      } else {
        // 결제 성공 시 주문 정보 서버로 전송 후 페이지 전환
        if (token) {
          await fetchOrder();
          router.push("/pay/complete");
        } else {
          console.error("토큰이 없습니다.");
        }
      }
    } catch (error: any) {
      errorToast("결제 중 오류가 발생했습니다.");
    }
  };

  if (!isMounted) {
    return null; // 클라이언트에서 마운트되기 전에는 아무것도 렌더링하지 않음
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
            <OrderCard
              name={name}
              brewery={brewery}
              price={price}
              alcohol={alcohol}
              quantity={quantity}
              image={image}
              setQuantity={setQuantity}
            />
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
