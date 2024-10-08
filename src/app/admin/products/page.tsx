"use client";

import { useRouter } from "next/navigation";

import Button from "@/components/Button";
import OrderDetail from "@/components/OrderDetail";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { ImageProps } from "@/app/order/order";
import { InfoToast } from "@/toast/InfoToast";

interface Product {
  _id: number;
  name: string;
  price: number;
  quantity: number;
  mainImages: ImageProps[];
  extra?: { brewery?: string };
}

async function getProductsList(apiServer: string, clientId: string, token: string) {
  const url = `${apiServer}/seller/products/`;
  try {
    const response = await fetch(url, {
      headers: {
        "client-id": `${clientId}`,
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();
    console.log(token);
    return result.item;
  } catch (error) {
    console.error("네트워크 오류 발생", error);
  }
}

async function deleteProduct(
  apiServer: string,
  clientId: string,
  token: string,
  productId: number,
) {
  const url = `${apiServer}/seller/products/${productId}`;
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "client-id": clientId,
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("상품 삭제에 실패했습니다.");
    }
  } catch (error) {
    console.error("상품 삭제 오류 발생", error);
  }
}

export default function Product() {
  const { data: session } = useSession();
  const [products, setProducts] = useState<Product[]>([]);

  const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;
  const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
  const token = session?.accessToken;

  const router = useRouter();

  const handleRegisterClick = () => {
    router.push("/admin/register");
  };

  const handleDeleteClick = async (productId: number) => {
    if (API_SERVER && CLIENT_ID && token) {
      await deleteProduct(API_SERVER, CLIENT_ID, token, productId);
      setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
      InfoToast("상품이 삭제되었습니다.");
    } else {
      console.error("API 서버, 클라이언트 ID 또는 토큰이 정의되어 있지 않습니다.");
    }
  };

  useEffect(() => {
    if (token) {
      getProductsList(API_SERVER, CLIENT_ID, token).then((data) => {
        setProducts(data);
      });
    }
  }, [token]);

  return (
    <main>
      <h1 className="subTitleMedium py-5">상품 목록</h1>
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product._id} className="relative">
            <OrderDetail
              image={product.mainImages[0]}
              name={product.name}
              brewery={product.extra?.brewery || "양조장 정보 없음"}
              price={product.price}
              quantity={product.quantity}
              className="border round border-gray p-[15px] mb-[10px]"
            />
            <Button
              className="rounded-3xl text-xs absolute z-50 right-5 top-1/2 transform -translate-y-1/2"
              onClick={() => handleDeleteClick(product._id)}
            >
              삭제
            </Button>
          </div>
        ))
      ) : (
        <p>상품이 없습니다.</p>
      )}

      <Button className="w-full py-4 mt-4 mb-10" onClick={handleRegisterClick}>
        상품 등록
      </Button>
    </main>
  );
}
