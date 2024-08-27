import Image from "next/image";
import { ProductDetail } from "@/app/detail/[id]/page";
import Link from "next/link";

export default function Card({ data }: { data: ProductDetail }) {
  const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;
  return (
    <Link href={`/detail/${data._id}`}>
      <div className="h-[240px] flex flex-col relative w-[calc(100%)]">
        <Image
          src={API_SERVER + data.mainImages[0].path}
          alt={data.name}
          width={182}
          height={180}
          className="round mb-3 h-full overflow-hidden"
        />
        <span className="contentMedium text-[black] text-ellipsis line-clamp-1 overflow-hidden">
          {data.name}
        </span>
        <span className="description text-[gray] ">{data.extra.brewery}</span>
        <span className="contentMedium text-[black] ">{data.price.toLocaleString()}원</span>
      </div>
    </Link>
  );
}
