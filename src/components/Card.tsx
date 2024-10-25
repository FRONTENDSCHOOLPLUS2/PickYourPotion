import Image from "next/image";
import { ProductDetail } from "@/app/detail/[id]/page";
import Link from "next/link";

export default function Card({ data, rate }: { data: ProductDetail; rate?: number }) {
  const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;
  return (
    <Link href={`/detail/${data._id}`}>
      <div className="relative pb-[100%] mb-3">
        {rate && (
          <>
            <span className="block absolute -top-[2px] left-[29px] size-0 border-[3px] border-transparent border-r-primary -rotate-45 z-[28]"></span>
            <span className="block absolute -top-1 left-2 w-6 py-[2px] text-center bg-primary text-white z-30">
              {rate}
            </span>
          </>
        )}
        <Image
          src={API_SERVER + data.mainImages[0].path}
          alt={data.name}
          className="round overflow-hidden z-[29]"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
