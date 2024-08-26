import { ProductDetail } from "./page";
import Image from "next/image";

export default function Detail({ data }: { data: ProductDetail }) {
  const contentImg = data.extra?.detailImage.map((item, index) => {
    return (
      <div key={index} className="flex justify-center mt-3">
        <Image
          src={`https://api.fesp.shop${item?.path}`}
          width="0"
          height="0"
          sizes="100vw"
          className="w-full h-auto"
          alt="상세 설명"
          key={index}
        />
      </div>
    );
  });

  return <>{contentImg}</>;
}
