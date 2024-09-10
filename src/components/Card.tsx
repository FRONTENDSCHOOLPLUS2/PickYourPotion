import Image from "next/image";
import { ProductDetail } from "@/app/detail/[id]/page";
import Link from "next/link";

export default function Card({ data }: { data: ProductDetail }) {
  const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;
  return (
    <Link href={`/detail/${data._id}`}>
      <div className="relative pb-[100%] mb-3">
        <Image
          src={API_SERVER + data.mainImages[0].path}
          alt={data.name}
          className="round overflow-hidden"
          fill
        />
      </div>
      <div>
        <h3 className="contentMedium text-[black] text-ellipsis line-clamp-1 overflow-hidden">
          {data.name}
        </h3>
        <span className="description text-[gray] pt-1">{data.extra.brewery}</span>
        <p className="contentMedium text-[black] ">{data.price.toLocaleString()}원</p>
      </div>
    </Link>
  );
}
