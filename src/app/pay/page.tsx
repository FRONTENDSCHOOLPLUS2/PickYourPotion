"use client";

import PortOne from "@portone/browser-sdk/v2";
import Address from "./Address";
import { useEffect, useState } from "react";
import { useProductStore } from "@/zustand/Store";
import { useSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";

import { errorToast } from "@/toast/errorToast";
import Button from "@/components/Button";
import CartCard from "@/components/CartCard";
import ProgressBar from "./ProgressBar";
import PaymentCompleted from "./complete/page";
import { infoToast } from "@/toast/infoToast";

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
      errorToast(error.message);
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

  let shippingFees = 0;

  if (price * quantity < 30000) {
    shippingFees = 3000;
  }

  return (
    <div className="h-screen">
      <ProgressBar currentPage={currentPage} />
      {currentPage === 0 ? (
        <main className="text-black">
          <h2 className="contentMedium mt-10">개인 정보</h2>
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
          <div className="flex flex-col gap-[10px] mt-10">
            <h2 className="contentMedium">담은 술</h2>
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
          <h2 className="contentMedium mt-5">결제 정보</h2>
          <div className="flex flex-col gap-3 mt-5">
            <div className="flex justify-between content">
              <p className="text-darkGray">상품금액</p>
              <p>{(price * quantity).toLocaleString()}원</p>
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
              <p className="text-primary">{(price * quantity + shippingFees).toLocaleString()}원</p>
            </div>
          </div>
          {addressFilled ? (
            <Button onClick={handlePayment} className={`w-full py-5 mt-12 mb-9 contentMedium`}>
              {`${(price * quantity + shippingFees).toLocaleString()}원 결제`}
            </Button>
          ) : (
            <Button
              onClick={() => infoToast("주소를 입력해 주세요.")}
              className={`w-full py-5 mt-12 mb-9 contentMedium cursor-not-allowed`}
              color="disabled"
            >
              {`${(price * quantity + shippingFees).toLocaleString()}원 결제`}
            </Button>
          )}
        </main>
      ) : (
        <PaymentCompleted />
      )}
      <ToastContainer position="top-center" limit={1} autoClose={3000} closeButton={false} />
    </div>
  );
}
