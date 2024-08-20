import Image from "next/image";

import { ImageProps } from "@/app/order/order";

interface OrderDetailProps {
  image: ImageProps;
  name: string;
  brewery: string;
  price: number;
  quantity: number;
  className?: string;
}

export default function OrderDetail({
  image,
  name,
  brewery,
  price,
  quantity,
  className,
}: OrderDetailProps) {
  return (
    <div className={`flex items-center ${className}`}>
      <Image
        src={`https://api.fesp.shop${image.path}`}
        alt={image.name}
        width={75}
        height={75}
        className="round"
      />
      <div className="ml-3">
        <p className="text-black contentMedium">{name}</p>
        <p className="description text-gray ">{brewery}</p>
        <p className="text-[14px] font-medium">
          <span className="text-primary">{price}원</span>
          <span> | {quantity}개</span>
        </p>
      </div>
    </div>
  );
}
