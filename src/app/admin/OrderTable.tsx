"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/Table";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
interface Order {
  _id: string;
  user: {
    email: string;
  };
  state: string;
  createdAt: string;
}

async function getOrders(
  token: string,
  apiServer: string,
  clientId: string,
  setOrders: Function,
  setLoading: Function,
) {
  const url = `${apiServer}/seller/orders/`;

  setLoading(true); // 로딩 상태 시작

  try {
    const response = await fetch(url, {
      headers: {
        "client-id": `${clientId}`,
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP 에러 발생! 상태 : ${response.status}`);
    }

    const result = await response.json();
    setOrders(result.item); // 데이터를 상태에 설정
  } catch (error) {
    console.error("네트워크 오류 발생", error);
  } finally {
    setLoading(false); // 로딩 상태 끝
  }
}

function OrderTable() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;
  const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
  const token = session?.accessToken;

  useEffect(() => {
    if (token) {
      getOrders(token, API_SERVER, CLIENT_ID, setOrders, setLoading); // 주문 내역 로딩 함수 호출
    }
  }, [token]);

  return (
    <div className="overflow-x-auto">
      {loading ? (
        <p>로딩 중...</p>
      ) : (
        <Table className="table-fixed w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-48 bg-primary border-0">주문번호</TableHead>
              <TableHead className="w-60 bg-primary border-0">회원아이디</TableHead>
              <TableHead className="w-32 bg-primary border-0">주문상태</TableHead>
              {/* <TableHead className="w-60 bg-primary border-0">요청사항</TableHead> */}
              <TableHead className="w-48 bg-primary border-0">주문날짜</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order._id}</TableCell>
                  <TableCell>{order.user.email}</TableCell>
                  <TableCell>{order.state}</TableCell>
                  <TableCell>{order.createdAt}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  주문 데이터가 없습니다.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

export default OrderTable;
