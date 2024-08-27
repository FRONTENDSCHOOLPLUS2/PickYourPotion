"use client";

import { useEffect, useState } from "react";
import OrderList from "./OrderList";
import { Order } from "./order";
import { useSession } from "next-auth/react";
import Empty from "./Empty";

interface GroupedOrders {
  date: string;
  orders: Order[];
}

export default function OrderPage() {
  const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;
  const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
  const session = useSession();
  const url = `${API_SERVER}/orders/`;
  const token = session.data?.accessToken;

  const [groupedOrders, setGroupedOrders] = useState<GroupedOrders[]>([]); // 날짜별로 그룹화 된 주문내역을 상태로 관리

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
          const orders: Order[] = result.item;

          // 날짜별로 그룹화
          const grouped = orders.reduce((acc: Record<string, Order[]>, order) => {
            const date = order.createdAt.split(" ")[0]; // 날짜만 추출
            // 해당 날짜에 대한 배열이 없으면,
            if (!acc[date]) {
              acc[date] = []; // 빈배열로 초기화
            }
            acc[date].push(order); // 해당 날짜에 주문내역 푸시
            return acc;
          }, {});

          // 객체를 배열로 변환 [{date, orders}, {date, orders}]
          const groupedArray = Object.keys(grouped).map((date) => ({
            date,
            orders: grouped[date],
          }));

          setGroupedOrders(groupedArray);
        } else {
          console.log(result.message);
        }
      } catch (error) {
        console.error("네트워크 오류 발생", error);
      }
    };

    getOrderList();
  }, [url, token, CLIENT_ID]);

  return (
    <main className="flex flex-col gap-10 mt-10">
      {groupedOrders.length === 0 ? (
        <Empty />
      ) : (
        groupedOrders.map((grouped) => (
          <OrderList key={grouped.date} date={grouped.date} orders={grouped.orders} />
        ))
      )}
    </main>
  );
}
