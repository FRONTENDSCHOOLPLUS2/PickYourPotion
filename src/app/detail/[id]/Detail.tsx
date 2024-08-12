import { ProductDetail } from "./page";
import Image from "next/image";

export default function Detail({ data }: { data: ProductDetail }) {
  const contentImg = data.extra?.detailImage.map((item, index) => {
    return (
      <Image
        src={`https://api.fesp.shop${item?.path}`}
        width={500}
        height={500}
        alt="test"
        key={index}
      />
    );
  });

  return <>{contentImg}</>;
}
