import { ProductDetail } from "./page";
import Image from "next/image";

export default function Detail({ data }: { data: ProductDetail }) {
  const contentImg = data.extra?.detailImage.map((item, index) => {
    console.log(data._id);
    return (
      <div className="flex justify-center mt-3 " key={data?._id}>
        <Image
          src={`https://api.fesp.shop${item?.path}`}
          width="0"
          height="0"
          sizes="100vw"
          className="w-full h-auto "
          alt="상세 설명"
        />
      </div>
    );
  });

  return <>{contentImg}</>;
}
