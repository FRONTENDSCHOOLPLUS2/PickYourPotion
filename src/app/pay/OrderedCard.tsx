import Image from "next/image";

import OrderImage from "@/../public/community-dummy-small.png";
import { useProductStore } from "@/zustand/Store";

const OrderedCard: React.FC = () => {
  const { name, price, image, brewery, quantity } = useProductStore((state) => ({
    name: state.name,
    price: state.price,
    image: state.image,
    brewery: state.brewery,
    quantity: state.quantity,
  }));

  return (
    <div className="flex justify-between px-2 py-4 border border-gray rounded-xl">
      <div className="flex">
        <Image src={OrderImage} alt="" />
        <div className="ml-6 description text-gray">
          <h2 className="text-black contentMedium">{name}</h2>
          <p>{brewery}</p>
        </div>
      </div>
      <div className="flex items-end">
        <p className="text-black text-[14px]">
          {price}원/{quantity}개
        </p>
      </div>
    </div>
  );
};

export default OrderedCard;
