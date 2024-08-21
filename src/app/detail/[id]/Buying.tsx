import PortOne from "@portone/browser-sdk/v2";
import { ProductDetail } from "./page";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
const STORE_ID = process.env.NEXT_PUBLIC_TOSS_CLIENT_STORE_ID ?? "";
const CHANNEL_KEY = process.env.NEXT_PUBLIC_TOSS_CHANNEL_KEY;
const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;

async function handlePayment(data: ProductDetail) {
  const response = await PortOne.requestPayment({
    storeId: STORE_ID,
    paymentId: `payment-${crypto.randomUUID()}`,
    orderName: data.name,
    totalAmount: 10,
    currency: "CURRENCY_KRW",
    channelKey: CHANNEL_KEY,
    payMethod: "CARD",
    redirectUrl: `${API_SERVER}/pay`,
  })
    .then((response) => {
      console.log(response);
      if (response?.transactionType === "PAYMENT") {
        alert("결제 성공!");
      } else {
        alert("결제 실패: " + response?.message);
      }
    })
    .catch((error) => {
      alert("결제 중 오류가 발생했습니다: " + error.message);
    });

  // const notified = await fetch(`${API_SERVER}/orders`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${accessToken}`,
  //     "client-id": `${CLIENT_ID}`,
  //   },
  //   // paymentId와 주문 정보를 서버에 전달합니다
  //   body: JSON.stringify({
  //     user_id: 4,
  //     products: [
  //       {
  //         _id: 2,
  //         name: "면천두견주",
  //         image: {
  //           path: `/files/06-PickYourPotion/meoncheondugeonju.jpeg`,
  //           name: "meoncheondugeonju.jpeg",
  //           originalname: "meoncheondugeonju.jpeg",
  //         },
  //         quantity: 1,
  //         price: 50000,
  //         extra: {
  //           brewery: "면천두견주보존회",
  //         },
  //       },
  //     ],
  //   }),
  // });
}

export default function Buying({ data }: { data: ProductDetail }) {
  const session = useSession();
  console.log(session);
  const router = useRouter();

  const sessionCheckEvent = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (session) {
      router.push("/pay");
    } else {
      e.preventDefault();
      alert("구매를 하려면 로그인해야 합니다.");
      router.push("/login");
    }
  };
  return (
    <button
      className={`contentMedium w-[244px] h-[62px] flex items-center justify-center cursor-pointer bg-primary text-white round`}
      onClick={sessionCheckEvent}
    >
      구매하기
    </button>
  );
}
