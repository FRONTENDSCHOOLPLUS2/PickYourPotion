import { ProductDetail } from "./page";
import Image from "next/image";

export default function Detail({ data }: { data: ProductDetail }) {
  const contentImg = data.extra?.detailImage.map((item, index) => {
    return (
      <div key={index} className="mt-3 flex justify-center">
        <Image
          src={`https://api.fesp.shop${item?.path}`}
          width={500}
          height={500}
          alt="상세 설명"
          key={index}
          layout="responsive"
          className=" object-contain"
        />
      </div>
    );
  });

  return <>{contentImg}</>;
}
