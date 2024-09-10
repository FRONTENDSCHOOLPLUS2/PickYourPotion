"use client";
import Button from "@/components/Button";
import CartCard from "@/components/CartCard";
import { LinkButton } from "@/components/LinkButton";
import { ExtendedIamport } from "@/types/iamportExtends";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { certificationCallback, getUserInfo } from "../adult/action";
import Image from "next/image";
import empty from "../../../public/images/empty.png";
import { fetchGetCart } from "./page";

export interface CartPageProps {
  cartData: {
    _id: number;
    product: {
      _id: number;
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
  total: {
    products: number;
    shippingFees: number;
    discount: {
      products: number;
      shippingFees: number;
    };
    total: number;
  };
}

//전체 가격 불러오기
export default function CartPage({ cartData, total }: CartPageProps) {
  const [cartItems, setCartItems] = useState(cartData);
  const [totalCost, setTotalCost] = useState<number>(0);
  const [products, setProducts] = useState<number>(0);
  const [shippingFees, setShippingFees] = useState<number>(3000);

  const router = useRouter();
  const session = useSession();
  const token = session.data?.accessToken;

  const fetchCartData = useCallback(async () => {
    if (token) {
      try {
        const res = await fetchGetCart(token);
        setCartItems(res.item);
        setTotalCost(res.cost.total);
        setProducts(res.cost.products);
        setShippingFees(res.cost.shippingFees);
      } catch (error) {
        console.error("Error fetching cost data:", error);
      }
    }
  }, [token]);

  const request = useSearchParams().get("request");
  const confirmSuccess = useSearchParams().get("confirmSuccess");
  const confirmFailed = useSearchParams().get("confirmFailed");

  const V1_IMP_KEY = process.env.NEXT_PUBLIC_API_V1_IMP_KEY;

  const onCertification = () => {
    if (!session) return;

    if (!window.IMP) return;

    const IMP = window.IMP as unknown as ExtendedIamport;
    IMP.init(V1_IMP_KEY);

    IMP.certification(
      {
        popup: true,
        pg: "inicis_unified",
      },
      certificationCallback,
    );
  };

  useEffect(() => {
    fetchCartData();
  }, [fetchCartData]);

  const handleQuantityChange = () => {
    fetchCartData();
  };

  const handlePayment = async () => {
    const userInfo = await getUserInfo(session.data?.user?.id!);
    if (userInfo.item.extra.isAdult) {
      router.push("/cart/pay");
    } else {
      router.push(`?request=true`);
    }
  };

  return (
    <div className="flex flex-col  mx-[25px] mt-9">
      <div className="mb-5 subTitleMedium">담은술</div>
      {cartData.length !== 0 ? (
        <>
          <div className="flex flex-col">
            <div className="h-[400px] overflow-y-auto hide-scrollbar">
              {Array.from(new Set(cartData?.map((item) => item._id))).map((id) => {
                const item = cartData.find((cartItem) => cartItem._id === id);
                if (item) {
                  return (
                    <CartCard
                      key={id}
                      name={item.product.name}
                      brewery={item.product.extra.brewery}
                      price={item.product.price}
                      alcohol={item.product.extra.taste.alcohol}
                      quantity={item.quantity}
                      image={item.product.image.path}
                      handleQuantityChange={handleQuantityChange}
                      _id={item._id}
                    />
                  );
                }
                return null;
              })}
            </div>
            <div className="mt-12">
              <div className="flex content justify-between mb-[28px]">
                <span>총 상품 금액</span>
                <span>{products.toLocaleString()}원</span>
              </div>
              <div className="flex content justify-between mb-[28px]">
                <span>배송비</span>
                {products > 30000 ? (
                  <span>무료</span>
                ) : (
                  <span>{shippingFees.toLocaleString()}원</span>
                )}
              </div>
              <div className="flex content justify-between mb-[28px]">
                <span>총 결제 금액</span>
                <span className="text-primary contentMedium">{totalCost.toLocaleString()}원</span>
              </div>
              <Button
                onClick={handlePayment}
                color={"fill"}
                className="w-full h-[62px] subTitle px-[25px] mb-[24px]"
              >
                총 {totalCost.toLocaleString()}원 결제하기
              </Button>
            </div>
          </div>
        </>
      ) : (
        <>
          <Image
            src={empty}
            width={322}
            height={348}
            alt="데이터가 비어있습니다."
            className="mx-auto pt-5"
          />
          <LinkButton href="/" color={"fill"} className="mt-8 py-4">
            술담으러 돌아가기
          </LinkButton>
        </>
      )}

      {request && (
        <div
          className={`fixed top-0 left-0 z-[100] w-screen h-screen flex justify-center items-center ${request ? "opacity-100" : "opacity-0"} bg-black bg-opacity-50`}
          // onClick={() => router.back()}
        >
          <div className="flex flex-col justify-center items-center w-4/5 px-5 py-8 rounded-2xl bg-white text-center text-black">
            <p className="text-primary font-bold">잠시만요!</p>
            구매 전 최초 1회
            <br />
            성인인증이 필요해요.
            <div className="flex justify-center align-top mt-3 gap-2 w-full">
              <Button
                onClick={() => {
                  router.back();
                  onCertification();
                }}
                className="grow"
              >
                인증하기
              </Button>
              <Button onClick={() => router.back()} className="grow" color="disabled">
                취소
              </Button>
            </div>
          </div>
        </div>
      )}
      {confirmSuccess && (
        <div
          className={`fixed top-0 left-0 z-[100] w-screen h-screen flex justify-center items-center ${confirmSuccess ? "opacity-100" : "opacity-0"} bg-black bg-opacity-50`}
        >
          <div className="flex flex-col justify-center items-center w-4/5 px-5 py-8 rounded-2xl bg-white text-center text-black">
            성인인증이 완료되었습니다
            <br />
            상품을 구매해주세요.
            <Button onClick={() => router.back()} className="w-full mt-3">
              구매하러 가기
            </Button>
          </div>
        </div>
      )}
      {confirmFailed && (
        <div
          className={`fixed top-0 left-0 z-[100] w-screen h-screen flex justify-center items-center ${confirmFailed ? "opacity-100" : "opacity-0"} bg-black bg-opacity-50`}
        >
          <div className="flex flex-col justify-center items-center w-4/5 px-5 py-8 rounded-2xl bg-white text-center text-black">
            성인부터 구매할 수 있는 상품입니다.
            <br />
            다음 기회에 봬요!
            <LinkButton href="/" className="w-full mt-3">
              홈으로
            </LinkButton>
          </div>
        </div>
      )}
    </div>
  );
}
