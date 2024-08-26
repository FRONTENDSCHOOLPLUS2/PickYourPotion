import DetailClient from "./DetailClient";

export interface User {
  name: string;
  id: number;
}
export interface ProductImage {
  path: string;
  name: string;
  originalname: string;
}
export interface ProductReplies {
  _id: number;
  user: User;
  user_id: number;
  name: string;
  image: string;
  rating: number;
  content: string;
  createdAt: string;
}
export interface Extra {
  inherence: string;
  taste: {
    acidity: string;
    sweet: string;
    body: string;
    alcohol: string;
    sparkle: string;
    tannin: string;
    bitter: string;
  };
  brewery: string;
  useByDate: string;
  volume: string;
  detailImage: [
    {
      path: string;
      name: string;
      originalname: string;
    },
  ];
  snack: string[];
  isNew: boolean;
  isBest: boolean;
  category: string[];
}
export interface ProductDetail {
  name: string;
  price: number;
  mainImages: ProductImage[];
  content: string;
  _id: number;
  path: string;
  replies: ProductReplies[];
  extra: Extra;
}
export async function fetchDetail(_id: string, delay?: number) {
  const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;
  const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
  // 경우에 따라 delay 매개변수를 받아 delay 파라미터 설정
  const delayTime = delay ? "/?delay=" + delay : "";
  const url = `${API_SERVER}/products/${_id}${delayTime}`;
  const res = await fetch(url, {
    headers: {
      "client-id": `${CLIENT_ID}`,
    },
  });
  const resJson = await res.json();
  if (!resJson.ok) {
    throw new Error("error");
  }
  return resJson.item;
}

export default function Page() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow ">
        <DetailClient />
      </div>
    </div>
  );
}
