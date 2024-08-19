"use client";

import { useEffect, useState } from "react";
import OrderList from "./OrderList";

export default function OrderPage() {
  const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;
  const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
  const url = `${API_SERVER}/orders/`;
  const token = process.env.NEXT_PUBLIC_ACCESS_TOKEN;

  const [orders, setOrders] = useState([]); // 빈 배열로 초기화

  useEffect(() => {
    // 주문 내역을 불러오는 함수
    const getOrderList = async () => {
      try {
        const response = await fetch(url, {
          headers: {
            "client-id": `${CLIENT_ID}`,
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await response.json();

        if (response.ok) {
          setOrders(result.item);
        } else {
          console.log(result.message);
        }
      } catch (error) {
        console.error("네트워크 오류 발생", error);
      }
    };

    getOrderList();
  }, [url, CLIENT_ID, token]);

  // // 주문 목록을 날짜별로 그룹화
  // const groupOrdersByDate = (orders: Order[]) => {
  //   const grouped: { [date: string]: Order[] } = orders.reduce(
  //     (acc, order) => {
  //       const date = order.createdAt.split(" ")[0]; // 날짜만 추출
  //       if (!acc[date]) acc[date] = [];
  //       acc[date].push(order);
  //       return acc;
  //     },
  //     {} as { [date: string]: Order[] },
  //   );
  //   return grouped;
  // };

  // const groupedOrders = groupOrdersByDate(orders);
  // console.log(groupedOrders);
  return (
    <main className="flex flex-col gap-10 mt-10">
      <OrderList />
      <OrderList />
      <OrderList />
      <OrderList />
      {/* {Object.keys(groupedOrders).map((date) => (
        <div key={date}>
          <OrderDate date={date} />
          {groupedOrders[date].map((item, index) => (
            <div key={index}>{item.updatedAt}</div>
          ))}
        </div>
      ))} */}
    </main>
  );
}

//  {/* {groupedOrders[date].map((order) => (
//             <OrderCard key={order._id} order={order} />
//           ))} */}

function add(num1: number, num2: number) {
  return num1 + num2;
}

function printResult(num: number) {
  console.log(num);
}

let combineValues: (a: number, b: number) => number;

combineValues = add;

console.log(combineValues(7, 7));
