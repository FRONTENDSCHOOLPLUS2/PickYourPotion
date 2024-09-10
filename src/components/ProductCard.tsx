import Image from "next/image";
import { ProductDetail } from "@/app/detail/[id]/page";
import Link from "next/link";
import CartButton from "./CartButton";

function ProductCard({ data }: { data: ProductDetail }) {
  const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;

  return (
    <div className="flex flex-col bg-white p-[10px] relative shadow-lg rounded-2xl">
      <Link href={`/detail/${data._id}`}>
        <div className="relative h-[324px] rounded-xl">
          <Image
            src={API_SERVER + data.mainImages[0].path}
            alt={data.name}
            className="object-cover h-full rounded-lg"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Link>
      <Link href={`/detail/${data._id}`}>
        <div className="w-[230px] px-5 py-4 rounded-b-lg">
          <h3 className="text-black subTitleMedium text-[18px] mb-1 truncate">{data.name}</h3>
          <p className="mb-1 truncate text-gray content">{data.extra.brewery}</p>
          <p className="mb-1 text-black contentMedium">{data.price.toLocaleString()}원</p>
        </div>
      </Link>
      <CartButton _id={data._id} className="absolute bottom-5 right-3" />
    </div>
  );
}

export default ProductCard;
