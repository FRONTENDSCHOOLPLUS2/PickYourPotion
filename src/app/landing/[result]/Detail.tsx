"use client";

import { ProductDetail } from "@/app/detail/[id]/page";
import DegreeBar from "@/components/DegreeBar";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;

function Detail({ item }: { item: ProductDetail }) {
  const router = useRouter();
  const {
    name,
    price,
    mainImages,
    extra: { taste, snack },
  } = item;

  const handleCookie = () => {
    const oneDay = 60 * 60 * 24;
    document.cookie = `isLandingClose=true; path=/; max-age=${oneDay}`;
  };

  return (
    <>
      <div className="h-60 mb-3 bg-slate-500 rounded-lg overflow-hidden">
        <Link
          onClick={(e) => {
            e.preventDefault();
            handleCookie();
            router.push(`/detail/${item._id}`);
          }}
          href="#"
          className="block relative w-full h-full"
        >
          <Image
            src={API_SERVER + mainImages[0].path}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
          />
        </Link>
      </div>
      <h3 className="mb-2">{name}</h3>
      <p className="mb-2 font-medium">{price.toLocaleString()}원</p>
      <table className="mb-5 w-full">
        <tbody>
          <tr>
            <td width="30%">도수</td>
            <td height="32px">{taste.alcohol}%</td>
          </tr>
          <tr>
            <td width="30%">산미</td>
            <td height="32px">
              <DegreeBar degree={taste.acidity} color="#FDC140" />
            </td>
          </tr>
          <tr>
            <td width="30%">당도</td>
            <td height="32px">
              <DegreeBar degree={taste.sweet} color="#ff8f4b" />
            </td>
          </tr>
        </tbody>
      </table>
      <h3 className="mb-2">어울리는 안주</h3>
      <div className="mb-8 flex flex-wrap justify-center gap-1">
        {snack.map((item, index) => (
          <p key={index} className="pt-[6px] pb-1 px-3 border-2 border-primary rounded-full">
            {item}
          </p>
        ))}
      </div>
    </>
  );
}

export default Detail;
