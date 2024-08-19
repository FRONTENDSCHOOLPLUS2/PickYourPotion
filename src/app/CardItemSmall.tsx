import Image from "next/image";
import { ProductDetail } from "./detail/[id]/page";
import Link from "next/link";

function CardItemSmall({ data }: { data: ProductDetail }) {
  const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;

  return (
    <Link href={`/detail/${data._id}`} className="flex items-center">
      <Image
        src={API_SERVER + data.mainImages[0].path}
        alt={data.name}
        className="rounded-lg"
        width={120}
        height={120}
      />
      <div className="ml-5">
        <h3 className="mb-1 text-black contentMedium">{data.name}</h3>
        <p className="mb-1 description text-gray">{data.extra.brewery}</p>
        <p className="mb-1 description text-gray">깊고 묵직한 단맛의 막걸리</p>
        <p className="text-black contentMedium">{data.price.toLocaleString()}원</p>
      </div>
    </Link>
  );
}

export default CardItemSmall;
