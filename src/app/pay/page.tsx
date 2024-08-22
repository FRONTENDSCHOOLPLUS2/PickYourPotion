// "use client";

// import { useState } from "react";
// import OrderedCard from "./OrderedCard";
// import Button from "@/components/Button";
// import Link from "next/link";
// import PortOne from "@portone/browser-sdk/v2";
// import Address from "./Address";
// import { useProductStore } from "@/zustand/Store";
// import { useSession } from "next-auth/react";

// const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;
// const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
// const STORE_ID = process.env.NEXT_PUBLIC_TOSS_CLIENT_STORE_ID ?? "";
// const CHANNEL_KEY = process.env.NEXT_PUBLIC_TOSS_CHANNEL_KEY;

// interface Data {
//   _id: number;
//   name: string;
//   brewery: string;
//   price: number;
//   quantity: number;
// }

// async function handlePayment(data: Data, token: string | undefined, fetchOrder: () => void) {
//   const totalAmount = data.price * (data.quantity ?? 1);

//   try {
//     const response = await PortOne.requestPayment({
//       storeId: STORE_ID,
//       paymentId: `payment-${crypto.randomUUID()}`,
//       orderName: data.name,
//       totalAmount: totalAmount,
//       currency: "CURRENCY_KRW",
//       channelKey: CHANNEL_KEY,
//       payMethod: "CARD",
//       redirectUrl: `${API_SERVER}/pay`,
//     });

//     if (response?.code === "FAILURE_TYPE_PG") {
//       alert("결제 실패: " + response?.message);
//     } else {
//       // alert("결제 성공!");
//       if (token) {
//         await fetchOrder(); // 주문 정보를 서버에 전달
//         setCurrentPage(1)
//       } else {
//         console.error("토큰이 없습니다.");
//       }
//     }
//   } catch (error: any) {
//     alert("결제 중 오류가 발생했습니다: " + error.message);
//   }
// }

// export default function PayPage() {
//   const { data: session } = useSession();
//   const token = session?.accessToken;

//   console.log(session);

//   console.log(token);
//   const { _id, name, brewery, price, quantity } = useProductStore((state) => ({
//     _id: state._id,
//     name: state.name,
//     brewery: state.brewery,
//     price: state.price,
//     quantity: state.quantity,
//   }));
//   const data = { _id, name, price, quantity, brewery };

//   const [currentPage, setCurrentPage] = useState<number>(0);

//   const totalAmount = price * (quantity ?? 1);
//   const formattedAmount = new Intl.NumberFormat("ko-KR").format(totalAmount);

//   const fetchOrder = async () => {
//     try {
//       const response = await fetch(`${API_SERVER}/orders`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//           "client-id": `${CLIENT_ID}`,
//         },
//         body: JSON.stringify({
//           user_id: session?.user?.id,
//           products: [
//             {
//               _id: data._id,
//               name: data.name,
//               image: {
//                 path: `/files/06-PickYourPotion/meoncheondugeonju.jpeg`,
//                 name: "meoncheondugeonju.jpeg",
//                 originalname: "meoncheondugeonju.jpeg",
//               },
//               quantity: data.quantity,
//               price: data.price,
//               extra: {
//                 brewery: data.brewery,
//               },
//             },
//           ],
//         }),
//       });

//       if (response.ok) {
//         alert("주문 성공");
//       } else {
//         throw new Error("주문 정보 전송에 실패했습니다.");
//       }
//     } catch (error: any) {
//       console.error("오류 발생:", error.message);
//     }
//   };

//   return (
//     <div>
//       <div
//         className={`fixed top-14 h-[6px] bg-primary transition-width duration-700 ease-in-out`}
//         style={{ width: currentPage === 1 ? "100%" : "50%" }}
//       ></div>
//       <main>
//         <div className="text-black mt-9">
//           <p className="text-center subTitleMedium mb-14">개인정보</p>
//           <div className="flex justify-between py-2">
//             <span className="contentMedium">이름</span>
//             <span>{session?.user?.name}</span>
//           </div>
//           <div className="flex justify-between py-2">
//             <span className="contentMedium">전화번호</span>
//             <span>+82 10 1234 5678</span>
//           </div>
//           <Address />
//         </div>
//         <div className="flex flex-col gap-[10px] mt-6">
//           <p className="contentMedium mb-3">주문한 술</p>
//           <OrderedCard />
//         </div>
//         <div className="mt-10 subTitleMedium">
//           <p className="text-center">결제 금액</p>
//           <p className="mt-3 text-center titleMedium text-primary">{formattedAmount}원</p>
//         </div>
//         <Button
//           onClick={() => {
//             handlePayment(data, token, fetchOrder);
//             // 홈 화면으로 이동
//           }}
//           className="w-full py-5 mt-12 mb-9 contentMedium"
//         >
//           {"결제"}
//         </Button>
//       </main>
//       {/* {currentPage === 0 ? (
//         <main>
//           <div className="text-black mt-9">
//             <p className="text-center subTitleMedium mb-14">개인정보</p>
//             <div className="flex justify-between py-2">
//               <span className="contentMedium">이름</span>
//               <span>{session?.user?.name}</span>
//             </div>
//             <div className="flex justify-between py-2">
//               <span className="contentMedium">전화번호</span>
//               <span>+82 10 1234 5678</span>
//             </div>
//             <Address />
//           </div>
//           <div className="flex flex-col gap-[10px] mt-6">
//             <p className="contentMedium mb-3">주문한 술</p>
//             <OrderedCard />
//           </div>
//           <div className="mt-10 subTitleMedium">
//             <p className="text-center">결제 금액</p>
//             <p className="mt-3 text-center titleMedium text-primary">{formattedAmount}원</p>
//           </div>
//           <Button
//             onClick={() => {
//               handlePayment(data, token, fetchOrder);
//               // 홈 화면으로 이동
//             }}
//             className="w-full py-5 mt-12 mb-9 contentMedium"
//           >
//             {"결제"}
//           </Button>
//         </main>
//       ) : (
//         <main className="flex flex-col justify-between h-screen text-center text-black contentMedium">
//           <div className="mt-20">
//             <p>{session?.user?.name}님,</p>
//             <p className="text-primary">술상이 준비되었습니다!</p>
//             <p className="">빠른 시일 내에 배송해드릴게요!!</p>
//           </div>
//           <Link href={"/"}>
//             <Button className="w-full py-5 mb-12 contentMedium">{"확인"}</Button>
//           </Link>
//         </main>
//       )} */}
//     </div>
//   );
// }

// //   const response = await PortOne.requestPayment({
// //     storeId: STORE_ID,
// //     paymentId: `payment-${crypto.randomUUID()}`,
// //     orderName: data.name,
// //     totalAmount: totalAmount,
// //     currency: "CURRENCY_KRW",
// //     channelKey: CHANNEL_KEY,
// //     payMethod: "CARD",
// //     redirectUrl: `${API_SERVER}/pay`,
// //   })
// //     .then((response) => {
// //       console.log(response);
// //       if (response?.code === "FAILURE_TYPE_PG") {
// //         alert("결제 실패: " + response?.message);
// //       } else {
// //         alert("결제 성공!");
// //         fetchOrder();
// //       }
// //     })
// //     .catch((error) => {
// //       alert("결제 중 오류가 발생했습니다: " + error.message);
// //     });
// // }

// // export default function PayPage() {
// //   const { data: session } = useSession();
// //   const token = session?.accessToken;
// //   const { _id, name, price, quantity, brewery } = useProductStore((state) => ({
// //     _id: state._id,
// //     name: state.name,
// //     price: state.price,
// //     quantity: state.quantity,
// //     brewery: state.brewery,
// //   }));

// //   const data = { _id, name, price, quantity, brewery };

// //   // 가격을 한국 원화 형식으로 포맷팅
// //   const totalAmount = price * (quantity ?? 1);
// //   const formattedAmount = new Intl.NumberFormat("ko-KR").format(totalAmount);

// //   const [currentPage, setCurrentPage] = useState<number>(0); // 결제 진행 상태 관리

// //   const fetchOrder = async () => {
// //     const response = await fetch(`${API_SERVER}/orders`, {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/json",
// //         Authorization: `Bearer ${token}`,
// //         "client-id": `${CLIENT_ID}`,
// //       },
// //       // paymentId와 주문 정보를 서버에 전달합니다
// //       body: JSON.stringify({
// //         user_id: session?.user?.id,
// //         products: [
// //           {
// //             _id: data._id,
// //             name: data.name,
// //             image: {
// //               path: `/files/06-PickYourPotion/meoncheondugeonju.jpeg`,
// //               name: "meoncheondugeonju.jpeg",
// //               originalname: "meoncheondugeonju.jpeg",
// //             },
// //             quantity: data.quantity,
// //             price: data.price,
// //             extra: {
// //               brewery: data.brewery,
// //             },
// //           },
// //         ],
// //       }),
// //     });
// //   };

// //   const handleNextClick = () => {
// //     setCurrentPage((page) => page + 1);
// //   };

// //   return (
// //     <div>
// //       <div
// //         className={`fixed top-14 h-[6px] bg-primary transition-width duration-700 ease-in-out`}
// //         style={{ width: currentPage === 1 ? "100%" : "50%" }}
// //       ></div>
// //       {currentPage === 0 ? (
// //         <main>
// //           <div className="text-black mt-9">
// //             <p className="text-center subTitleMedium mb-14">개인정보</p>
// //             <div className="flex justify-between py-2">
// //               <span className="contentMedium">이름</span>
// //               <span>{session?.user?.name}</span>
// //             </div>
// //             <div className="flex justify-between py-2">
// //               <span className="contentMedium">전화번호</span>
// //               <span>+82 10 1234 5678</span>
// //             </div>
// //             <Address />
// //           </div>
// //           <div className="flex flex-col gap-[10px] mt-6">
// //             <p className="contentMedium mb-3">주문한 술</p>
// //             <OrderedCard />
// //           </div>
// //           <div className="mt-10 subTitleMedium">
// //             <p className="text-center">결제 금액</p>
// //             <p className="mt-3 text-center titleMedium text-primary">{formattedAmount}원</p>
// //           </div>
// //           <Button
// //             onClick={() => {
// //               handlePayment(data);
// //             }}
// //             className="w-full py-5 mt-12 mb-9 contentMedium"
// //           >
// //             {"결제"}
// //           </Button>
// //         </main>
// //       ) : (
// //         <main className="flex flex-col justify-between h-screen text-center text-black contentMedium">
// //           <div className="mt-20">
// //             <p>{session?.user?.name}님,</p>
// //             <p className="text-primary">술상이 준비되었습니다!</p>
// //             <p className="">빠른 시일 내에 배송해드릴게요!!</p>
// //           </div>
// //           <Link href={"/"}>
// //             <Button className="w-full py-5 mb-12 contentMedium">{"확인"}</Button>
// //           </Link>
// //         </main>
// //       )}
// //     </div>
// //   );
// // }

"use client";

import { useState } from "react";
import OrderedCard from "./OrderedCard";
import Button from "@/components/Button";
import Link from "next/link";
import PortOne from "@portone/browser-sdk/v2";
import Address from "./Address";
import { useProductStore } from "@/zustand/Store";
import { useSession } from "next-auth/react";

const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
const STORE_ID = process.env.NEXT_PUBLIC_TOSS_CLIENT_STORE_ID ?? "";
const CHANNEL_KEY = process.env.NEXT_PUBLIC_TOSS_CHANNEL_KEY;

interface Data {
  _id: number;
  name: string;
  brewery: string;
  price: number;
  quantity: number;
}

export default function PayPage() {
  const { data: session } = useSession();
  const token = session?.accessToken;

  const { _id, name, brewery, price, quantity } = useProductStore((state) => ({
    _id: state._id,
    name: state.name,
    brewery: state.brewery,
    price: state.price,
    quantity: state.quantity,
  }));
  const data = { _id, name, price, quantity, brewery };

  const [currentPage, setCurrentPage] = useState<number>(0);

  const totalAmount = price * (quantity ?? 1);
  const formattedAmount = new Intl.NumberFormat("ko-KR").format(totalAmount);

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
          user_id: session?.user?.id,
          products: [
            {
              _id: data._id,
              name: data.name,
              image: {
                path: `/files/06-PickYourPotion/meoncheondugeonju.jpeg`,
                name: "meoncheondugeonju.jpeg",
                originalname: "meoncheondugeonju.jpeg",
              },
              quantity: data.quantity,
              price: data.price,
              extra: {
                brewery: data.brewery,
              },
            },
          ],
        }),
      });

      if (response.ok) {
        alert("주문 성공");
      } else {
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
        redirectUrl: `${API_SERVER}/pay`,
      });

      if (response?.code === "FAILURE_TYPE_PG") {
        alert("결제 실패: " + response?.message);
      } else {
        // 결제 성공 시 주문 정보 서버로 전송 후 페이지 전환
        if (token) {
          await fetchOrder();
          setCurrentPage(1); // 결제 성공 시 페이지 전환
        } else {
          console.error("토큰이 없습니다.");
        }
      }
    } catch (error: any) {
      alert("결제 중 오류가 발생했습니다: " + error.message);
    }
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
              <span>{session?.user?.name}</span>
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
          </div>
          <div className="mt-10 subTitleMedium">
            <p className="text-center">결제 금액</p>
            <p className="mt-3 text-center titleMedium text-primary">{formattedAmount}원</p>
          </div>
          <Button onClick={handlePayment} className="w-full py-5 mt-12 mb-9 contentMedium">
            {"결제"}
          </Button>
        </main>
      ) : (
        <main className="flex flex-col justify-between h-screen text-center text-black contentMedium">
          <div className="mt-20">
            <p>{session?.user?.name}님,</p>
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
