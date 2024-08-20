import { useProductStore } from "@/zustand/Store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Order } from "@/app/order/order";
import Button from "@/components/Button";
import OrderDetail from "@/components/OrderDetail";

export default function ReviewList() {
  const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;
  const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
  const url = `${API_SERVER}/orders/`;
  const token = process.env.NEXT_PUBLIC_ACCESS_TOKEN;

  const [orders, setOrders] = useState<Order[]>([]); // Order 타입 배열로 상태 초기화
  const { showDetail, setShowDetail } = useProductStore((state) => ({
    showDetail: state.showDetail,
    setShowDetail: state.setShowDetail,
  }));

  const router = useRouter();

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
  return (
    <div className="pb-10">
      {orders.map((order) =>
        order.products.map((product) =>
          !product.reply_id ? (
            <div key={product._id} className="relative">
              <OrderDetail
                image={product.image}
                name={product.name}
                brewery={product.extra.brewery}
                price={product.price}
                quantity={product.quantity}
                className="border round border-gray p-[15px] mb-[10px]"
              />
              <Button
                onClick={() => {
                  setShowDetail(false);
                  if (!showDetail) {
                    router.push(`/detail/${product._id}`);
                  }
                }}
                className="rounded-3xl text-xs absolute z-50 right-5 top-1/2 transform -translate-y-1/2"
              >
                리뷰 작성
              </Button>
            </div>
          ) : null,
        ),
      )}
    </div>
  );
}
