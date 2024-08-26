import Image from "next/image";
import { ProductDetail } from "@/app/detail/[id]/page";
import Link from "next/link";

export default function Card({ data }: { data: ProductDetail }) {
  const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;
  return (
    <Link href={`/detail/${data._id}`}>
      <div className="h-[240px] w-[155px] flex flex-col relative mb-2 ">
        <Image
          src={API_SERVER + data.mainImages[0].path}
          alt={data.name}
          width={182}
          height={180}
          className="round mb-3 w-[182px] h-full overflow-hidden"
        />
        <span className="contentMedium text-[black] text-ellipsis line-clamp-1">{data.name}</span>
        <span className="description text-[gray] mt-1">{data.extra.brewery}</span>
        <span className="contentMedium text-[black] ">{data.price.toLocaleString()}원</span>
      </div>
    </Link>
  );
}
