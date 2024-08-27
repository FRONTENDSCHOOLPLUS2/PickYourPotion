"use client";
import Button from "@/components/Button";
import CartCard from "@/components/CartCard";
import { useSession } from "next-auth/react";
import { useState, useEffect, useCallback } from "react";

export interface CartPageProps {
  // _id: number;
  cartData: {
    _id: number;
    product: {
      name: string;
      extra: {
        brewery: string;
        taste: {
          alcohol: string;
        };
      };
      price: number;
      image: {
        path: string;
      };
    };
    quantity: number;
  }[];
}

export async function fetchAddCart(accessToken: string) {
  const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;
  const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
  const url = `${API_SERVER}/carts`;
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      "client-id": `${CLIENT_ID}`,
    },
  });
  const resJson = await res.json();
  if (!resJson.ok) {
    throw new Error("error");
  }
  return resJson.cost;
}

//전체 가격 불러오기
export default function CartPage({ cartData }: CartPageProps) {
  const [totalCost, setTotalCost] = useState<number>(0);
  const [products, setProducts] = useState<number>(0);
  const [shippingFees, setShippingFees] = useState<number>(3000);

  const session = useSession();
  const token = session.data?.accessToken;

  const fetchCartData = useCallback(async () => {
    if (token) {
      try {
        const cost = await fetchAddCart(token);
        setTotalCost(cost.total);
        setProducts(cost.products);
        setShippingFees(cost.shippingFees);
      } catch (error) {
        console.error("Error fetching cost data:", error);
      }
    }
  }, [token]);

  useEffect(() => {
    fetchCartData();
  }, [fetchCartData]);

  const handleQuantityChange = async () => {
    await fetchCartData();
  };

  return (
    <div className="flex flex-col  mx-[25px] mt-9">
      <div className="mb-5 subTitleMedium">담은술</div>
      <div className="flex flex-col">
        <div className="h-[400px] overflow-y-auto hide-scrollbar">
          {cartData ? (
            cartData.map((item, index: number) => (
              <CartCard
                key={index}
                name={item.product.name}
                brewery={item.product.extra.brewery}
                price={item.product.price}
                alcohol={item.product.extra.taste.alcohol}
                quantity={item.quantity}
                image={item.product.image.path}
                handleQuantityChange={handleQuantityChange} // 수량 변경 시 핸들러 호출
                _id={item._id}
              />
            ))
          ) : (
            <div>장바구니가 비어 있습니다.</div> // 데이터가 비었을 때의 처리
          )}
        </div>
        <div className="mt-12">
          <div className="flex content justify-between mb-[28px]">
            <span>총 상품 금액</span>
            <span>{products.toLocaleString()}원</span>
          </div>
          <div className="flex content justify-between mb-[28px]">
            <span>배송비</span>
            {products > 30000 ? <span>무료</span> : <span>{shippingFees.toLocaleString()}원</span>}
          </div>
          <div className="flex content justify-between mb-[28px]">
            <span>총 결제 금액</span>
            <span className="text-primary contentMedium">{totalCost.toLocaleString()}원</span>
          </div>
          <Button color={"fill"} className="w-full h-[62px] subTitle px-[25px] mb-[24px]">
            총 {totalCost.toLocaleString()}원 결제하기
          </Button>
        </div>
      </div>
    </div>
  );
}
