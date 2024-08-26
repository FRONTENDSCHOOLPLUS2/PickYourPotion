import { ProductDetail } from "./page";
import Image from "next/image";

export default function Detail({ data }: { data: ProductDetail }) {
  const contentImg = data.extra?.detailImage.map((item, index) => {
    return (
      <div className="flex justify-center mt-3 " key={index}>
        <Image
          src={`https://api.fesp.shop${item?.path}`}
          width="0"
          height="0"
          sizes="100vw"
          priority
          className="w-full h-auto "
          alt={item.name}
        />
      </div>
    );
  });

  return <>{contentImg}</>;
}
