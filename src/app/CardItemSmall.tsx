import Image from "next/image";
import { ProductDetail } from "./detail/[id]/page";
import Link from "next/link";
import CartButton from "@/components/CartButton";

function CardItemSmall({ data }: { data: ProductDetail }) {
  const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;

  return (
    <div className="flex items-center mt-4">
      <div className="relative">
        <Link href={`/detail/${data._id}`}>
          <Image
            src={API_SERVER + data.mainImages[0]?.path}
            alt={data.name}
            className="rounded-lg w-[120px] h-[120px]"
            width={120}
            height={120}
          />
        </Link>
        <CartButton _id={data._id} className="absolute bottom-2 right-2 w-8 h-8 shadow" />
      </div>
      <Link href={`/detail/${data._id}`}>
        <div className="ml-5">
          <h3 className="mb-1 text-black contentMedium">{data.name}</h3>
          <p className="mb-1 description text-gray">{data.extra.brewery}</p>
          <p className="text-black contentMedium">{data.price.toLocaleString()}원</p>
        </div>
      </Link>
    </div>
  );
}

export default CardItemSmall;
