import Image from "next/image";

import dummyImg from "@/../public/community-dummy.png";
import { ImageProps } from "@/app/order/order";

interface OrderDetailProps {
  image: ImageProps;
  name: string;
  brewery: string;
  price: number;
  quantity: number;
}

export default function OrderDetail({ image, name, brewery, price, quantity }: OrderDetailProps) {
  return (
    <div className="flex items-center">
      <Image
        src={`https://api.fesp.shop${image.path}`}
        alt={image.name}
        width={75}
        height={75}
        className="round"
      />
      <div className="ml-3">
        <p className="contentMedium text-black">{name}</p>
        <p className="description text-gray ">{brewery}</p>
        <p className="text-[14px] font-medium">
          <span className="text-primary">{price}원</span>
          <span> | {quantity}개</span>
        </p>
      </div>
    </div>
  );
}
